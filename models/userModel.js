const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
     name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false // Nếu bạn muốn bắt buộc nhập thì sửa thành: true
    },
    avarta: {
        type: String, // Có thể lưu đường link ảnh
        required: false
    },
    status: {
        type: Boolean,
        default: true // true: hoạt động, false: bị khóa
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Chỉ chấp nhận 2 vai trò: user hoặc admin
        default: 'user'
    },
    DOb: {
        type: Date,
        default: Date.now
    },
    isDeleted: { 
        type: Boolean,
         default: false 
    } // Trạng thái xóa mềm
});

let User = mongoose.model('User', userSchema);
module.exports = { User };