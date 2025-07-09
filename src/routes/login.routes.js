const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controllers/login.controllers');

router.post('/login', loginUsuario);

module.exports = router;