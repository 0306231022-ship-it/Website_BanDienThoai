import 'dotenv/config.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import adminRouter from './routers/adminRouter.js';
import multer from "multer";

const app = express();

// ===================================================================
// CORS
// ===================================================================
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ===================================================================
// 2️⃣ Body parser cho JSON (chỉ dùng cho request JSON, KHÔNG phải form-data)
// ===================================================================

app.use(express.urlencoded({ extended: true }));
// ===================================================================
// 3️⃣ Cookies & session
// ===================================================================
app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

export const upload = multer();

app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => res.json({ message: 'Server API running' }));

app.use('/api/admin', adminRouter);

app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));

// ===================================================================
// 9️⃣ Error handler
// ===================================================================
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
