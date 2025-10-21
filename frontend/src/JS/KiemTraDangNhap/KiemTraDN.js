import { useEffect,  useNavigate } from "react";
import * as API from '../API/API'
function KiemTraDangNhap(){
    const navigate = useNavigate();
    return(
        useEffect((e)=>{
            const kiemtra= async()=>{
                const yeucau={
                    NhiemVu:'KiemTraNguoiDung',
                    DiaChi:1
                };
                const KiemTra = await API.CallAPI(undefined,yeucau);
                if(KiemTra.ThanhCong){
                    navigate('/')
                }
            }
            kiemtra();
        },[])
    );
};
export default KiemTraDangNhap;