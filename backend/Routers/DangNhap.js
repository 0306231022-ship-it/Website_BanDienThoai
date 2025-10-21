const express = require('express');
const db = require('../src/config/db');
const router = express.Router();

router.post('/', (req, res) => {
  const { action, data } = req.body;
  console.log('🟢 Action nhận được:', action);
  console.log('🟢 Data:', data);

  switch (action) {
    case 'KiemTraNguoiDung':
      const taiKhoan1 = req.cookies.TaiKhoan;   
      const taiKhoan2 = req.session.TaiKhoan;   
      if (taiKhoan1 || taiKhoan2) {
        res.json([{ ThanhCong: true }]);
      } else {
        res.json([{ ThanhCong: false }]);
      }
      break;

    case 'KT_DL_AD':
      const taiKhoan3 = req.cookies.TaiKhoan_admin;   
      const taiKhoan4 = req.session.TaiKhoan_admin;   
      if (taiKhoan3 || taiKhoan4) {
        res.json([{ ThanhCong: true }]);
      } else {
        res.json([{ ThanhCong: false }]);
      }
      break;

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
            res.json([{ 
              ThanhCong: true,
              TinNhan: "Đăng nhập thành công!",
              DuLieu: rows[0]
            }]);
          } else {
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
