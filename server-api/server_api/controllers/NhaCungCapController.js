import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import NhaCungCapModel from '../models/NhaCungCapModel.js';
import { body, validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class NhaCungCapController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
    static async ThemCungCap(req,res) {
            await Promise.all([
                  body('DinhDanh.MaDinhDanh')
                    .trim().notEmpty()
                    .withMessage('Mã định danh không được bỏ trống!')
                    .isLength({ min: 1, max: 20 }).withMessage('Mã định danh từ 1-20 ký tự!')
                    .run(req),
                 body('DinhDanh.TenNhaCungCap')
                    .trim()
                    .notEmpty().withMessage('Tên nhà cung cấp không được bỏ trống!')
                    .isLength({ min: 1, max: 50 }).withMessage('Tên nhà cung cấp không vượt quá 50 kí tự!')
                    .run(req),

                body('NguoiLienHe.TenNguoiDung')
                    .trim().notEmpty().withMessage('Tên người dùng không được bỏ trống!')
                    .isLength({ min: 1, max: 70 }).withMessage('Tên người dùng không vượt quá 70 kí tự!')
                    .run(req)   ,
                body('NguoiLienHe.SDT')
                    .trim().notEmpty().withMessage('Số điện thoại không được bỏ trống!')
                    .matches(/^(0[3|5|7|8|9])[0-9]{8}$/).withMessage('Số điện thoại không đúng định dạng Việt Nam (10 số)')
                    .run(req),
                body('NguoiLienHe.Email')
                    .trim().notEmpty().withMessage('Email không được bỏ trống!')
                    .isEmail().withMessage('Địa chỉ Email không đúng định dạng (ví dụ: abc@gmail.com)')
                    .normalizeEmail()
                    .run(req),
                body('NguoiLienHe.DiaChiKho')
                    .trim().notEmpty().withMessage('Địa chỉ kho không được bỏ trống!')
                    .isLength({ max: 255 }).withMessage('Địa chỉ kho không được quá 255 ký tự!')
                    .run(req),
                body('TaiChinh.MaThue') 
                    .trim().notEmpty().withMessage('Mã số thuế không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('Mã số thuế không được quá 20 ký tự!')
                    .run(req),
                body('TaiChinh.STK')
                    .trim().notEmpty().withMessage('Số tài khoản không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('Số tài khoản không được quá 20 ký tự!')
                    .run(req),
                 body('TaiChinh.NganHang')
                    .trim().notEmpty().withMessage('Tên ngân hàng không được bỏ trống!')
                    .isLength({ max: 50 }).withMessage('Tên ngân hàng không được quá 50 ký tự!')
                    .run(req),
                body('GhiChu')
                    .trim().notEmpty().withMessage('Ghi chú không được bỏ trống!')
                    .isLength({ max: 255 }).withMessage('Ghi chú không được quá 255 ký tự!')
                    .run(req),
            ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true, 
                    errors: errors.array()
                })
            }
            const DuLieu=req.body;
            try {
                const ketqua= await NhaCungCapModel.ThemCungCap(DuLieu);
                if (ketqua) {
                    return res.json({   
                        ThanhCong: true,
                        message: 'Thêm mới 1 nhà cung cấp thành công!'
                    });
                } else {
                    return res.json({
                        ThanhCong: false,
                        message: 'Thêm mới 1 nhà cung cấp thất bại!'
                    });
                 }
            } catch (error) {
                console.error('Đã có lỗi xãy ra:'+ error);
                return res.json({
                    Status:true,
                    message:'Đã sãy ra lỗi trên hệ thống! Vui lòng thử lại sau.'
                })
            }
        }
    static async CapNhatSDT(req,res){
        const { So } = req.body;
        const id = req.body.id || null;
        await Promise.all([
            body('So')
                .trim().notEmpty().withMessage('Số điện thoại không được bỏ trống!')
                .matches(/^(0[3|5|7|8|9])[0-9]{8}$/).withMessage('Số điện thoại không đúng định dạng Việt Nam (10 số)')
                .run(req),
            body('id')
                .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                .custom(async (value) => {
                    const exists = await NhaCungCapModel.kiemtraid(value);
                    if (!exists) {
                        throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                    }
                    return true;
                })
                .run(req),
        ]);
        const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.json({
                Validate: true,
                errors: errors.array()
            })
            }
            try {
                const CapNhat = await NhaCungCapModel.CapNhatSDT(So, id);
                if (CapNhat) {
                    return res.json({
                        ThanhCong: true,
                        message: 'Cập nhật số điện thoại nhà cung cấp thành công!'
                    });
                } else {
                    return res.json({
                        ThanhCong: false,
                        message: 'Cập nhật số điện thoại nhà cung cấp thất bại!'
                    });
                }
            } catch (error) {
                console.error('Đã có lỗi xãy ra:' + error);
                return res.json({
                    Status: true,
                    message: 'Đã sãy ra lỗi trên hệ thống! Vui lòng thử lại sau.'
                });
            }
    }
    static async CapNhatEmail(req,res){
        const { Email } = req.body;
        const id = req.body.id || null;
        await Promise.all([
            body('Email')
                .trim().notEmpty().withMessage('Email không được bỏ trống!')
                .isEmail().withMessage('Địa chỉ Email không đúng định dạng (ví dụ: example@gmail.com)') 
                .normalizeEmail()
                .run(req),
            body('id')
                .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                .custom(async (value) => {
                    const exists = await NhaCungCapModel.kiemtraid(value);
                    if (!exists) {
                        throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                    }
                    return true;
                })
                .run(req),
        ]);
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true,
                    errors: errors.array()
                });
            }
            try {
                const CapNhat = await NhaCungCapModel.CapNhatEmail(Email, id);
                if (CapNhat) {
                    return res.json({
                        ThanhCong: true,
                        message: 'Cập nhật email nhà cung cấp thành công!'
                    });
                } else {
                    return res.json({
                        ThanhCong: false,
                        message: 'Cập nhật email nhà cung cấp thất bại!'
                    });
                }
            } catch (error) {
                console.error('Đã có lỗi xãy ra:' + error);
                return res.json({
                    Status: true,
                    message: 'Đã sãy ra lỗi trên hệ thống! Vui lòng thử lại sau.'
                });
            }
    }

     static async LayDanhSachNhaCungCap(req,res){
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const offset = (page - 1) * limit;
                const { nhacungcap, totalItems } = await NhaCungCapModel.LayDanhSachNhaCungCap(offset, limit);
                const totalPages = Math.ceil(totalItems / limit);
                return res.json({
                    nhacungcap,
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
        static async layChiTiet(req,res){
             const id =req.query.id;
             if(!id){
                return res.json({
                    Status:true,
                    message:'Hệ thống không tìm thấy nhà cung cấp!'
                });
             }
             try {
                const NhaCungCap= await NhaCungCapModel.layChiTiet(id);
                if(!NhaCungCap){
                    return res.json({
                        Status:true,
                        message:'Hệ thống không tìm thấy nhà cung cấp!'
                    })
                };
                return res.json({
                    ThanhCong:true,
                    DuLieu:NhaCungCap
            })
             } catch (error) {
                console.error('Đã sãy ra lỗi trên hệ thống : ' + error);
                return res.json({
                    Status:true,
                    message:'Đã sãy ra lỗi trên hệ thống! Vui lòng thử lại sau.'
                })
             }

        }
        
        static async CapNhatTen(req,res){
            const { Ten } = req.body;
            const id = req.body.id || null;
            await Promise.all([
                body('Ten')
                    .trim().notEmpty().withMessage('Tên nhà cung cấp không được bỏ trống!')
                    .isLength({ max: 255 }).withMessage('Tên nhà cung cấp không được quá 255 ký tự!')
                    .run(req),
                body('id')
                    .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                    .custom(async (value) => {  
                        const exists = await NhaCungCapModel.kiemtraid(value);
                        if (!exists) {
                            throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                        }
                        return true;
                    })
                    .run(req),
            ]);
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatTen(Ten,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật tên nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật tên nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatMaDinhDanh(req,res){
            const { Ten } = req.body;
            const id = req.body.id || null;
            await Promise.all([
                body('Ten')
                    .trim().notEmpty().withMessage('Tên mã định danh không được bỏ trống!')
                    .isLength({ max: 255 }).withMessage('Tên mã định danh không được quá 255 ký tự!')
                    .run(req),
                body('id')
                    .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                    .custom(async (value) => {  
                        const exists = await NhaCungCapModel.kiemtraid(value);
                        if (!exists) {
                            throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                        }
                        return true;
                    })
                    .run(req),
            ]);
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatMaDinhDanh(Ten,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật mã định danh nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật mã định danh nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatMoTa(req,res){
            const { id, MoTa } = req.body;
                await Promise.all([
                    body('MoTa')
                        .trim().notEmpty().withMessage('Mô tả không được bỏ trống!')
                        .isLength({ max: 255 }).withMessage('Mô tả không được quá 255 ký tự!')
                        .run(req),
                    body('id')
                        .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                        .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                        .custom(async (value) => {
                            const exists = await NhaCungCapModel.kiemtraid(value);
                            if (!exists) {
                                throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                            }
                            return true;
                        })
                        .run(req),
                ]);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                     Validate: true, 
                     errors: errors.array() 
                });
            }   
            const capNhatThanhCong = await NhaCungCapModel.CapNhatMoTaNhaCungCap(id, MoTa);
            if (capNhatThanhCong) {
                return res.json({
                    ThanhCong: true,
                    message: 'Cập nhật mô tả nhà cung cấp thành công!'
                });
            } else {
                return res.json({
                    ThatBai: true,
                    message: 'Cập nhật mô tả nhà cung cấp thất bại!'
                });
            }
        }
        static async CapNhatNguoiDaiDien(req,res) {
            const { Ten } = req.body;
            const id = req.body.id || null;
            await Promise.all([
                body('Ten')
                    .trim().notEmpty().withMessage('Tên người đại diện không được bỏ trống!')
                    .isLength({ max: 255 }).withMessage('Tên người đại diện không được quá 255 ký tự!')
                    .run(req),
                body('id')
                    .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                    .custom(async (value) => {
                        const exists = await NhaCungCapModel.kiemtraid(value);
                        if (!exists) {
                            throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                        }
                        return true;
                    })
                    .run(req),
            ]);
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat= await NhaCungCapModel.CapNhatNguoiDaiDien(id,Ten);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật tên người liên hệ thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật tên người liên hệ thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatDiaChi(req,res){
            const { DiaChi } = req.body;
            const id = req.body.id || null;
            await Promise.all([
            body('DiaChi')
                .trim().notEmpty().withMessage('Địa chỉ không được bỏ trống!')
                .isLength({ max: 255 }).withMessage('Địa chỉ không được quá 255 ký tự!')
                .run(req),
            body('id')
                .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                .custom(async (value) => {
                    const exists = await NhaCungCapModel.kiemtraid(value);
                    if (!exists) {
                        throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                    }
                    return true;
                })
                .run(req),
            ]);
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat= NhaCungCapModel.CapNhatDiaChi(id,DiaChi);
              if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật địa chỉ nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật địa chỉ nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatTenNganHang(req,res){
            const { Ten } = req.body;
            const id = req.body.id || null;
                await Promise.all([
                    body('Ten')
                        .trim().notEmpty().withMessage('Tên ngân hàng không được bỏ trống!')
                        .isLength({ max: 255 }).withMessage('Tên ngân hàng không được quá 255 ký tự!')
                        .run(req),
                    body('id')
                        .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                        .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                        .custom(async (value) => {
                            const exists = await NhaCungCapModel.kiemtraid(value);
                            if (!exists) {
                                throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                            }
                            return true;
                        }
                        ).run(req),
                ]);
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatTenNganHang(Ten,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật tên ngân hàng nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật tên ngân hàng nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }

        }
        static async CapNhatSoTaiKhoan(req,res){
            const { So } = req.body;
            const id = req.body.id || null;
            await Promise.all([
                body('So')
                    .trim().notEmpty().withMessage('Số tài khoản không được bỏ trống!')
                    .isLength({ max: 255 }).withMessage('Số tài khoản không được quá 255 ký tự!')
                    .run(req),
                body('id')
                    .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                    .custom(async (value) => {
                        const exists = await NhaCungCapModel.kiemtraid(value);
                        if (!exists) {
                            throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                        }
                        return true;
                    })
                    .run(req),
            ]);
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatSTKNganHang(So,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật số tài khoản ngân hàng nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật số tài khoản ngân hàng nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async LayDShd(req,res){
            const ketqqua = await NhaCungCapModel.LayDShd();
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
        static async kiemtraid(req,res){
            const kiemtra = await NhaCungCapModel.kiemtraid(req.query.id);
            return res.json({kiemtra})
        }
        static async lay_sp_theo_id_ncc(req,res){
            const page = req.query.page;
            const id = req.query.id;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            try {
                const ketqua = await NhaCungCapModel.lay_sp_theo_id_ncc(id,limit,offset);
                if(ketqua.ThanhCong){
                    return res.json({
                        ThanhCong:true,
                        dulieu: ketqua.dulieu
                    })
                }
                if(ketqua.status){
                    return res.json({
                        status:true,
                        message:ketqua.message
                    })
                }
            } catch (error) {
                console.error('Looix sãy ra:'+ error);
                return res.json({
                    status:true,
                    message:'Không thể kết nối với hệ thống,Vui lòng thực hiện sau!'
                })
            }

        }
            static async CapNhatTrangThai(req,res){
            const { id, TrangThai } = req.body;
            await Promise.all([
                body('TrangThai')
                    .trim().notEmpty().withMessage('Trạng thái hoạt động không được bỏ trống!')
                    .isIn(['0', '1']).withMessage('Trạng thái hoạt động không hợp lệ! Chỉ nhận giá trị 0 hoặc 1.')
                    .run(req),
                body('id')
                    .trim().notEmpty().withMessage('ID nhà cung cấp không được bỏ trống!')
                    .isLength({ max: 20 }).withMessage('ID nhà cung cấp không được quá 20 ký tự!')
                    .custom(async (value) => {
                        const exists = await NhaCungCapModel.kiemtraid(value);
                        if (!exists) {
                            throw new Error('Hệ thống không tìm thấy nhà cung cấp!');
                        }
                        return true;
                    })
                    .run(req),
            ]);
            const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.json({
                        Validate: true,
                        errors: errors.array()
                    });
                }
               /* const CapNhat = await NhaCungCapModel.CapNhatTrangThai(id, TrangThai);
                if (CapNhat) {
                    return res.json({
                        ThanhCong: true,
                        message: 'Cập nhật trạng thái hoạt động nhà cung cấp thành công!'
                    });
                }
                else {
                    return res.json({
                        ThanhCong: false,
                        message: 'Cập nhật trạng thái hoạt động nhà cung cấp thất bại! Vui lòng thử lại sau.'
                    });
                }*/
        }
}