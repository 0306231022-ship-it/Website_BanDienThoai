import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Tên thư mục con bạn muốn (ví dụ: 'sanpham')
        const subFolder = 'sanpham'; 
        const rootDir = path.resolve('uploads');
        const finalPath = path.join(rootDir, subFolder);

        // Kiểm tra và tạo uploads/sanpham nếu chưa có
        if (!fs.existsSync(finalPath)) {
            fs.mkdirSync(finalPath, { recursive: true });
        }
        
        cb(null, finalPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });
export default upload;