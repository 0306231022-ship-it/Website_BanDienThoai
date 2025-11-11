import 'dotenv/config.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoutes from './routers/userRouter.js';
import adminRouter from './routers/adminRouter.js';

const app = express();

// --- CORS setup phải đầu tiên ---
app.use(cors({
  origin: 'http://localhost:3000', // frontend React
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser()); // ✅ bật cookie-parser sau CORS
app.use(session({
  secret: 'secret-key',        
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }     
}));

// --- Test route ---
app.get('/', (req, res) => res.json({ message: 'Server API running' }));

// --- Mount routers ---
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRouter);

// --- 404 handler ---
app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  if (process.env.NODE_ENV === 'production') return res.status(500).json({ message: 'Something went wrong!' });

  res.status(500).json({
    message: err.message,
    code: err.code,
    url: req.originalUrl,
    body: req.body,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
