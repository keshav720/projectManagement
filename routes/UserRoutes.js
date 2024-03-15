const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// POST /users (Create a new user)
router.post('/', userController.createUser);

module.exports = router;
