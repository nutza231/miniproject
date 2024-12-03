const mongoose = require('mongoose');

// สร้าง schema สำหรับ Meeting
const meetingSchema = new mongoose.Schema({
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team_member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
});

// การตรวจสอบการทับซ้อนของเวลาในการนัดหมาย
meetingSchema.statics.isTimeSlotAvailable = async function(manager_id, start_time, end_time) {
    const existingMeeting = await this.findOne({
        manager_id,
        $or: [
            { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
            { start_time: { $gte: start_time, $lt: end_time }, end_time: { $gte: start_time } },
        ]
    });

    return !existingMeeting; // ถ้าไม่เจอการทับซ้อน จะคืนค่า true
};

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
