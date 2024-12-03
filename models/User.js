const mongoose = require('mongoose');

// สร้าง schema สำหรับ User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['manager', 'teamMember'], required: true }, // role สามารถเป็น 'manager' หรือ 'teamMember'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
