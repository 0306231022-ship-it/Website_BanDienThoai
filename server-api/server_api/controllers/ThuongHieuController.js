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
                Status:true,
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
        const pathFile = files[0].path.replace(/\\/g, '/');
        if (!pathFile) {
            return res.json({
                Status: true,
                message: 'Lỗi tải ảnh!'
            })
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                validation: true,
                errors: errors.array()
            });
        }
        const capNhatThanhCong = await ThuongHieuModel.CapNhatAnhThuongHieu(id, pathFile);
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
    static async SuaTenThuongHieu(req, res) {
        const { Ten } = req.body;
        const id = req.body.id || null;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }
        // Logic cập nhật tên thương hiệu dựa trên ID
        // Giả sử bạn có một phương thức trong model để cập nhật tên thương hiệu
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
    
   
    static async ChinhSuaTrangThai(req,res){
        const { id, TrangThai } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }
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
                ThatBai: true,
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