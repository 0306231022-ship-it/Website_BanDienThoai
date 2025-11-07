const express = require('express');
const db = require('../src/config/db');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'bi-mat-cua-ban', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // 1 giờ
}));

router.post('/', (req, res) => {
  const { action, data } = req.body;
  console.log('🟢 Action nhận được:', action);
  console.log('🟢 Data:', data);

  switch (action) {

    case 'KiemTraNguoiDung':
      const taiKhoan1 = req.cookies.TaiKhoan;   
      const taiKhoan2 = req.session.TaiKhoan;   
      if (taiKhoan1 || taiKhoan2) {
        return res.json([{ ThanhCong: true }]);
      
      } 
      return res.json([{ ThanhCong: false }]);
      break;

    case 'KiemTraDangNhap_AD':
      const taiKhoan3 = req.cookies.TaiKhoan_admin;   
      const taiKhoan4 = req.session.TaiKhoan_admin;   
      if (taiKhoan3 || taiKhoan4) {
        return res.json([{ ThanhCong: true }]);
      } 
      return res.json([{ ThanhCong: false }]);

    case 'DangNhap_AD':
      const { Email, MatKhau, TrangThai } = data;
      const truyvan = 'SELECT * FROM nguoidung WHERE EMAIL=? AND MATKHAU=? AND LOAIND=1 LIMIT 1';
      
      db.query(truyvan, [Email, MatKhau], (err, rows) => {
        if (err) {
          return res.json([{ 
            ThanhCong: false,
            TinNhan: 'Lỗi truy vấn cơ sở dữ liệu!' 
          }]);
        }

        if (rows.length > 0) {
          const thongtin = {
            IDND: rows[0].IDND,
            Email: rows[0].EMAIL,
            MatKhau: rows[0].MATKHAU
          };

          if (TrangThai) {
            // Lưu cookie
            res.cookie('TaiKhoan_admin', thongtin, {
              httpOnly: true,
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
              sameSite: 'Lax'
            });
            return res.json([{ 
            ThanhCong: true,
            TinNhan: "Đăng nhập thành công VỚI COOKIES !",
          }]);
          } else {
            // Lưu session
            req.session.TaiKhoan_admin = thongtin;
               return res.json([{ 
            ThanhCong: true,
            TinNhan: "Đăng nhập thành công VỚI SESION !",
          }]);
          }

       
        } 

        return res.json([{ 
          ThanhCong: false,
          TinNhan: "Email hoặc mật khẩu không đúng!" 
        }]);
      });
      break;

    case 'DN_US':
      const { Email: EmailUS, MatKhau: MatKhauUS } = data;
      const sql = 'SELECT * FROM nguoidung WHERE EMAIL=? AND MATKHAU=? LIMIT 1';
      db.query(sql, [EmailUS, MatKhauUS], (err, rows) => {
        if (err) {
          return res.json([{ 
            ThanhCong: false,
            TinNhan: 'Lỗi truy vấn cơ sở dữ liệu!' 
          }]);
        }

        if (rows.length > 0) {
          return res.json([{ 
            ThanhCong: true,
            TinNhan: "Đăng nhập thành công!",
          }]);
        } 

        return res.json([{ 
          ThanhCong: false,
          TinNhan: "Email hoặc mật khẩu không đúng!" 
        }]);
      });
      break;

    default:
      return res.json([{ ThanhCong: false, TinNhan: 'Hành động không hợp lệ!' }]);
  }
});

module.exports = router;

