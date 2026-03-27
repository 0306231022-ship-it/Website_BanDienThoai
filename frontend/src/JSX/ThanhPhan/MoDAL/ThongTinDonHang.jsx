import React, { useState , useEffect } from 'react';
import  {LayThongTinNguoiDung } from '../../../hook/KiemTraDangNhap';
import * as API from '../../../JS/API/API';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../JS/FUNCTONS/function';

const ThongTinDonHang = () => {
    // 1. State thông tin người nhận
    const [userInputs, setUserInputs] = useState({
        hoTen: '',
        sdt: ''
    });
    const [loading,setloading] = useState(false);
    const [danhSachDiaChi, setDanhSachDiaChi] = useState([]);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState('');
    const [thongtinND, setThongTinND] = useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            setloading(true);
            const thongtin = await LayThongTinNguoiDung();
            setThongTinND(thongtin);
            try {
                const laydl= await API.CallAPI(undefined, { url: `/NguoiDung/LayDiaChi?IDND=${thongtinND.IDND}`, PhuongThuc: 2 });
                if(laydl.ThanhCong && laydl.DuLieu.length > 0){
                     setDanhSachDiaChi(laydl.DuLieu);
                }else{
                    setDanhSachDiaChi([]);
                    setIsAddingNewAddress(true);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            } finally {
                setloading(false);
            }
        };
        fetchUserInfo();
    },[thongtinND?.IDND]);
    const handleConfirmOrder = async() => {
        setloading(true);
        const kiemtra = fun.KiemTraRong(userInputs);
        if(!kiemtra.Status){
            ThongBao.ThongBao_CanhBao("Vui lòng điền đầy đủ thông tin người nhận!");
            return;
         }
        const diaChiCuoi = isAddingNewAddress ? newAddress : danhSachDiaChi.find(a => a.id === selectedAddress)?.DIACHI;
       if(!diaChiCuoi){
            ThongBao.ThongBao_CanhBao("Vui lòng chọn hoặc nhập địa chỉ giao hàng!");
            return;
       };
        const thongTinDonHang = {
            idnd: thongtinND.IDND,
            hoTen: userInputs.hoTen,
            sdt: userInputs.sdt,
            diaChi: diaChiCuoi
        };
        const formData = fun.objectToFormData(thongTinDonHang);
        try {
            const response = await API.CallAPI(formData, { url: '/NguoiDung/MuaHang', PhuongThuc: 1 });
            alert(JSON.stringify(response));
            if(response.ThanhCong){
                ThongBao.ThongBao_ThanhCong("Đơn hàng của bạn đã được xác nhận! Vui lòng chờ nhân viên liên hệ để xác nhận đơn hàng.");
            }else{
                ThongBao.ThongBao_Loi(response.message);
            }
        } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
             ThongBao.ThongBao_Loi("Có lỗi xảy ra khi xác nhận đơn hàng. Vui lòng thử lại!");
        } finally {
            setloading(false);
        }


    };
    const Lay_MacDinh = async () => {
        const thongtinND = await LayThongTinNguoiDung();
        // lấy HOTEN, SDT
        const HOTEN = thongtinND.HOTEN;
        const SDT = thongtinND.SDT;
            setUserInputs({ hoTen: HOTEN, sdt: SDT });
        // lấy DIACHI có tTRANGTHAI = 1 trong danhSachDiaChi
        const diaChiMacDinh = danhSachDiaChi.find(addr => addr.TRANGTHAI === 1);
        if (diaChiMacDinh) {
            setSelectedAddress(diaChiMacDinh.DIACHI);
        }
    }
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-10 bg-white min-h-screen text-gray-800">
            <div className="space-y-12">
                
                {/* PHẦN 1: THÔNG TIN NGƯỜI NHẬN */}
                <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                        01. Người nhận hàng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Họ và tên"
                                value={userInputs.hoTen}
                                onChange={(e) => setUserInputs({...userInputs, hoTen: e.target.value})}
                                className="w-full py-3 border-b border-gray-200 focus:border-blue-600 outline-none transition-all text-lg bg-transparent placeholder:text-gray-300"
                            />
                        </div>
                        <div className="relative group">
                            <input 
                                type="tel" 
                                placeholder="Số điện thoại"
                                value={userInputs.sdt}
                                onChange={(e) => setUserInputs({...userInputs, sdt: e.target.value})}
                                className="w-full py-3 border-b border-gray-200 focus:border-blue-600 outline-none transition-all text-lg bg-transparent placeholder:text-gray-300"
                            />
                        </div>
                    </div>
                </section>

                {/* PHẦN 2: ĐỊA CHỈ GIAO HÀNG */}
                <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                        02. Địa chỉ giao hàng
                    </h3>
                    
                    <div className="grid gap-3">

                        {
                        danhSachDiaChi.length>0 && (
                             danhSachDiaChi.map((addr) => (
                            <div 
                                key={addr.id}
                                onClick={() => { setSelectedAddress(addr.DIACHI); setIsAddingNewAddress(false); }}
                                className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                                    !isAddingNewAddress && selectedAddress === addr.DIACHI 
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <i className={`fa-solid ${!isAddingNewAddress && selectedAddress === addr.DIACHI ? 'fa-circle-check' : 'fa-circle text-gray-200'} text-xl`}></i>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        {addr.TRANGTHAI === 1 && (
                                            <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${!isAddingNewAddress && selectedAddress === addr.DIACHI ? 'bg-white/20' : 'bg-gray-200 text-gray-500'}`}>
                                                Mặc định
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm ${!isAddingNewAddress && selectedAddress === addr.DIACHI ? 'text-blue-50' : 'text-gray-400'} italic`}>
                                        {addr.DIACHI}
                                    </p>
                                </div>
                            </div>
                        ))
                        )
                        }
                    </div>

                    {isAddingNewAddress && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-gray-500 text-sm mb-2">Địa chỉ mới:</p>
                            <textarea 
                                placeholder="Nhập địa chỉ chi tiết (Số nhà, tên đường...)"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="w-full p-5 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none min-h-[100px] transition-all"
                            ></textarea>
                        </div>
                    )}
                </section>

                {/* PHẦN 3: NHÓM NÚT BẤM (DỮ LIỆU MẶC ĐỊNH + XÁC NHẬN) */}
                <section className="pt-10 space-y-4 pb-20">
                    
                    {/* NÚT LẤY MẶC ĐỊNH - ĐẶT NGAY TRÊN NÚT CHÍNH */}
                    {
                        danhSachDiaChi.length>0 && (
                            <>
                                    <button 
                                        onClick={Lay_MacDinh}
                        className="w-full py-4 rounded-2xl text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        Sử dụng thông tin mặc định của tôi
                    </button>
                            </>
                        )
                    }
                    <button 
                        onClick={handleConfirmOrder}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg tracking-widest"
                    >
                        XÁC NHẬN VÀ THANH TOÁN
                        <i className="fa-solid fa-chevron-right text-sm"></i>
                    </button>

                    <p className="text-center text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] pt-4">
                        <i className="fa-solid fa-shield-check mr-2"></i> Thanh toán an toàn 256-bit
                    </p>
                </section>

            </div>
        </div>
    );
};

export default ThongTinDonHang;