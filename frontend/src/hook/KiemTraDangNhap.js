import * as API from '../JS/API/API';
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
  
}

