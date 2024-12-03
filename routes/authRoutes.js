const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// เส้นทางการลงทะเบียน
router.post('/register', register);

// เส้นทางการเข้าสู่ระบบ
router.post('/login', login);

module.exports = router;
