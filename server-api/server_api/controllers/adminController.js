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
    static async CapNhatTen(req,res){
        await body('Ten')
            .notEmpty()
            .withMessage('Vui lòng nhập đầy đủ thông tin!')
            .isLength({max:50})
            .withMessage('Vượt quá kí tự cho phép!')
            .run(req);
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
                Status:true, 
                message: 'Vui lòng kiểm tra lại dữ liệu!' 
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
      const hinhAnhDeLuuDB = `${files[0].destination}/${files[0].filename}`.replace(/\\/g, '/');
        if (!files || files.length === 0) {
            return res.json({
                validation: true,
                errors: [{ path: "files", msg: "Vui lòng tải lên ít nhất 1 ảnh" }]
            });
        }
        const errors = [];
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        for (const file of files) {
            if (!allowedTypes.includes(file.mimetype)) {
                errors.push({ 
                    path: "files", 
                    msg: `File ${file.originalname} không đúng định dạng JPG hoặc PNG` 
                });
                break; 
            }
        }
       if (files.length < 1 || files.length > 5) {
            errors.push({ path: "files", msg: "Không được upload quá 5 ảnh" });
        }
        if (errors.length > 0) {
            return res.json({ Validate: true, errors });
        }
        const index = hinhAnhDeLuuDB.indexOf("uploads");
        const relativePath = hinhAnhDeLuuDB.substring(index);
        const ketqua= CaiDatModel.updateHinhAnh(relativePath);
        if(ketqua===1){
            return res.json({
                Status : true,
                message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
            });
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