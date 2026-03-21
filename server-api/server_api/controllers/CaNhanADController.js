import pkg from 'bcrypt';
const { hash, compare } = pkg;
import adminModel from '../models/adminModel.js';
import { generateToken } from '../function.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
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
                    .withMessage('Vượt quá kí tự quy định!')
                    .run(req),
                body('password')
                    .notEmpty()
                    .withMessage('Mật khẩu không được bỏ trống!')
                    .isLength({ max: 225 })
                    .withMessage('Mật khẩu vượt quá ký tự cho phép!')
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
                            // kiểm tra loaind
                            if(DangNhap.LOAIND === 1){
                                return res.json({
                                    ThanhCong: false,
                                    message:'Bạn không có quyền truy cập vào trang này!'
                                })
                            }

                            const token =  generateToken(DangNhap);
                                const id = DangNhap.IDND;
                                res.cookie('token_nguoidung', token, {
                                    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
                                    httpOnly: true,             // chống XSS
                                    secure: false,              // true nếu dùng https
                                    sameSite: 'lax',
                                    path: '/'
                                });
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
        // kiểm tra cookie có tồn tại hay không
        const token = req.cookies.token_nguoidung;
        if (!token) {
            return res.json({
                ThanhCong: false,
                message: 'Bạn chưa đăng nhập!'
            });
        }
        // nếu có thì giải mã token để lấy thông tin người dùng
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            const user = await adminModel.LayTT_ID(userId);
            return res.json({
                ThanhCong: true,
            });

        } catch (error) {
            console.error('Lỗi trong quá trình kiểm tra đăng nhập:', error);
            return res.json({
                ThanhCong: false,
                message: 'Token không hợp lệ!'
            });
        }
    }
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

    static async DangNhap(req, res) {
         await body('email')
            .notEmpty()
            .withMessage('Email không được bỏ trống!')
            .isEmail()
            .withMessage('Email không hợp lệ!')
            .isLength({ max: 255 })
            .withMessage('Vượt quá kí tự quy định!')
            .run(req);
        await body('passWord')
            .notEmpty()
            .withMessage('Mật khẩu không được bỏ trống!')
            .isLength({ max: 255 })
            .withMessage('Mật khẩu vượt quá ký tự cho phép!')
            .run(req);
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
                    Status:true, 
                    message: 'Vui lòng kiểm tra lại dữ liệu!' 
                });
            } 
            try {
                 const DangNhap = await adminModel.login(dulieu.email);
                 if(!DangNhap){
                    return res.json({
                        Status:true,
                        message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                    })
                 }
                 if(DangNhap){
                     const isMatch = await compare(dulieu.passWord, DangNhap.MATKHAU);
                      if (isMatch) {
                        if (DangNhap.TRANGTHAI !== 1) {
                            return res.json({
                                Status:true,
                                message:'Tài khoản đã ngùng hoạt động!'
                            })
                        };
                         const token = await generateToken(DangNhap);
                         const id = DangNhap.IDND;
                         res.cookie('token', token, {
                             maxAge: 24 * 60 * 60 * 1000, // 1 ngày
                             httpOnly: true,             // chống XSS
                             secure: false,              // true nếu dùng https
                            sameSite: 'lax'
                        });
                        const { MATKHAU, ...KetQua } = DangNhap;
                        return res.json({
                             ThanhCong: true,
                             message: 'Bạn đã đăng nhập thành công!',
                             DuLieu: KetQua
                        });
                      }else{
                        return res.json({
                            Status:true,
                            message:'Email hoặc hoặc mật khẩu sai!'
                        })
                      }
                 }
            } catch (error) {
                console.error("Lỗi trong quá trình đăng nhập:", error);
                return res.json({
                    Status: true,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
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
             static async DangXuat(req, res) {
                res.clearCookie('token', {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
                return res.json({
                    ThanhCong: true,
                    message: 'Bạn đã đăng xuất thành công!'
                });
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
            static async DangXuat_NguoiDung(req, res) {
                res.clearCookie('token_nguoidung', {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
                return res.json({
                    ThanhCong: true,
                    message: 'Bạn đã đăng xuất thành công!'
                });
            }
}