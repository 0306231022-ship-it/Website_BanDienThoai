import { useState } from "react";
import * as API from '../JS/API/API';
import * as fun from '../JS/FUNCTONS/function';
import { KiemTra, LayThongTinNguoiDung } from './KiemTraDangNhap';
import { useThongTinDonHang } from '../REDUCER/QuanLiThongTinDatDon';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';
import { useModalContext } from "../CONTEXT/QuanLiModal";
function MuaSanPham(){
    const [ThongTinNguoiDung, setThongTinNguoiDung] = useState({});
    const { ThongTinDatDon, setThongTinDatDon } = useThongTinDonHang();
    const [SanPham, setSanPham] = useState([]);
    const [IDDH, setIDDH] = useState(null);
    const { CloseAllModals } = useModalContext();
    const layDiaChi= async () => {
        try {
              const isLoggedIn = await KiemTra();
               if(isLoggedIn){
                    const thongTinNguoiDung = await LayThongTinNguoiDung();
                    setThongTinNguoiDung(thongTinNguoiDung);
                    const DiaChiNguoiDung= await API.CallAPI(undefined, { url: `/NguoiDung/LayDiaChi?IDND=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 });
                    if (!ThongTinDatDon.ThongTin_KhachHang.DiaChi_GiaoHang) {
                        setThongTinDatDon({
                            ThongTin_KhachHang: {
                                HoTen: ThongTinNguoiDung.HOTEN,
                                SDT: ThongTinNguoiDung.SDT,
                                DiaChi_GiaoHang: DiaChiNguoiDung.ThanhCong ? DiaChiNguoiDung.DuLieu[0].DIACHI : null,
                            }
                        });
                    }
               }

        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
        
    }
    const layDonHang_GioHang = async () => {
        try {
            const isLoggedIn = await KiemTra();
            if (isLoggedIn) {
                const thongTinNguoiDung = await LayThongTinNguoiDung();
                setThongTinNguoiDung(thongTinNguoiDung);
                const response = await API.CallAPI(undefined, { url: `/NguoiDung/giohang?idnd=${ThongTinNguoiDung.IDND}`, PhuongThuc: 2 });
                response.ThanhCong ? setSanPham(response.dulieu) : setSanPham([]);
            }   
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }
    const DonHang_MuaNgay = async (DuLieu) => {
         setSanPham(DuLieu.dulieu);
    }
    const ThemDonHang_Tam = async()=>{
       try {
            const formData = fun.objectToFormData({ IDND: ThongTinNguoiDung.IDND, IDSP: SanPham[0].IDSANPHAM, SoLuong: 1 , GiaSanPham: SanPham[0].DONGIA });
            const ketqua = await API.CallAPI(formData, { url: `/NguoiDung/ThemDonHang_Tam`, PhuongThuc: 1 });
           if(ketqua.ThanhCong){
                setIDDH(ketqua.IDDH);
           }else{
                ThongBao.ThongBao_Loi(ketqua.message);
           }
        } catch (error) {
            console.error('lỗ sãy ra:', error);
        }
    }
    const HuyDonHang_Tam = async()=>{
        try {
             const formData = fun.objectToFormData({ IDDH: IDDH , IDND: ThongTinNguoiDung.IDND });
             const ketqua = await API.CallAPI(formData, { url: `/NguoiDung/HuyDonTam_NguoiDung`, PhuongThuc: 1 });
            if(ketqua.ThanhCong){
                setIDDH(null);
                CloseAllModals();
            }else{
                ThongBao.ThongBao_Loi(ketqua.message);
            }
        } catch (error) {
            console.error('lỗ sãy ra:', error);
        }
    }

    return {layDiaChi, layDonHang_GioHang , SanPham , setSanPham , DonHang_MuaNgay , ThemDonHang_Tam, HuyDonHang_Tam}; 
    
    // load đơn hàng
    /*const LoadDH= async()=>{
        try {
           
           
                
              
            }
             case 1 :
                            const [response2, response4 , MaGiamGia_ApDung ,MaGiamGia] = await Promise.all([
                                
                                API.CallAPI(undefined,{ url :`/NguoiDung/ThongTinDonHang?idnd=${thongTinNguoiDung.IDND}` ,PhuongThuc:2} ),
                                API.CallAPI(undefined,{url:`/NguoiDung/ApMaGiamGia_NguoiDung?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc:2}),
                                API.CallAPI(undefined, { url: `/NguoiDung/LayMaGiamGia?idnd=${thongTinNguoiDung.IDND}`, PhuongThuc: 2 }),
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

           
           