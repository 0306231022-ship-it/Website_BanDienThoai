import * as API from '../JS/API/API';
export async function website() {
    try {
          const ketqqua=await API.CallAPI(undefined,{url:'/admin/ThongTinWebsite' , PhuongThuc:1});
        return ketqqua;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin website:', error);
        return null;
    }
}
export async function Lay_TTCaNhan(trangthai) {
    try {
         const res = await API.CallAPI(undefined, { url: `/NguoiDung/kiemtra?TrangThai=${trangthai}`, PhuongThuc: 2 });
       return res;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin cá nhân:', error);
        return null;
    }
}

export async function Lay_SoLuong_GioHang(idnd) {
    try {
        const ketqqua = await API.CallAPI(undefined, { url: `/NguoiDung/SoLuong_GioHang?idnd=${idnd}`, PhuongThuc: 2 });
        if (ketqqua.ThanhCong) {
            return ketqqua.dulieu;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy số lượng giỏ hàng:', error);
        return null;
    }
}