import * as API from '../JS/API/API';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';

export default function useQuanLiDangNhap() {
    async function DangXuat(trangthai) {
        const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc muốn đăng xuất không?');
        if (!XacNhan) return false;
        
        try {
            const ketqua = await API.CallAPI(undefined, { 
                url: `/NguoiDung/dangxuat_nguoidung?TrangThai=${trangthai}`, 
                PhuongThuc: 1 
            });
            
            if (ketqua.ThanhCong) {
                ThongBao.ThongBao_ThanhCong(ketqua.message);
                return true; // Trả về true để component biết đường chuyển hướng
            } else {
                ThongBao.ThongBao_Loi(ketqua.message);
                return false;
            }
        } catch (error) {
            console.error('Lỗi khi gọi API đăng xuất:', error);
            ThongBao.ThongBao_Loi('Đã xảy ra lỗi khi đăng xuất!');
            return false;
        }
    }

    return { DangXuat };
}