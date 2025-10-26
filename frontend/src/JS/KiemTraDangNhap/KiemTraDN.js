import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as API from '../API/API';
import * as fun from '../FUNCTONS/ThongBao';
function KiemTraDangNhap(){
    const navigate = useNavigate();
    return(
        useEffect((e)=>{
            const kiemtra= async()=>{
                const yeucau={
                    NhiemVu:"KiemTraDangNhap_AD",
                    DiaChi:1
                };
                const KiemTra = await API.CallAPI(undefined,yeucau);
                if(KiemTra.ThanhCong){
                    fun.ThongBao_ThanhCong(KiemTra.TinNhan)
                    navigate('/Admin')
                }else{
                    navigate('/DangNhapAD');
                }
            }
            kiemtra();
        })
    );
};
export default KiemTraDangNhap;