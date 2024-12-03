const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const  connectDB  = require('./config/db');

// ใช้ dotenv เพื่อโหลดตัวแปรจากไฟล์ .env
dotenv.config();

// สร้างแอปพลิเคชัน Express
const app = express();

// เชื่อมต่อกับ MongoDB
connectDB();

// แปลงข้อมูลใน request body เป็น JSON
app.use(express.json());

// ตั้งค่า Route
app.use('/auth', authRoutes);      // สำหรับการลงทะเบียนและเข้าสู่ระบบ
app.use('/meetings', meetingRoutes); // สำหรับการจัดการการนัดหมาย

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
