const express = require('express');
const db = require('../src/config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = express.Router();
const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'bi-mat-cua-ban',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } 
}));

router.post('/', (req, res) => {
  const { action, data } = req.body;

  switch (action) {

    // 🟩 Kiểm tra đăng nhập người dùng (từ cookie/session)
    case 'LayDLDN_US':
      const taiKhoan1 = req.cookies.TaiKhoan;   
      const taiKhoan2 = req.session.TaiKhoan;   
      if (taiKhoan1 || taiKhoan2) {
        res.json([{ ThanhCong: true }]);
      } else {
        res.json([{ ThanhCong: false }]);
      }
      break;

    // 🟨 Kiểm tra đăng nhập admin
    case 'KT_DL_AD':
      const taiKhoan3 = req.cookies.TaiKhoan_admin;   
      const taiKhoan4 = req.session.TaiKhoan_admin;   
      if (taiKhoan3 || taiKhoan4) {
        res.json([{ ThanhCong: true }]);
      } else {
        res.json([{ ThanhCong: false }]);
      }
      break;

    // 🟥 Đăng nhập người dùng
    case 'DN_US':
      const { Email, MatKhau } = data;
      const sql = 'SELECT * FROM nguoidung WHERE EMAIL=? AND MATKHAU=? LIMIT 1';
      db.query(sql, [Email, MatKhau], (err, rows) => {
        if (err) {
          res.json([{ 
            ThanhCong: false,
            TinNhan: 'Lỗi truy vấn cơ sở dữ liệu!' 
          }]);
        } else {
          if (rows.length > 0) {
            // ✅ Có người dùng khớp
            res.json([{ 
              ThanhCong: true,
              TinNhan: "Đăng nhập thành công!",
              DuLieu: rows[0]
            }]);
          } else {
            // ❌ Không tìm thấy user
            res.json([{ 
              ThanhCong: false,
              TinNhan: "Email hoặc mật khẩu không đúng!" 
            }]);
          }
        }
      });
      break;

    default:
      res.json([{ ThanhCong: false, TinNhan: 'Hành động không hợp lệ!' }]);
      break;
  }
});

module.exports = router;

