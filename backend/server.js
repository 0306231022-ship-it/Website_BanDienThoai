require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const DangNhap = require('./Routers/DangNhap'); // ✅ đường dẫn đúng nếu thư mục Routers nằm cùng cấp với server.js
const app = express();
const port = 5000;

// --- Middleware ---
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // React chạy tại cổng 3000
  credentials: true, // Cho phép gửi cookie/session qua fetch
}));
app.use(cookieParser());
app.use(session({
  secret: 'bi-mat-cua-ban', // Khóa bí mật cho session
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }, // 1 giờ
}));

// --- Gắn router ---
app.use('/api/users', DangNhap);

// --- Khởi động server ---
app.listen(port, () => {
  console.log(`✅ Server Node.js đang chạy tại http://localhost:${port}`);
});
