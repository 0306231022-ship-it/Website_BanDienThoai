import pkg from 'bcrypt';
const { hash, compare } = pkg;
import adminModel from '../models/adminModel.js';
import XacThucModelr from '../models/XacThucOTP.js';
import { generateToken } from '../function.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { xoaFileCu } from '../function.js';
import XacThucModel from '../models/XacThucOTP.js';
export default class CanhanADController{
    static async DangKy_NguoiDung(req, res) {
        const dulieu = req.body;
            Promise.all([
                body('email')
                    .notEmpty()
                    .withMessage('Email không được bỏ trống!')
                    .isEmail()
                    .withMessage('Email không hợp lệ!')
                    .isLength({ max: 225 })
                    .custom(async (value) => {
                        const existingUser = await adminModel.LayTT_Email(value);
                        if (existingUser) {
                            throw new Error('Email đã tồn tại!');
                        }
                    })
                    .run(req),
                body('password')
                    .notEmpty()
                    .withMessage('Mật khẩu không được bỏ trống!')
                    .isLength({ max: 225 })
                    .withMessage('Mật khẩu vượt quá ký tự cho phép!')
                    .isLength({ min: 6 })
                    .withMessage('Mật khẩu phải có ít nhất 6 ký tự!')
                    .run(req),
                body('name')
                    .notEmpty()
                    .withMessage('Tên không được bỏ trống!')
                    .isLength({ max: 255 })
                    .withMessage('Tên vượt quá ký tự cho phép!')
                    .run(req),
                body('phone')
                    .notEmpty()
                    .withMessage('Số điện thoại không được bỏ trống!')
                    .isLength({ max: 10 })
                    .withMessage('Số điện thoại vượt quá ký tự cho phép!')
                    .run(req),
                body('confirm_password')
                    .notEmpty()
                    .withMessage('Mật khẩu xác nhận không được bỏ trống!')
                    .isLength({ max: 225 })
                    .withMessage('Mật khẩu xác nhận vượt quá ký tự cho phép!')
                    .custom((value, { req }) => {
                        if (value !== req.body.password) {
                            throw new Error('Mật khẩu xác nhận không khớp!');
                        }
                        return true;
                    })
                    .run(req)
            ]).then(() => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.json({
                        validation: true,
                        errors: errors.array() 
                    });
                }
                if (!dulieu) {
                    return res.json({ 
                        ThanhCong: false,
                        message: 'Vui lòng kiểm tra lại dữ liệu!' 
                    });
                }
                hash(dulieu.password, 10).then(hashedPassword => {
                    const newUser = {
                        name: dulieu.name,
                        email: dulieu.email,
                        phone: dulieu.phone,
                        password: hashedPassword
                    };
                    adminModel.DangKy_NguoiDung(newUser).then(result => {
                        if (result) {
                            return res.json({
                                ThanhCong: true,
                                message: 'Bạn đã đăng ký thành công! Vui lòng đăng nhập để tiếp tục.'
                            });
                        } else {
                            return res.json({
                                ThanhCong : false,
                                message: 'Đăng ký thất bại, vui lòng thử lại sau!'
                            });
                        }
                    }).catch(err => {
                        console.error('Lỗi trong quá trình đăng ký:', err);
                        return res.json({
                            ThanhCong: false,
                            message: 'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                        });
                    });
                }).catch(err => {
                    console.error('Lỗi trong quá trình băm mật khẩu:', err);
                    return res.json({
                        ThanhCong: false,
                        message: 'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                    });
                });
            }).catch(err => {
                console.error('Lỗi trong quá trình xác thực:', err);
                return res.json({
                    ThanhCong: false,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                });
            });
       
    }
    static async DangNhap_NguoiDung(req, res) {
        Promise.all([
            body('email')
                .notEmpty()
                .withMessage('Email không được bỏ trống!')
                .isEmail()
                .withMessage('Email không hợp lệ!')
                .isLength({ max: 255 })
                .withMessage('Vượt quá kí tự quy định!')
                .run(req),
            body('password')
                .notEmpty()
                .withMessage('Mật khẩu không được bỏ trống!')
                .isLength({ max: 255 })
                .withMessage('Mật khẩu vượt quá ký tự cho phép!')
                .run(req)
        ]).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    validation: true,
                    errors: errors.array() 
                });
            }
            const dulieu = req.body;
            if (!dulieu) {
                return res.json({ 
                    ThanhCong: false, 
                    message: 'Vui lòng kiểm tra lại dữ liệu!' 
                });
            }
            adminModel.login(dulieu.email).then(DangNhap => {
                if(!DangNhap){
                    return res.json({
                        ThanhCong: false,
                        message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                    })
                }
                if(DangNhap){
                    compare(dulieu.password, DangNhap.MATKHAU).then(isMatch => {
                        if (isMatch) {
                            if (DangNhap.TRANGTHAI !== 1) {
                                return res.json({
                                    ThanhCong: false,
                                    message:'Tài khoản đã ngùng hoạt động!'
                                })
                            }
                             const token =  generateToken(DangNhap);
                             if(DangNhap.LOAIND === 1){
                                res.cookie('token_admin', token, {
                                    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
                                    httpOnly: true,             // chống XSS
                                    secure: false,              // true nếu dùng https
                                    sameSite: 'lax',
                                    path: '/'
                                });
                            }else{
                                res.cookie('token_nguoidung', token, {
                                    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
                                    httpOnly: true,             // chống XSS
                                    secure: false,              // true nếu dùng https
                                    sameSite: 'lax',
                                    path: '/'
                                });
                            }
                                const { MATKHAU, ...KetQua } = DangNhap;
                                return res.json({
                                    ThanhCong: true,
                                    message: 'Bạn đã đăng nhập thành công!',
                                    DuLieu: KetQua
                                });
                       
                        } else {
                            return res.json({
                                ThanhCong: false,
                                message:'Email hoặc hoặc mật khẩu sai!'
                            });
                        }
                    }).catch(err => {
                        console.error('Lỗi trong quá trình so sánh mật khẩu:', err);
                        return res.json({
                            ThanhCong: false,
                            message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                        });
                    });
                }
            }).catch(err => {
                console.error('Lỗi trong quá trình đăng nhập:', err);
                return res.json({
                    ThanhCong: false,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                });
            });
        }).catch(err => {
            console.error('Lỗi trong quá trình xác thực:', err);
            return res.json({
                ThanhCong: false,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
            });
        });
    }

    static async KiemTraDangNhap_NguoiDung(req, res) {
       const userId = req.user.id; 
        if (!userId) {
            return res.json({
                ThanhCong: false,
                message: 'Bạn chưa đăng nhập!'
            });
        }
        try {
            const kiemtra_id = await adminModel.kiemtraid(userId);
            if (!kiemtra_id) {
                return res.json({
                    ThanhCong: false,
                    message: 'Người dùng không tồn tại!'
                });
            }
            const user = await adminModel.LayTT_ID(userId);
            return res.json({
                ThanhCong: true,
                DuLieu: user
            });

        } catch (error) {
            console.error('Lỗi trong quá trình kiểm tra đăng nhập:', error);
            return res.json({
                ThanhCong: false,
                message: 'Token không hợp lệ!'
            });
        }
    }
     static async DangXuat(req, res) {
         const userId = req.user.id;
         const trangthai = parseInt(req.query.TrangThai);
        if (!userId) {
            return res.json({
                ThanhCong: false,
                message: 'Bạn chưa đăng nhập!'
            });
        }
        try {
            const kiemtra_id = await adminModel.kiemtraid(userId);
            if (!kiemtra_id) {
                return res.json({
                    ThanhCong: false,
                    message: 'Người dùng không tồn tại!'
                });
            }
            if(trangthai === 1){
                res.clearCookie('token_admin', {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
            }else{
                res.clearCookie('token_nguoidung', {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
            }
        } catch (error) {
            console.error('Lỗi trong quá trình kiểm tra đăng nhập:', error);
            return res.json({
                ThanhCong: false,
                message: 'Token không hợp lệ!'
            });
        }
          return res.json({
                    ThanhCong: true,
                    message: 'Bạn đã đăng xuất thành công!'
                });
            }
    static async ChinhSuaAnhNguoiDung(req, res) {
        const userId = req.user.id;
        const files = req.files;
        if (!userId) {
            return res.json({
                ThanhCong: false,
                message: 'Bạn chưa đăng nhập!'
            });
        }
        try {
            const kiemtra_id = await adminModel.kiemtraid(userId);
            if (!kiemtra_id) {
                return res.json({
                    ThanhCong: false,
                    message: 'Người dùng không tồn tại!'
                });
            }
            const layAnhCu = await adminModel.LayTT_ID(userId);
            if (!layAnhCu) {
                return res.json({
                    ThanhCong: false,
                    message: 'Không tìm thấy ảnh đại diện người dùng!'
                });
            }
            await xoaFileCu(layAnhCu.AVATAR);
            let pathFile = files[0].filename;
            let DuongDan = 'uploads/AnhDaiDien/' + pathFile;
            if (!pathFile) {
                return res.json({
                    ThanhCong: false,
                    message: 'Lỗi tải ảnh!'
                })
            };
            const ketqua = await adminModel.ChinhSuaAnhNguoiDung(DuongDan, userId);
            if (ketqua) {
                return res.json({
                    ThanhCong: true,
                    message: 'Cập nhật ảnh đại diện thành công!'
                });
            } else {
                return res.json({
                    ThanhCong: false,
                    message: 'Cập nhật ảnh đại diện thất bại, vui lòng thử lại sau!'
                });
            }
        } catch (error) {
            console.error('Lỗi trong quá trình cập nhật ảnh đại diện:', error);
            return res.json({
                ThanhCong: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    }
    static async ChinhSuaTen_NguoiDung(req, res) {
        const userId = req.user.id;
        const { Ten } = req.body;
        if (!userId) {
            return res.json({
                ThanhCong: false,
                message: 'Bạn chưa đăng nhập!'
            });
        }
        try {
            const kiemtra_id = await adminModel.kiemtraid(userId);
            if (!kiemtra_id) {
                return res.json({
                    ThanhCong: false,
                    message: 'Người dùng không tồn tại!'
                });
            }
            const ketqua = await adminModel.ChinhSuaTen_NguoiDung(Ten, userId);
            if (ketqua) {
                return res.json({
                    ThanhCong: true,
                    message: 'Cập nhật tên người dùng thành công!'
                });
            } else {
                return res.json({
                    ThanhCong: false,
                    message: 'Cập nhật tên người dùng thất bại, vui lòng thử lại sau!'
                });
            }
        } catch (error) {
            console.error('Lỗi trong quá trình cập nhật tên người dùng:', error);
            return res.json({
                ThanhCong: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    }
    static async ChinhSuaEmailNguoiDung(req,res){
         const userId = req.user.id;
        try {
            const DuLieu = req.body;
              await Promise.all([
                 body('Email')
                    .notEmpty()
                    .withMessage('Email không được bỏ trống!')
                    .isEmail()
                    .withMessage('Email không hợp lệ!')
                    .isLength({ max: 255 })
                    .withMessage('Vượt quá kí tự quy định!')
                    .run(req),
                body('Otp')
                    .notEmpty()
                    .withMessage('mã otp không được bỏ trống!')
                    .isLength({ max: 6 })
                    .withMessage('Vượt quá kí tự quy định!')
                    .custom(async (value) => {
                        const email = req.body.Email;
                        const kiemtra = await XacThucModel.kiemtra_email(email);
                        if(!kiemtra){
                            throw new Error('Không tồn tại mã otp trên hệ thống!');
                        }
                        const maotp = kiemtra.MA_OTP;
                        if(maotp!==value){
                            const solansai = parseInt(kiemtra.SO_LAN_SAI);
                            if(solansai>=5){
                                const huyotp = await XacThucModel.Huy_otp(email);
                                if(!huyotp){
                                    throw new Error('Lỗi hệ thống!');
                                }
                            }
                            const tang = await XacThucModel.Tang_sai(email);
                            if(!tang){
                                 throw new Error('Lỗi hệ thống, Vui long thực hiện sau!');
                            }
                             throw new Error('Mã otp sai, Vui lòng nhập lại!');
                        }
                    })
              ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                Validate: true,                
                errors: errors.array() 
            });
        }
        const update = await adminModel.update_email(DuLieu.Email,userId);
        if(!update){
            return res.json({
                ThanhCong:false,
                message:'Lỗi hệ thống, Vui lòng thu8wr lại sau'
            })
        }
        return res.json({
            ThanhCong:true,
            message:'Cập nhật email thành công!'
        })
        } catch (error) {
            console.error('Lỗi trong quá trình cập nhật email người dùng:', error);
            return res.json({
                ThanhCong: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    }
    static async ChinhSuaSdtNguoiDung(req,res){
        
    }

    // chưa kiểm tra bên dưới
    static async ThongTin_NguoiDung(req,res){
        const token = req.cookies.token_nguoidung;
        if (!token) {
            return res.json({
                ThanhCong: false,
                message: 'Bạn chưa đăng nhập!'
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            const user = await adminModel.LayTT_ID(userId);
            if(user){
                const { MATKHAU, ...KetQua } = user;
                return res.json({
                    ThanhCong: true,
                    DuLieu: KetQua
                });
            }else{
                return res.json({
                    ThanhCong: false,
                    message: 'Không tìm thấy thông tin người dùng!'
                });
            }
        } catch (error) {
            return res.json({
                ThanhCong: false,
                message: 'Token không hợp lệ!'
            });
        }
    }
            static async kiemtra(req, res) {
                 const adminId = req.user.id;
                 if(adminId){
                    return res.json({
                        ThanhCong:true,
                    })
                 }else{
                    return res.json({
                        Status:true
                    })
                 }
             }
             static async GetTTusers(req,res){
                 const adminId = req.user.id;
                 if(!adminId){
                    res.json({
                        Status:true,
                        message:'Lỗi lấy thông tin người dùng, vui lòng thử lại sau!'
                    })
                 };
                 const ketqqua = await adminModel.LayTT_ID(adminId);
                 if(ketqqua){
                   return res.json({
                        ThanhCong:true,
                        DuLieu:ketqqua
                    })
                 }else{
                    return res.json({
                        Status:true,
                        message:'Dữ liệu bị lỗi, vui lòng thử lại sau!'
                    })
                 }
             }
            
            static async CapNhatTen(req,res){
                 const { Ten } = req.body;
                 if (!Ten) {
                    return res.json({ 
                        Status:true, 
                        message: 'Vui lòng kiểm tra lại dữ liệu!' 
                    });
                } 
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.json({
                        validation: true,
                        errors: errors.array() 
                    });
                }
                
            }
  
            static async DiaChi_NguoiDung(req,res){
                const IDND = req.query.IDND;
                if(!IDND){
                    return res.json({
                        ThanhCong: false,
                        message: 'Vui lòng kiểm tra lại dữ liệu!'
                    });
                }
                const kiemtra = await adminModel.LayTT_ID(IDND);
                if(!kiemtra){
                    return res.json({
                        ThanhCong: false,
                        message: 'Không tìm thấy thông tin người dùng!'
                    });
                }
                try {
                    const ketqua = await adminModel.LayDiaChiMacDinh(IDND);
                    if(ketqua.ThanhCong){
                        return res.json({
                            ThanhCong: true,
                            DuLieu: ketqua.DuLieu
                        });
                    }else{
                        return res.json({
                            ThanhCong: false,
                            message: ketqua.message
                        });
                    }
                } catch (error) {
                    return res.json({
                        ThanhCong: false,
                        message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
                    });
                }
            }
            static async ChinhSuaDiaChi_NguoiDung(req,res){
                const { DiaChi, IDND } = req.body;
                Promise.all([
                    body('DiaChi')
                        .notEmpty()
                        .withMessage('Địa chỉ không được bỏ trống!')
                        .isLength({ max: 255 })
                        .withMessage('Địa chỉ vượt quá ký tự cho phép!')
                        .run(req),
                    body('IDND')
                        .notEmpty()
                        .withMessage('ID người dùng không được bỏ trống!')
                        .isLength({ max: 255 })
                        .withMessage('ID người dùng vượt quá ký tự cho phép!')
                        .run(req)
                ]).then(() => {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.json({
                            validation: true,
                            errors: errors.array() 
                        });
                    }
                }).catch(err => {
                    console.error('Lỗi trong quá trình xác thực:', err);
                    return res.json({
                        ThanhCong: false,
                        message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                    });
                }
                );
                if (!DiaChi || !IDND) {
                    return res.json({ 
                        ThanhCong: false, 
                        message: 'Vui lòng kiểm tra lại dữ liệu!' 
                    });
                }
                const kiemtra = await adminModel.LayTT_ID(IDND);
                if(!kiemtra){
                    return res.json({
                        ThanhCong: false,
                        message: 'Không tìm thấy thông tin người dùng!'
                    });
                }
                try {
                    const ketqua = await adminModel.ChinhSuaDiaChi_NguoiDung(DiaChi, IDND);
                    if(ketqua){
                        return res.json({
                            ThanhCong: true,
                            message: 'Cập nhật địa chỉ thành công!'
                        });
                    }else{
                        return res.json({
                            ThanhCong: false,
                            message: 'Cập nhật địa chỉ thất bại, vui lòng thử lại sau!'
                        });
                    }
                } catch (error) {
                    return res.json({
                        ThanhCong: false,
                        message: 'Có lỗi xảy ra, vui lòng thử lại sau!'
                    });
                }
            }
}