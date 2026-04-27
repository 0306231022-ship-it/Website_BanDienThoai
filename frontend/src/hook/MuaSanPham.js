import { useState } from "react";
import * as API from '../JS/API/API';
import { KiemTra, LayThongTinNguoiDung } from './KiemTraDangNhap';
import { useThongTinDonHang } from '../REDUCER/QuanLiThongTinDatDon';
function MuaSanPham(){
    const [ThongTinNguoiDung, setThongTinNguoiDung] = useState({});
    const { ThongTinDatDon, setThongTinDatDon } = useThongTinDonHang();
    const [SanPham, setSanPham] = useState([]);
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
    return {layDiaChi, layDonHang_GioHang , SanPham , setSanPham }
    
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

           
           