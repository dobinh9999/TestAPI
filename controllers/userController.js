const {User} = require('../models/userModel');


const userController = {
    // Lấy danh sách người dùng
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({ isDeleted: false });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },
   // Lấy thông tin người dùng theo ID (chỉ lấy user chưa bị xóa)
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id, isDeleted: false }); // Chỉ tìm user chưa bị xóa
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },
    // Lấy danh sách người dùng đã bị xóa mềm
    getDeletedUsers: async (req, res) => {
        try {
            const users = await User.find({ isDeleted: true });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching deleted users', error });
        }
    },
    // Thêm người dùng mới
    createUser: async (req, res) => {
        const { name, email, password, phone, avarta, status, role, DOb } = req.body;

        try {
            // Kiểm tra xem email hoặc phone có trùng với user đã bị xóa mềm không
            const existingUser = await User.findOne({
                email,
                phone,
                isDeleted: true
            });

            if (existingUser) {
                return res.status(409).json({
                    message: 'Tài khoản với email và số điện thoại này đã bị xóa trên hệ thống.',
                    user: existingUser,
                    options: [
                        'Khôi phục tài khoản cũ',
                        'Xóa hoàn toàn tài khoản cũ và tạo mới'
                    ]
                });
            }

            // Kiểm tra email/phone có trùng với user đang hoạt động không
            const activeUser = await User.findOne({
                $or: [{ email }, { phone }],
                isDeleted: false
            });

            if (activeUser) {
                return res.status(409).json({ message: 'Email hoặc số điện thoại đã được sử dụng.' });
            }

            // Băm mật khẩu
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ name, email, password: hashedPassword, phone, avarta, status, role, DOb });
            // Lưu vào database
            await newUser.save();
            res.status(201).json(newUser);

        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    },


        // // Cập nhật thông tin người dùng (chỉ update user chưa bị xóa)
        // Cập nhật thông tin người dùng (chỉ update user chưa bị xóa)
    updateUser: async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        try {
            // Nếu user không phải admin và đang cố cập nhật role => từ chối
            if (req.user.role !== 'admin' && updateData.role) {
                return res.status(403).json({ message: 'Bạn không có quyền cập nhật vai trò (role).' });
            }

            // Nếu user không phải admin và cố cập nhật tài khoản của người khác => từ chối
            if (req.user.role !== 'admin' && req.user.id !== id) {
                return res.status(403).json({ message: 'Bạn chỉ được phép cập nhật tài khoản của chính bạn.' });
            }

            // Cập nhật user (chỉ user chưa bị xóa)
            const updatedUser = await User.findOneAndUpdate(
                { _id: id, isDeleted: false },
                updateData,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
            }

            res.status(200).json({ message: 'Cập nhật thành công.', user: updatedUser });

        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật người dùng.', error });
        }
    },

 // Xóa người dùng (Soft Delete)
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUser = await User.findOneAndUpdate(
                { _id: id, isDeleted: false }, // Chỉ xóa user chưa bị xóa
                { isDeleted: true },
                { new: true }
            );

            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found or already deleted' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },
    // Khôi phục tài khoản đã bị xóa
   restoreUserByEmailOrPhone: async (req, res) => {
        const { email, phone } = req.body;

        try {
            const restoredUser = await User.findOneAndUpdate(
                {
                    email,
                    phone,
                    isDeleted: true
                },
                { isDeleted: false },
                { new: true }
            );

            if (!restoredUser) {
                return res.status(404).json({ message: 'Không tìm thấy tài khoản để khôi phục.' });
            }

            res.status(200).json({ message: 'Khôi phục tài khoản thành công.', user: restoredUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi khôi phục tài khoản.', error });
        }
    },
    // Xóa toàn bộ dữ liệu người dùng trong cơ sở dữ liệu
    permanentlyDeleteUserByEmailOrPhone: async (req, res) => {
        const { email, phone } = req.body;

        try {
            const deletedUser = await User.findOneAndDelete({
                email,
                phone,
                isDeleted: true
            });

            if (!deletedUser) {
                return res.status(404).json({ message: 'Không tìm thấy tài khoản để xóa.' });
            }

            res.status(200).json({ message: 'Đã xóa vĩnh viễn tài khoản.', user: deletedUser });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa tài khoản.', error });
        }
    },
    // API đăng nhập
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Kiểm tra user có tồn tại và chưa bị xóa
            const user = await User.findOne({ email, isDeleted: false });

            if (!user) {
                return res.status(404).json({ message: 'Email không tồn tại hoặc tài khoản đã bị xóa.' });
            }

            // So sánh mật khẩu
            const bcrypt = require('bcryptjs');
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Sai mật khẩu.' });
            }

            // Nếu đúng, tạo token
            const jwt = require('jsonwebtoken');
            const token = jwt.sign(
                { id: user._id, role: user.role },
                'p@ssw0rdtokencuatao2025', // Thay bằng key thực tế của bạn
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Đăng nhập thành công.', token });
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error); // Thêm log chi tiết
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

};

module.exports = userController;