const express = require('express');
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
  const { action } = req.body;

  switch (action) {
    case 'LayDLDN_US':
      const taiKhoan1 = req.cookies.TaiKhoan;   
      const taiKhoan2 = req.session.TaiKhoan;   
      if (taiKhoan1 || taiKhoan2) {
        res.json([
          {
            ThanhCong: true,
          }
        ]);
      } else {
        res.json([
          {
            ThanhCong: false,
          }
        ]);
      }
      break;
    case 'KT_DL_AD' :
      const taiKhoan3 = req.cookies.TaiKhoan_admin;   
      const taiKhoan4 = req.session.TaiKhoan_admin;   
      if (taiKhoan3 || taiKhoan4) {
        res.json([
          {
            ThanhCong: true,
          }
        ]);
      } else {
        res.json([
          {
            ThanhCong: false,
          }
        ]);
      }
      break;

    default:
      res.json([
        {
          ThanhCong: false,
          TinNhan: 'Hành động không hợp lệ!'
        }
      ]);
  }
});

module.exports = router;
