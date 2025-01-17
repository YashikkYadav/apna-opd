const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const user = express.Router({ mergeParams: true });

user.post('/', userController.registerUser);
user.post('/access-token', userController.loginUser);
user.get('/:user-id', authMiddleware, userController.getUser);
user.delete('/:user-id', authMiddleware, userController.deleteUser);
user.post('/send-reset-password-mail', userController.sendForgetPasswordMail);
user.patch('/:user-id/reset-password', authMiddleware, userController.resetPassword);

module.exports = user;
