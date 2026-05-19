import { useState } from "react";
import * as API from '../JS/API/API';
import * as fun from '../JS/FUNCTONS/function';
import { KiemTra, LayThongTinNguoiDung } from './KiemTraDangNhap';
import { useThongTinDonHang } from '../REDUCER/QuanLiThongTinDatDon';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';
import { useModalContext } from "../CONTEXT/QuanLiModal";
function MuaSanPham(){
    const [ThongTinNguoiDung, setThongTinNguoiDung] = useState({});
    const { setThongTinKhachHang , setIDDH , setThongTinSanPham , ThongTinDatDon } = useThongTinDonHang();
    const { CloseAllModals } = useModalContext();
    const [dsMaGiamGia, setDSMaGiamGia] = useState([]);
    const layDiaChi= async () => {
        try {
            const isLoggedIn = await KiemTra();
            if(isLoggedIn){
                const thongTinNguoiDung = await LayThongTinNguoiDung();
                setThongTinNguoiDung(thongTinNguoiDung);
                const DiaChiNguoiDung= await API.CallAPI(undefined, { url: `/NguoiDung/LayDiaChi?IDND=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 });
                if (!ThongTinDatDon.ThongTin_KhachHang.DiaChi_GiaoHang) {
                    setThongTinKhachHang(thongTinNguoiDung.HOTEN, thongTinNguoiDung.SDT, DiaChiNguoiDung.ThanhCong ? DiaChiNguoiDung.DuLieu[0].DIACHI : null);
                }
            }
        } catch (error) {
            console.error("Error fetching user address:", error);
        }
    }
  
    const layDonHang_GioHang = async () => {
        try {
            const isLoggedIn = await KiemTra();
            if (isLoggedIn) {
                const thongTinNguoiDung = await LayThongTinNguoiDung();
                setThongTinNguoiDung(thongTinNguoiDung);
                const response = await API.CallAPI(undefined, { url: `/NguoiDung/giohang?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 });
                response.ThanhCong ? setThongTinSanPham(response.dulieu) : setThongTinSanPham([]);
            }   
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }
    const DonHang_MuaNgay = async (DuLieu) => {
         setThongTinSanPham(DuLieu.dulieu);
    }

    const HuyDonHang_Tam = async()=>{
        try {
             const formData = fun.objectToFormData({ IDDH: ThongTinDatDon?.IDDH , IDND: ThongTinNguoiDung.IDND });
             const ketqua = await API.CallAPI(formData, { url: `/NguoiDung/HuyDonTam_NguoiDung`, PhuongThuc: 1 });
            if(ketqua.ThanhCong){
                setIDDH(null);
                setThongTinSanPham([]);
                setDSMaGiamGia([]);
                CloseAllModals();
                ThongBao.ThongBao_ThongTin('Thông tin đơn hàng đã hủy!');
            }else{
                ThongBao.ThongBao_Loi(ketqua.message);
            }
        } catch (error) {
            console.error('lỗ sãy ra:', error);
        }
    }
    const LayMaGiamGia_gioHang = async()=>{
        try {
            const isLoggedIn = await KiemTra();
            if (isLoggedIn) {
                const thongTinNguoiDung = await LayThongTinNguoiDung();
                setThongTinNguoiDung(thongTinNguoiDung);
                const response = await API.CallAPI(undefined, { url: `/NguoiDung/LayMaGiamGia?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 });
                if(response.ThanhCong){
                    setDSMaGiamGia(response.dulieu);
                }else{
                    setDSMaGiamGia([]);
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy mã giảm giá:', error);
        }
    }
    

    return {layDiaChi, layDonHang_GioHang , DonHang_MuaNgay , HuyDonHang_Tam, LayMaGiamGia_gioHang ,dsMaGiamGia}; 
    
    // load đơn hàng
    /*const LoadDH= async()=>{
        try {
           
           
                
              
            }
             case 1 :
                            const [response2, response4 , MaGiamGia_ApDung ,MaGiamGia] = await Promise.all([
                                
                                API.CallAPI(undefined,{ url :`/NguoiDung/ThongTinDonHang?idnd=${thongTinNguoiDung.IDND}` ,PhuongThuc:2} ),
                                API.CallAPI(undefined,{url:`/NguoiDung/ApMaGiamGia_NguoiDung?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc:2}),
                            ]);
                          
                            response4.ThanhCong ? setThongTin(response4.dulieu[0]) : ThongBao.ThongBao_Loi(response4.message);
                            MaGiamGia_ApDung.ThanhCong ? setMGG_NguoiDung(MaGiamGia_ApDung.dulieu) : setMGG_NguoiDung([]);
                            MaGiamGia.ThanhCong ? setMGG(MaGiamGia.dulieu) : setMGG([]);
                            break;

        } catch (error) {
            
        }
    }*/
 
    
};
export default MuaSanPham;

           
           