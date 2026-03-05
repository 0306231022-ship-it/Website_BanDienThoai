import ThuongHieuModel from '../models/ThuongHieu.js';
import { body, validationResult } from "express-validator";
export default class ThuongHieuController{
    static async ThemThuongHieu(req,res){
       await Promise.all([
            body('TenTT')
                .trim()
                .notEmpty().withMessage('Vui lòng nhập tên thương hiệu')
                .isLength({ max: 100 }).withMessage('Tên thương hiệu không được vượt quá 100 ký tự'),
            body('MoTa')
                .trim()
                .notEmpty().withMessage('Vui lòng nhập mô tả thương hiệu')
                .isLength({ max: 255 }).withMessage('Mô tả thương hiệu không được vượt quá 255 ký tự'),
        ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return res.json({
                 Validate: true, 
                 errors: errors.array()
             })
        }
         const { TenTT, MoTa } = req.body;
         const files = req.files;
         let pathFile = files[0].filename;
         let DuongDan = 'uploads/thuonghieu/' + pathFile;
         if(!pathFile){
            return res.json({
                status:true,
                message:'Lỗi tải ảnh!'
            })
        };
        try {
             const ThemTH= await ThuongHieuModel.ThemThuongHieu(TenTT, MoTa, DuongDan);
             if(ThemTH){
                return res.json({
                    ThanhCong:true,
                    message:'Thêm thương hiệu thành công!'
                })
             }else{
                return res.json({
                    ThanhCong:false,
                    message:'Thêm thương hiệu thất bại!'
                })
             }
        } catch (error) {
            console.error('lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'lỗi hệ thống, vui lòng thử lại sau!'
            })
        }
    }
     static async SuaAnhThuongHieu(req, res) {
        const files = req.files;
        const id = req.body.id || null;
        const kiemtra = await ThuongHieuModel.kiemtraid(id);
        if(!kiemtra){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại thông tin gửi đi!'
            })
        }
         let pathFile = files[0].filename;
         let DuongDan = 'uploads/thuonghieu/' + pathFile;
        if (!pathFile) {
            return res.json({
                Status: true,
                message: 'Lỗi tải ảnh!'
            })
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                validate: true,
                errors: errors.array()
            });
        }
        const capNhatThanhCong = await ThuongHieuModel.CapNhatAnhThuongHieu(id, DuongDan);
        if (capNhatThanhCong) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật ảnh thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật ảnh thương hiệu thất bại!'
            });
        }
    }
     static async SuaTenThuongHieu(req, res) {
        await Promise.all([
            body('Ten')
                .trim()
                .notEmpty().withMessage('Vui lòng nhập tên thương hiệu')
                .isLength({ max: 100 }).withMessage('Tên thương hiệu không được vượt quá 100 ký tự'),
            body('id')
                .trim()
                .notEmpty().withMessage('Vui lòng kiểm tra lại dữ liệu gửi lên!')
                .custom(async (value) => {
                    const kiemtra = await ThuongHieuModel.kiemtraid(value);
                    if(!kiemtra){
                        return Promise.reject('Thương hiệu không tồn tại hoặc không hoạt động!');
                    }
                })
                .isLength({ max: 255 }).withMessage(' Kiểm tra lại thông tin id gửi đi!'),
        ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return res.json({
                 Validate: true, 
                 errors: errors.array()
             })
        }
        const { Ten } = req.body;
        const id = req.body.id || null;
        const capNhatThanhCong = await ThuongHieuModel.CapNhatTenThuongHieu(id, Ten);
        if (capNhatThanhCong) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật tên thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật tên thương hiệu thất bại!'
            });
        }
    }
    static async LayDanhSachThuongHieu(req,res){
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const { thuongHieu, totalItems } = await ThuongHieuModel.LayDanhSachThuongHieu(offset, limit);
            const totalPages = Math.ceil(totalItems / limit);
            return res.json({
                thuongHieu,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thương hiệu:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
        }
    }
    static async LayChiTietThuongHieu(req,res){
        const page =req.query.id || 1;
         try {      
            const thuongHieu= await ThuongHieuModel.LayChiTietThuongHieu(page);
            if(!thuongHieu){
                return res.json({
                    Status:true,
                    message:'Không tìm thấy thương hiệu!'
                })
            };
            return res.json({
                thuongHieu
            })
         } catch (error) {
            console.error('Lỗi khi lấy chi tiết thương hiệu:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
         }
    }
    static async ChinhSuaTrangThai(req,res){
        await Promise.all([
            body('TrangThai')
                .notEmpty()
                .withMessage('Vui lòng nhập đầy đủ thông tin!')
                .isIn([0,1])
                .withMessage('Trạng thái không hợp lệ!'),
            body('id')
                .trim()
                .notEmpty().withMessage('Vui lòng kiểm tra lại dữ liệu gửi lên!')
                .custom(async (value) => {
                    const kiemtra = await ThuongHieuModel.kiemtraid(value);
                    if(!kiemtra){
                        return Promise.reject('Thương hiệu không tồn tại hoặc không hoạt động!');
                    }
                })
                .isLength({ max: 255 }).withMessage(' Kiểm tra lại thông tin id gửi đi!'),
        ])
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return res.json({
                 Validate: true, 
                 errors: errors.array()
             })
        }
        const { id, TrangThai } = req.body;
        const capNhatThanhCong = await ThuongHieuModel.CapNhatTrangThaiThuongHieu(id, TrangThai);
        if (capNhatThanhCong) {
            return res.json({   
                ThanhCong: true,
                message: 'Cập nhật trạng thái thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật trạng thái thương hiệu thất bại!'
            });
        }
    }
    static async SuaMoTathuongHieu(req,res){
        await Promise.all([
             body('MoTa')
                .notEmpty()
                .withMessage('Vui lòng nhập đầy đủ thông tin!')
                .isLength({max:255})
                .withMessage('Vượt quá kí tự cho phép!'),
            body('id')
                .trim()
                .notEmpty().withMessage('Vui lòng kiểm tra lại dữ liệu gửi lên!')
                .custom(async (value) => {
                    const kiemtra = await ThuongHieuModel.kiemtraid(value);
                    if(!kiemtra){
                        return Promise.reject('Thương hiệu không tồn tại hoặc không hoạt động!');
                    }
                })
                .isLength({ max: 255 }).withMessage('Kiểm tra lại thông tin id!'),
        ])
        const { id, MoTa } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }   
        const capNhatThanhCong = await ThuongHieuModel.CapNhatMoTaThuongHieu(id, MoTa);
        if (capNhatThanhCong) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật mô tả thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật mô tả thương hiệu thất bại!'
            });
        }
    }
    static async layth(req,res){
        const ketqqua = await ThuongHieuModel.LayDShd();
        if(ketqqua){
         return res.json({
            ThanhCong:true,
            DuLieu:ketqqua
         })
       }else{
        return res.json({
            Status:true,
        })
     }
    }
    static async laysp_thuonghieu(req,res){
         const id = req.query.id|| null;
         const page=req.query.page || null ;
         const limit = parseInt(req.query.limit) || 2;
         const offset = (page - 1) * limit;
         const ketqqua = await ThuongHieuModel.laysp_thuonghieu(offset,limit,id);
         return res.json({ketqqua});
    }
}