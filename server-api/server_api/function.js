import crypto from 'crypto';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';


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
    const prefix = bien.toString().slice(0, 2);
    const timePart = Date.now().toString().slice(-4);
    const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
    return `${prefix}-${timePart}-${randomPart}`;
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
function tinhPhiShip(soKm) {
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

// Sử dụng
const km = 5.4; 
const phiGiaoHang = tinhPhiShip(km); 
// Kết quả: 15.000 + (3.4 * 5.000) = 32.000đ