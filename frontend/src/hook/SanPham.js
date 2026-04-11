 import * as ThongBao1 from '../JS/FUNCTONS/ThongBao';
import * as API from '../JS/API/API';
import * as fun from '../JS/FUNCTONS/function';
import { KiemTra, LayThongTinNguoiDung } from './KiemTraDangNhap';
import { useModalContext } from "../CONTEXT/QuanLiModal";

 export const useAddToCart = () => {
    const { OpenMoDal } = useModalContext();
    const handleAddToCart = async (productId, DonGia , quantity) => {
         if (!productId){
            ThongBao1.ThongBao_CanhBao("Không tìm thấy sản phẩm.");
            return;
         } 
        const isLoggedIn = await KiemTra();
        if (!isLoggedIn) {
            OpenMoDal(null, { TenTrang: 'ThongBao', TieuDe: 'Hộp thông tin' });
            return;
        }
        if(isLoggedIn){
            const thongtinND = await LayThongTinNguoiDung();
            const IDND = thongtinND.IDND;
            const formdata = fun.objectToFormData({ IDSANPHAM: productId, SOLUONG: quantity || 1, IDNGUOIDUNG: IDND , GIABAN: DonGia });
            try {
                const response = await API.CallAPI(formdata, { PhuongThuc: 1, url: `/NguoiDung/ThemGioHang` });
                if(response.ThanhCong){
                    ThongBao1.ThongBao_ThanhCong(response.message);
                } else {
                    ThongBao1.ThongBao_Loi(response.message);
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        }
    };
    const updateCartToServer = async (sanPhamRef) => {
        const currentCart = sanPhamRef.current;
        if (currentCart.length === 0) return;
        const cartData = currentCart.map(item => ({
            IDSANPHAM: item.IDSANPHAM, SOLUONG: item.SOLUONG, IDDH: item.IDDH
        }));
        try {
            await API.CallAPI(undefined, {
                url: `/NguoiDung/CapNhat_SoLuong_GioHang?data=${encodeURIComponent(JSON.stringify(cartData))}`,
                PhuongThuc: 2
            });
        } catch (error) { 
            console.error('Lỗi tự động cập nhật:', error); 
        }
    };
    //mua sản phẩm trong giỏ hàng
    const handlebuyproduct = async (sanPhamRef) => {
        await updateCartToServer(sanPhamRef)
        OpenMoDal({TrangThai:1}, { TenTrang: 'ThongTinDonHang', TieuDe: 'Thông tin đơn hàng' });
    }
    const MuaSP= async(DuLieu)=>{
         OpenMoDal(DuLieu, { TenTrang: 'ThongTinDonHang', TieuDe: 'Thông tin đơn hàng' });
    }
    
    return {handleAddToCart , handlebuyproduct , updateCartToServer ,MuaSP};        
}