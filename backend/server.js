import "dotenv/config.js";
import express from 'express';
import bodyParser from 'body-parser';
import TaiKhoanRouter from '../backend/src/routes/TaiKhoanRouter.js';

const app = express();
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server API running');
});
//Đinh nghĩa các route
app.use('/api/users', TaiKhoanRouter);
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({ message: 'Something went wrong' });
    }
    // In development, provide entire error for debugging
    else return res.status(500).json({
        message: err.message,
        url: req.originalUrl,
        method: req.method,
        stack: err.stack
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;