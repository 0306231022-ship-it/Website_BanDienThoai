import 'dotenv/config.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import adminRouter from './routers/adminRouter.js';
import websiteRoute from './routers/webstiteRoute.js';

import './CleanDB.js';
const app = express();
//chấp nhận client vào server
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
//cấu hình cookies
app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => res.json({ message: 'Server API running' }));
app.use('/api/admin', adminRouter);
app.use('/api/website', websiteRoute);

app.use((req, res) => 
  res.json({
       Status:true,
       message: 'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!' 
  }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(500).json({
    message: err.message,
    url: req.originalUrl,
    body: req.body
  });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
