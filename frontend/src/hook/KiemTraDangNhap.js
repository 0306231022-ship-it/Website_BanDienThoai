import * as API from '../JS/API/API';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';
export async function KiemTra() {
  try {
    const kiemtra = await API.CallAPI(undefined, { url: '/NguoiDung/kiemtra', PhuongThuc: 1 });
    return kiemtra.ThanhCong ? true : false;
  } catch (error) {
    console.error('Lỗi khi gọi API kiểm tra:', error);
    return false;
  }
}
export async function LayThongTinNguoiDung() {
  try {
    const isLoggedIn = await KiemTra();
    if (!isLoggedIn) return null;
    const thongtin = await API.CallAPI(undefined, { url: '/NguoiDung/ThongTin', PhuongThuc: 2 });
    if (thongtin?.ThanhCong) {
        return thongtin.DuLieu;
    }
    return null;
  } catch (error) {
    console.error('Lỗi khi gọi API lấy thông tin người dùng:', error);
    return null;
  }
}
export async function DangXuat() {
    const kiemtra_DangNhap = await KiemTra();
    if (!kiemtra_DangNhap) {
        ThongBao.ThongBao_Loi('Bạn chưa đăng nhập!');
        return;
    }
    const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc muốn đăng xuất không?');
    if (!XacNhan) return;
    try {
      const ketqua = await API.CallAPI(undefined, { url: '/NguoiDung/dangxuat_nguoidung', PhuongThuc: 1 });
      if (ketqua.ThanhCong) {
        ThongBao.ThongBao_ThanhCong(ketqua.message);
        window.location.reload();
      } else {
        ThongBao.ThongBao_Loi(ketqua.message);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API đăng xuất:', error);
      ThongBao.ThongBao_Loi('Đã xảy ra lỗi khi đăng xuất!');
    }
}

