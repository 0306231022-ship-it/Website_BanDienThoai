import 'dotenv/config.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import adminRouter from './routers/adminRouter.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// ===================================================================
// 🚀 Serve thư mục hình ảnh trước 404
// ===================================================================
app.use("/uploads", express.static("uploads"));

// --- Test route ---
app.get('/', (req, res) => res.json({ message: 'Server API running' }));
app.use('/api/admin', adminRouter);

// --- 404 handler ---
app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));

// --- Error handler ---
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
