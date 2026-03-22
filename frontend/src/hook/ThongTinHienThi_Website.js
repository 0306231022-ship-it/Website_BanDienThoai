import * as API from '../JS/API/API';
export async function website() {
    try {
          const ketqqua=await API.CallAPI(undefined,{url:'/admin/ThongTinWebsite' , PhuongThuc:1});
          if(ketqqua.ThanhCong){
            return ketqqua.DuLieu;
           }else{
            return null;
           }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin website:', error);
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