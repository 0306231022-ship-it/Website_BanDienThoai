import { randomUUID, randomBytes } from 'crypto';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import NodeGeocoder from 'node-geocoder';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
const options = {
  provider: 'openstreetmap',
};

const geocoder = NodeGeocoder(options);

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.IDND },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    }
export const TaoID = (bien) => {
  const prefix = bien.toString().slice(0, 2).toUpperCase();
  const timePart = Date.now().toString(36).toUpperCase().slice(-4); // lấy 4 ký tự cuối
  const randomPart = randomBytes(4).toString('hex').toUpperCase().slice(0,2); // lấy 4 ký tự đầu
  return `${prefix}-${timePart}-${randomPart}`; // tổng cộng ~ 10 ký tự
};


export function mapFilesByProduct(files) {
    if (!Array.isArray(files)) return [];

    const result = [];
   
    const INDEX_REGEX = /HinhAnh\[(\d+)\]/;

    for (const file of files) {
        // Kiểm tra file và fieldname tồn tại để tránh crash
        if (!file?.fieldname) continue;

        const match = file.fieldname.match(INDEX_REGEX);
        if (!match) continue;

        const index = parseInt(match[1], 10);

        if (!result[index]) {
            result[index] = [];
        }
        result[index].push(file);
    }

    // Tùy chọn: Loại bỏ các khoảng trống (empty items) nếu bạn muốn kết quả liên tục
    return result.filter(item => item !== undefined);
}
export function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Bán kính Trái đất (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; 
    return distance * 1.2;
}
export function tinhPhiShip(soKm) {
    const GIA_MO_CUA = 15000; 
    const GIA_MOI_KM_TIEP_THEO = 5000;
    const KHOANG_CACH_TOI_THIEU = 2;
    let tongPhi = 0;
    if (soKm <= KHOANG_CACH_TOI_THIEU) {
        tongPhi = GIA_MO_CUA;
    } else {
        const kmDuRa = soKm - KHOANG_CACH_TOI_THIEU;
        tongPhi = GIA_MO_CUA + (kmDuRa * GIA_MOI_KM_TIEP_THEO);
    }
    return Math.round(tongPhi / 1000) * 1000; 
}

export async function getCoordinates(address) {
  if (!address) return null;

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "WebsiteBanDienThoai/1.0 (your-email@gmail.com)"
    }
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return null;
  }
  if (!data || data.length === 0) return null;

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}
export const xoaFileCu = (duongDanTuDatabase) => {
    if (!duongDanTuDatabase) return false;

    const duongDanTuyetDoi = path.resolve(duongDanTuDatabase);
    console.log(duongDanTuyetDoi)

  
    if (fs.existsSync(duongDanTuyetDoi)) {
        try {
            // 2. Tiến hành xóa đồng bộ
            fs.unlinkSync(duongDanTuyetDoi);
            console.log(`🗑️ Đã xóa file thành công: ${duongDanTuDatabase}`);
            return true; // Trả về true nếu xóa thành công thành công
        } catch (err) {
            console.error(`❌ Lỗi khi xóa file: ${err.message}`);
            return false; // Trả về false nếu có lỗi hệ thống (ví dụ file bị khóa)
        }
    } else {
        console.log(`⚠️ File không tồn tại trên ổ cứng: ${duongDanTuDatabase}`);
        return false; // Trả về false vì không có file để xóa
    }
};
// ==================== CẤU HÌNH ĐỒNG BỘ TẠI ĐÂY ====================
const EMAIL_HE_THONG = 'dc01.nnh.2048ae@gmail.com'; 
const MAT_KHAU_UNG_DUNG = 'rusn pjlj rwhp xunn';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_HE_THONG, // Đăng nhập bằng Gmail cá nhân
    pass: MAT_KHAU_UNG_DUNG 
  }
});

export const taoMaOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const guiEmailOTP = async (emailNguoiNhan, maOTP) => {
  const mailOptions = {
    // Đảm bảo phần email trong dấu <> khớp 100% với user đăng nhập ở trên
    from: `"Hệ Thống Xác Thực" <${EMAIL_HE_THONG}>`,
    to: emailNguoiNhan,                                     
    subject: 'Mã xác thực OTP của bạn',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
        <h2 style="color: #333333; text-align: center;">MÃ XÁC THỰC (OTP)</h2>
        <p style="color: #666666; font-size: 16px;">Chào bạn,</p>
        <p style="color: #666666; font-size: 16px;">Đây là mã OTP của bạn để xác thực tài khoản. Mã này có hiệu lực trong vòng <b>5 phút</b>:</p>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #007bff;">${maOTP}</span>
        </div>
        <p style="color: #999999; font-size: 13px; text-align: center; margin-top: 30px;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { 
      ThanhCong: true, 
      messageId: info.messageId 
    };

  } catch (error) {
    console.error("Gửi mail thất bại lỗi là:", error.message);
    return { ThanhCong: false, error: error.message };
  }
};
