import { xoaFileCu } from '../function.js';
import CaiDatModel from '../models/CaiDatWebsite.js';
import { body, validationResult } from 'express-validator';
export default class adminController{

    static async CapNhatTen(req,res){
        try {
             await Promise.all([
            body('Ten')
                .notEmpty()
                .withMessage('Vui lòng nhập đầy đủ thông tin!')
                .isLength({max:50})
                .withMessage('Vượt quá kí tự cho phép!')
                .run(req)
        ]);
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    validation: true,
                    errors: errors.array() 
                });
            }
         const { Ten } = req.body;
         if (!Ten) {
            return res.json({ 
                ThanhCong:false,
                message: 'Vui lòng kiểm tra lại dữ liệu!' 
            });
        } 
        const CaiDat= await CaiDatModel.updateTen(Ten);
        if(!CaiDat){
            return res.json({
                ThanhCong: false,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
            })
        }
        return res.json({
            ThanhCong:true,
            message:'Cập nhật tên website thành công!'
        })
       
        } catch (error) {
            console.error('Lỗi trong CapNhatTen:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật tên website.'
            });
        }
       
    }
    static async ChinhSuaLoGo(req,res){
        try {
            const files = req.files;
            const AnhCu = await CaiDatModel.GetTTWebsite();
            const DuongDanAnhCu = AnhCu?.LoGo;
            await xoaFileCu(DuongDanAnhCu);
            let pathFile = files[0].filename;
            let DuongDan = 'uploads/logo/' + pathFile;
            if (!pathFile) {
                return res.json({
                    ThanhCong: false,
                    message: 'Lỗi tải ảnh!'
                })
            };
            const ketqua= await CaiDatModel.updateHinhAnh(DuongDan);
            if(!ketqua){
                return res.json({
                    ThanhCong: false,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
                })
            }
            return res.json({
                ThanhCong:true,
                message:'Cập nhật logo website thành công!'
            })
        }catch (error) {
            console.error('Lỗi trong ChinhSuaLoGo:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật logo.'
            });
        }
    }
    
    static async CapNhatMoTa(req,res){
        try{
            const { MoTa } = req.body;
            await Promise.all([
                body('MoTa')
                    .notEmpty()
                    .withMessage('Vui lòng nhập đầy đủ thông tin!')
                    .isLength({max:500})
                    .withMessage('Vượt quá kí tự cho phép!')
                    .run(req)
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    validation: true,
                    errors: errors.array() 
                });
            }
            const CaiDat= await CaiDatModel.updateMoTa(MoTa);
            if(!CaiDat){
                return res.json({
                    ThanhCong: false,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
                })
            }
            return res.json({
                ThanhCong:true,
                message:'Cập nhật mô tả website thành công!'
            })
        }catch (error) {
            console.error('Lỗi trong CapNhatMoTa:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật mô tả.'
            });
        }
    }
    static async CapNhatLinkFaceBook(req,res){
        try {
            const { FacebookUrl } = req.body;
            await Promise.all([
                body('FacebookUrl')
                    .notEmpty()
                    .withMessage('Vui lòng nhập đầy đủ thông tin!')
                    .isURL()
                    .withMessage('Vui lòng nhập đúng định dạng URL!')
                    .run(req)
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    validation: true,
                    errors: errors.array()
                });
            }
             const CaiDat= await CaiDatModel.updateLinkFaceBook(FacebookUrl);
             if(!CaiDat){
                return res.json({
                    ThanhCong: false,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
                })
            }
            return res.json({
                ThanhCong:true,
                message:'Cập nhật link FaceBook thành công!'
            })
        } catch (error) {
            console.error('Lỗi trong CapNhatLinkFaceBook:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật link FaceBook.'
            });
        }
    }
    static async  CapNhatIns(req,res){
        try {
            const { InstagramUrl } = req.body;
            await Promise.all([
                body('InstagramUrl')
                    .notEmpty()
                    .withMessage('Vui lòng nhập đầy đủ thông tin!')
                    .isURL()
                    .withMessage('Vui lòng nhập đúng định dạng URL!')
                    .run(req)
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    validation: true,
                    errors: errors.array()
                });
            }
            const CaiDat= await CaiDatModel.updateLinkIns(InstagramUrl);
            if(!CaiDat){
                return res.json({
                    ThanhCong: false,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
                })
            }
            return res.json({
                ThanhCong:true,
                message:'Cập nhật link Instagram thành công!'
            })
        }
        catch (error) {
            console.error('Lỗi trong CapNhatIns:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật link Instagram.'
            });
        }
    }
    static async CapNhatDiaChi(req, res) {
        try {
            const { Ten } = req.body;
            await Promise.all([
                body('Ten')
                    .notEmpty()
                    .withMessage('Vui lòng nhập đầy đủ thông tin!')
                    .isLength({ max: 255 })
                    .withMessage('Vượt quá kí tự cho phép!')
                    .run(req)
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true,
                    errors: errors.array()
                });
            }
             const result = await CaiDatModel.updateDiaChi(Ten);
             if (!result) {
                return res.json({
                    ThanhCong: false,
                    message: 'Không có thay đổi nào được thực hiện.'
                });
            }
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật địa chỉ mới thành công!'
            });
        } catch (error) {
            console.error('Lỗi trong CapNhatDiaChi:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật địa chỉ.'
            });
        }
    }
   static async CapNhatEmail(req, res) {
        try {
            const { Ten } = req.body;
            await Promise.all([
                body('Ten')
                    .notEmpty()
                    .withMessage('Vui lòng nhập đầy đủ thông tin!')
                    .isEmail()
                    .withMessage('Vui lòng nhập đúng định dạng Email!')
                    .run(req)
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true,
                    errors: errors.array()
                });
            }
            const result = await CaiDatModel.updateEmail(Ten);
            if (!result) {
                return res.json({
                    ThanhCong: false,
                    message: 'Không có thay đổi nào được thực hiện.'
                });
            }
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật Email mới thành công!'
            });
        } catch (error) {
            console.error('Lỗi trong CapNhatEmail:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật Email.'
            });
        }
   }
 // đã chỉnh sửa xong
    static async CapNhatSoDienThoai(req, res) {
        try {
            const {Sdt} = req.body;
            await Promise.all([
                body('Sdt')
                    .notEmpty()
                    .withMessage('Vui lòng nhập đầy đủ thông tin!')
                    .isLength({ min: 10, max: 15 })
                    .withMessage('Số điện thoại phải có độ dài từ 10 đến 15 ký tự!')
                    .matches(/^\+?\d+$/)
                    .withMessage('Số điện thoại chỉ được chứa các chữ số và có thể bắt đầu bằng dấu +.')
                    .run(req)
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true,
                    errors: errors.array()
                });
            }
            const result = await CaiDatModel.updateSoDienThoai(Sdt);
            if(!result){
                return res.json({
                    ThanhCong: false,
                    message: 'Cập nhật thất bại, vui lòng thử lại!'
                });
            }
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật số điện thoại thành công!'
            });
        } catch (error) {
            console.error('Lỗi trong CapNhatSoDienThoai:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình cập nhật số điện thoại.'
            });
        }
    }


    static async LayWebsite(req,res){
        const kq= await CaiDatModel.GetTTWebsite();
        if(kq){
            res.json({
                ThanhCong:true,
                DuLieu:kq
            })
        }else{
            res.json({
                ThanhCong: false,
            })
        }

    }
    static async updateWebsite(req,res){
         const dulieu = req.body.Dulieu;
         const dsAnh = req.files.map(file => "/uploads/" + file.filename);
         const logo = dsAnh[0] || null;
         const ketqua= await CaiDatModel.UpdateWebsite(dulieu,logo);
         if(ketqua){
            return res.json({
                ThanhCong:true,
                message:'Cập nhật website thành công!'
            })
         }else{
            return res.json({
                ThanhCong:false,
                message:'Cập nhật thất bại vui lòng kiểm tra lại thông tin'
            });
         }
    }
}