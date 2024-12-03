const Meeting = require('../models/Meeting');

// จองการนัดหมาย
const createMeeting = async (req, res) => {
    const { manager_id, team_member_id, start_time, end_time } = req.body;

    try {
        const isAvailable = await Meeting.isTimeSlotAvailable(manager_id, new Date(start_time), new Date(end_time));

        if (!isAvailable) {
            return res.status(400).json({ message: 'Time slot is not available' });
        }

        const meeting = new Meeting({ manager_id, team_member_id, start_time: new Date(start_time), end_time: new Date(end_time) });
        await meeting.save();

        res.status(201).json({ message: 'Meeting booked successfully', meeting });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ดึงข้อมูลการนัดหมายของผู้จัดการ
const getManagerMeetings = async (req, res) => {
    const { manager_id } = req.params;

    try {
        const meetings = await Meeting.find({ manager_id }).populate('team_member_id', 'username email');
        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createMeeting, getManagerMeetings };
