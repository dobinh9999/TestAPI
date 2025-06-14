const express = require('express');
const router = require('express').Router();
const  userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles  } = require('../Middleware/AuthMiddleware');



// Lấy danh sách user đã bị xóa mềm - chỉ admin mới được
router.get('/deleted', authenticateToken, authorizeRoles('admin'), userController.getDeletedUsers);

// Lấy tất cả người dùng - chỉ admin mới được xem
router.get('/', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);

// Khôi phục user theo email và phone (ai cũng gọi được, không cần token)
router.patch('/restore', userController.restoreUserByEmailOrPhone);

// Xóa vĩnh viễn user theo email hoặc phone - chỉ admin mới được
router.delete('/permanent', authenticateToken, authorizeRoles('admin'), userController.permanentlyDeleteUserByEmailOrPhone);

// Lấy thông tin người dùng theo ID - user phải đăng nhập
router.get('/:id', authenticateToken, userController.getUserById);

// Tạo mới user (đăng ký tài khoản) - không cần token
router.post('/', userController.createUser);

// Cập nhật thông tin người dùng - user phải đăng nhập
router.put('/:id', authenticateToken, userController.updateUser);

// Xóa người dùng (Soft Delete) - chỉ admin mới được
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

// Đăng nhập
router.post('/login', userController.login);


module.exports = router;