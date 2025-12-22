import pkg from 'bcrypt';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import CaiDatModel from '../models/CaiDatWebsite.js';
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class adminController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.IDND},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
    static async DangNhap(req, res) {
        const dulieu = req.body;
         if (!dulieu) {
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
        try {
             const DangNhap = await adminModel.login(dulieu.email);
             //xử lí mã lỗi không truy vấn được
             if(DangNhap===false){
                return res.json({
                    Status:true,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                })
             }
             //Xử lí tình huống không tồn tại người dùng
             if(DangNhap===null){
                return res.json({
                    Status:true,
                    message:'Tài khoản người dùng không tồn tại!'
                })
             }
             //Xử lí tình huống đã có tài khoản trong hệ thống
             if(DangNhap){
                //Xử lí tình huống sai mật khẩu
                 const isMatch = await compare(dulieu.passWord, DangNhap.MATKHAU);
                 //xử lí trường hợp mật khẩu đúng
                  if (isMatch) {
                    //xử lí sự tồn tại của hệ thống
                    if (DangNhap.TRANGTHAI !== 1) {
                        return res.json({
                            Status:true,
                            message:'Tài khoản đã ngùng hoạt động!'
                        })
                    };
                     const token = await adminController.generateToken(DangNhap);
                     const { MATKHAU, ...KetQua } = DangNhap;
                    return res.json({
                         ThanhCong: true,
                         message: 'Bạn đã đăng nhập thành công!',
                         token: token,
                         DuLieu: KetQua
                    });
                  }else{
                    //xử lí trường hợp mật khẩu sai
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
        const CaiDat= CaiDatModel.updateTen(Ten);
        if(CaiDat===1){
            return res.json({
                Status: true,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
            })
        };
        if(CaiDat){
            return res.json({
                 ThanhCong:true,
                 message:'Cập nhật tên website thành công!'
            })
        };
        if(!CaiDat){
            return res.json({
                ThatBai:true,
                message:'Cập nhật tên website thất bại!'
            })
        };
    }
    static async ChinhSuaLoGo(req,res){
        const files = req.files;
        const pathFile = files[0].path.replace(/\\/g, '/');
        if(!pathFile){
            return res.json({
                Status:true,
                message:'Lỗi tải ảnh!'
            })
        };
         const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                validation: true,
                errors: errors.array() 
            });
        }
        const ketqua= CaiDatModel.updateHinhAnh(pathFile);
        if(ketqua===1){
            return res.json({
                Status : true,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
            })
        };
        if(ketqua){
            return res.json({
                ThanhCong:true,
                message:'Cập nhật thành công!'
            })
        };
        if(!ketqua){
            return res.json({
                Status:true,
                message:'Cập nhật thất bại!'
            })
        };
    }
    static async CapNhatMoTa(req,res){
         const { MoTa } = req.body;
         if (!MoTa) {
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
         const CaiDat= CaiDatModel.updateMoTa(MoTa);
        if(CaiDat===1){
            return res.json({
                Status: true,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
            })
        };
        if(CaiDat){
            return res.json({
                 ThanhCong:true,
                 message:'Cập nhật mô tả website thành công!'
            })
        };
        if(!CaiDat){
            return res.json({
                ThatBai:true,
                message:'Cập nhật mô tả website thất bại!'
            })
        };

    }
    static async CapNhatLinkFaceBook(req,res){
          const { FacebookUrl } = req.body;
         if (!FacebookUrl) {
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
         const CaiDat= CaiDatModel.updateLinkFaceBook(FacebookUrl);
        if(CaiDat===1){
            return res.json({
                Status: true,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
            })
        };
        if(CaiDat){
            return res.json({
                 ThanhCong:true,
                 message:'Cập nhật link FaceBook thành công!'
            })
        };
        if(!CaiDat){
            return res.json({
                ThatBai:true,
                message:'Cập nhật link FaceBook thất bại!'
            })
        };

    }
    static async  CapNhatIns(req,res){
          const { InstagramUrl } = req.body;
         if (!InstagramUrl) {
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
         const CaiDat= CaiDatModel.updateLinkIns(InstagramUrl);
        if(CaiDat===1){
            return res.json({
                Status: true,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
            })
        };
        if(CaiDat){
            return res.json({
                 ThanhCong:true,
                 message:'Cập nhật link Instagram thành công!'
            })
        };
        if(!CaiDat){
            return res.json({
                ThatBai:true,
                message:'Cập nhật link Instagram thất bại!'
            })
        };

    }
    static async CapNhatDiaChi(req, res) {
    try {
        const { DiaChi } = req.body;
        const result = await CaiDatModel.updateDiaChi(DiaChi);
        if (result) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật địa chỉ mới thành công!'
            });
        }
        
        return res.json({
            ThatBai: true,
            message: 'Không có thay đổi nào được thực hiện.'
        });

    } catch (error) {
        return res.json({
            Status: true,
            message: 'Lỗi máy chủ, vui lòng thử lại sau!'
        });
    }
}
   static async CapNhatEmail(req, res) {
    try {
        const { Email } = req.body;
        const result = await CaiDatModel.updateEmail(Email);

        if (result) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật Email hệ thống thành công!'
            });
        }
        
        return res.json({
            ThatBai: true,
            message: 'Email mới trùng với Email cũ hoặc cập nhật thất bại.'
        });

    } catch (error) {
        return res.json({
            Status: true,
            message: 'Lỗi máy chủ khi cập nhật Email!'
        });
    }
}
    static async CapNhatSoDienThoai(req, res) {
    try {
        const { SoDienThoai } = req.body;
        const result = await CaiDatModel.updateSoDienThoai(SoDienThoai);

        if (result) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật số điện thoại thành công!'
            });
        }
        
        return res.json({
            ThatBai: true,
            message: 'Số điện thoại này đã tồn tại hoặc cập nhật thất bại.'
        });

    } catch (error) {
        return res.json({
            Status: true,
            message: 'Lỗi máy chủ khi cập nhật Hotline!'
        });
    }
}

    //bên dưới chưa sửa
    static async kiemtra(req, res) {
         const adminId = req.user.id;
         const TruyVan=adminModel.LayTT_ID(adminId);
         if(TruyVan){
            res.json({
                ThanhCong:true,
                message:'Bạn đã đăng nhập!',
                DuLieu:TruyVan
            })
         }else{
            res.json({
                ThanhCong:false,
                message:'Lỗi.....'
            })
         }
     }
    static async DangXuat(req,res){
         const token = req.user.token;
         const decode = jwt.decode(token);
         const exp= decode && decode.exp ? new Date(decode.exp*1000):null;
         if(!exp){
            return res.status(400).json({
                success : false,
                message : 'Invalid token'
            });
        }
        const result = await adminModel.removeToken(token, exp);
        if(result){
            return res.json({
                ThanhCong:true,
                message:'Bạn đã đăng xuát thành công!'
            })
        }else{
            return res.json({
                ThanhCong:false,
                message:'Bạn đã đăng xuất thất bại. Vui lòng kiểm tra lại hệ thống!'
            })
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