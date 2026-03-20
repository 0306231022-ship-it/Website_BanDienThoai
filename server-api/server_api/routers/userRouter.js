import { Router } from "express";
import CanhanADController from "../controllers/CaNhanADController.js";
const NguoiDungRoute = Router();
import multer from "multer";
const upload = multer();
// PHẦN I : ĐỊNH NGHĨA ROUTE POST admin
//=========================================
// PHẦN II : ĐỊNH NGHĨA ROUTE POST NguoiDung
NguoiDungRoute.post('/DangKy', upload.none(), CanhanADController.DangKy_NguoiDung);
//=========================================
// PHẦN III : ĐỊNH NGHĨA ROUTE GET admin
//=========================================
// PHẦN IV : ĐỊNH NGHĨA ROUTE GET NguoiDung
//=========================================

console.log("✅ NguoiDungRoute loaded");
export default NguoiDungRoute;