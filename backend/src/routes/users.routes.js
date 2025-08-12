const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

// Rota para criar um novo usuário
router.post('/', userController.createUser);

// Futuramente: router.get('/', userController.getAllUsers);

module.exports = router;
