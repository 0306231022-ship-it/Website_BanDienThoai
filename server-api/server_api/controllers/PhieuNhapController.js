import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import PhieuNhapModal from '../models/PhieuNhapMoDel.js';
import { body, validationResult } from "express-validator";
import { mapFilesByProduct } from '../function.js';


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class PhieuNhapController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
    static async layChiTietPN(req, res) {
        try {
            const id = req.query.id;
            if (!id) {
                return res.json({
                    Status: false,
                    message: 'Không tìm thấy phiếu nhập!'
                });
            }
            const kq = await PhieuNhapModal.layChiTietPN(id);
            if(kq.Status){
                return res.json({
                    Status:true,
                    message:kq.message
                })
            };
            return res.json({
                ThanhCong:true,
                DuLieu:kq
            })
        } catch (error) {
            console.error(error);
            return res.json({
                Status: true,
                message: 'Có lỗi xảy ra khi lấy chi tiết phiếu nhập!',
                error: error.message
            });
        }
    }
    static async LayPhieuNhap_theo_id_trang(req,res){
        const id = req.query.id;
        const page = req.query.page;
        const linit = 10;
        const ketqua = await PhieuNhapModal.LayPhieuNhap_theo_id_trang(id,page,linit);
        if (ketqua) {
            return res.json({
                ThanhCong: true,
                dulieu: ketqua.phieu,
                Trang : {
                    totalPhieuNhap:  Math.ceil(ketqua.TtotalPhieuNhap/linit),
                     message: ketqua.message, 
                }                
            });
        } else {
            return res.json({
                ThanhCong: false,
                message: "Không có dữ liệu"
            });
        }
    }
   
    static async ThemPhieuNhap(req, res) {
        const files = req.files;
        let DuLieuPhieuNhap = req.body.DuLieu;
        if (typeof DuLieuPhieuNhap === 'string') {
             DuLieuPhieuNhap = JSON.parse(DuLieuPhieuNhap);
        }
        req.body = DuLieuPhieuNhap;
        //sửa lỗi

        const validate_values = [];
        // Validate Thông Tin Chung
        validate_values.push(
            body('ThongTinChung.IDNCC')
                .notEmpty().withMessage('Vui lòng chọn nhà cung cấp!')
                .custom(async (value) => {
                    const exists = await PhieuNhapModal.kiemtraidncc(value);
                    if (!exists) {
                        return Promise.reject('Nhà cung cấp không tồn tại hoặc không hoạt động!');
                    }
                }),
            body('ThongTinChung.IDND')
                .notEmpty().withMessage('ID người dùng không được để trống!')
                .custom(async (value) => {
                    const exists = await PhieuNhapModal.kiemtraidnd(value);
                    if (!exists) {
                        return Promise.reject('Người dùng không tồn tại hoặc không hoạt động!');
                    }
                }),
            body('ThongTinChung.GHICHU')
                .optional().isString().withMessage('Ghi chú phải là chuỗi!')
                .notEmpty().withMessage('Ghi chú không được để trống!')
                .isLength({ max: 500 }).withMessage('Ghi chú vượt quá kí tự cho phép!'),
            body('ThongTinChung.THANHTOAN.TONGTIEN')
                .notEmpty().withMessage('Vui lòng nhập tổng tiền!')
                .isFloat({ min: 0 }).withMessage('Tổng tiền phải là số hợp lệ và không được âm!'),
            body('ThongTinChung.THANHTOAN.DA_THANHTOAN')
                .notEmpty().withMessage('Vui lòng nhập số tiền đã thanh toán!')
                .isFloat({ min: 0 }).withMessage('Số tiền đã thanh toán phải là số hợp lệ và không được âm!')
                .custom((value, { req }) => {
                    if (parseFloat(value) > parseFloat(req.body.ThongTinChung.THANHTOAN.TONGTIEN)) {
                        throw new Error('Số tiền đã thanh toán không được lớn hơn tổng tiền!');
                    }           return true;
                }),
        );
        // Validate Sản Phẩm
        if (!Array.isArray(req.body.SANPHAM) || req.body.SANPHAM.length === 0) {
            return res.json({ Status: false, message: 'Vui lòng thêm sản phẩm vào phiếu nhập!' });
        }
        req.body.SANPHAM.forEach((sp, index) => {
            validate_values.push(
                body(`SANPHAM[${index}].TENSP`)
                    .notEmpty().withMessage(`Vui lòng nhập tên sản phẩm cho sản phẩm thứ ${index + 1}!`)
                    .isLength({ max: 255 }).withMessage(`Tên sản phẩm cho sản phẩm thứ ${index + 1} vượt quá kí tự cho phép!`),
                body(`SANPHAM[${index}].HANG`)
                    .notEmpty().withMessage(`Vui lòng nhập hãng cho sản phẩm thứ ${index + 1}!`)
                    .custom(async (value) => {
                        const exists = await PhieuNhapModal.kiemtrahang(value);
                        if (!exists) {
                            return Promise.reject(`Hãng ${value} không tồn tại hoặc không hoạt động!`);
                        }
                    }),
                body(`SANPHAM[${index}].GIANHAP`)
                    .notEmpty().withMessage(`Vui lòng nhập giá nhập cho sản phẩm thứ ${index + 1}!`)
                    .isFloat({ min: 0 }).withMessage(`Giá nhập cho sản phẩm thứ ${index + 1} phải là số hợp lệ và không được âm!`),
                body(`SANPHAM[${index}].GIABAN`)
                    .notEmpty().withMessage(`Vui lòng nhập giá bán cho sản phẩm thứ ${index + 1}!`)
                    .isFloat({ min: 0 }).withMessage(`Giá bán cho sản phẩm thứ ${index + 1} phải là số hợp lệ và không được âm!`),
                body(`SANPHAM[${index}].THONGSO_KYTHUAT.HEDIEUHANH`)
                    .optional().isString().withMessage(`Hệ điều hành phải là chuỗi!`)
                    .notEmpty().withMessage(`Vui lòng nhập hệ điều hành cho sản phẩm thứ ${index + 1}!`)
                    .isLength({ max: 100 }).withMessage(`Hệ điều hành cho sản phẩm thứ ${index + 1} vượt quá kí tự cho phép!`),
                body(`SANPHAM[${index}].THONGSO_KYTHUAT.MANHINH`)
                    .notEmpty().withMessage(`Vui lòng nhập màn hình cho sản phẩm thứ ${index + 1}!`)
                    .optional().isString().withMessage(`Màn hình phải là chuỗi!`),
                body(`SANPHAM[${index}].THONGSO_KYTHUAT.RAM`)
                    .notEmpty().withMessage(`Vui lòng nhập RAM cho sản phẩm thứ ${index + 1}!`)
                    .optional().isString().withMessage(`RAM phải là chuỗi!`),
                body(`SANPHAM[${index}].THONGSO_KYTHUAT.BONHOTRONG`)
                    .notEmpty().withMessage(`Vui lòng nhập bộ nhớ trong cho sản phẩm thứ ${index + 1}!`)
                    .optional().isString().withMessage(`Bộ nhớ trong phải là chuỗi!`),
                body(`SANPHAM[${index}].THONGSO_KYTHUAT.PIN`)
                    .notEmpty().withMessage(`Vui lòng nhập pin cho sản phẩm thứ ${index + 1}!`)
                    .optional().isString().withMessage(`Pin phải là chuỗi!`),
                body(`SANPHAM[${index}].THONGSO_KYTHUAT.MAUSAC`)
                    .notEmpty().withMessage(`Vui lòng nhập màu sắc cho sản phẩm thứ ${index + 1}!`)
                    .optional().isString().withMessage(`Màu sắc phải là chuỗi!`),
                body(`SANPHAM[${index}].MOTASP`)
                    .notEmpty().withMessage(`Vui lòng nhập mô tả sản phẩm cho sản phẩm thứ ${index + 1}!`)
                    .optional().isString().withMessage(`Mô tả sản phẩm phải là chuỗi!`)
                    .isLength({ max: 1000 }).withMessage(`Mô tả sản phẩm cho sản phẩm thứ ${index + 1} vượt quá kí tự cho phép!`),
            );
        });
        // validate hinh ảnh từ multer
        const filesByProduct = mapFilesByProduct(files);
        req.body.SANPHAM.forEach((sp, index) => {
            const filesForThisProduct = filesByProduct[index] || [];
            const expectedImageCount = parseInt(sp.SO_LUONG_ANH) || 0;
            if (filesForThisProduct.length < expectedImageCount) {
                validate_values.push(
                    body(`SANPHAM[${index}].HINHANH`).custom(() => {
                        throw new Error(`Số lượng hình ảnh tải lên cho sản phẩm thứ ${index + 1} không đủ!`);
                    })
                );
            }
        });
        //validate IMEI
        req.body.SANPHAM.forEach((sp, index) => {
            if (!Array.isArray(sp.IMEI) || sp.IMEI.length === 0) {
                validate_values.push(
                    body(`SANPHAM[${index}].IMEI`).custom(() => {
                        throw new Error(`Vui lòng nhập IMEI cho sản phẩm thứ ${index + 1}!`);
                    })
                );
            } else if (sp.IMEI.length != sp.SO_LUONG_ANH) {
                validate_values.push(
                    body(`SANPHAM[${index}].IMEI`).custom(() => {
                        throw new Error(`Số lượng IMEI không khớp với số lượng hình ảnh cho sản phẩm thứ ${index + 1}!`);
                    })
                );
            } else {
                sp.IMEI.forEach((imei, imeiIndex) => {
                    validate_values.push(
                        body(`SANPHAM[${index}].IMEI[${imeiIndex}]`)
                            .notEmpty().withMessage(`Vui lòng nhập IMEI thứ ${imeiIndex + 1} cho sản phẩm thứ ${index + 1}!`)
                            .isLength({ min: 14, max: 16 }).withMessage(`IMEI thứ ${imeiIndex + 1} cho sản phẩm thứ ${index + 1} phải từ 14 đến 16 ký tự!`)
                    );
                });
            }
        });
        // Run all validations
        await Promise.all(validate_values.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Status: true, Validate: true, errors: errors.array() });
        }
       const finalData = DuLieuPhieuNhap.SANPHAM.map((sp, index) => {
            const productFiles = filesByProduct[index] || [];
            const pathList = productFiles.map(f => `uploads/sanpham/${f.filename}`);
            return {
                ...sp,
                HINHANH: pathList
            };
        });
        console.log('finalData:', finalData);
        const ketqua = await PhieuNhapModal.ThemPhieuNhap(
            {
                ThongTinChung: DuLieuPhieuNhap.ThongTinChung,
                SANPHAM: finalData
            }
        );
        if (ketqua.ThanhCong) {
            return res.json({
                ThanhCong: true,
                message: ketqua.message
            });
        } else {
            return res.json({
                ThanhCong: false,
                message: ketqua.message
            });
        }
    }
    static async layDL(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { phieunhap, totalItems } =
            await PhieuNhapModal.LayDanhSachPhieu(offset, limit);

        const totalPages = Math.ceil(totalItems / limit);

        return res.json({
            phieunhap,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phiếu nhập:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
    }
   
}

}