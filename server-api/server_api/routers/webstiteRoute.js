import { Router } from "express";
import ThuongHieuController from "../controllers/ThuongHieuController.js";
const websiteRoute = Router();
import multer from "multer";
const upload = multer();
websiteRoute.get('/laydsTH', upload.none(), ThuongHieuController.LayDanhSachThuongHieu);
console.log("✅ websiteRoute loaded");
export default websiteRoute;