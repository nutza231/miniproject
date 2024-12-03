const express = require('express');
const { createMeeting, getManagerMeetings } = require('../controllers/meetingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// จองการนัดหมาย (จำเป็นต้องมีการตรวจสอบสิทธิ์)
router.post('/', authMiddleware, createMeeting);

// ดูการนัดหมายของผู้จัดการ
router.get('/:manager_id', authMiddleware, getManagerMeetings);

module.exports = router;
