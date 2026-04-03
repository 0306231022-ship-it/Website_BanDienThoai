import React, { useState } from 'react';
import { useThongTinDonHang } from '../../../REDUCER/QuanLiThongTinDatDon';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
const AddressEditForm = ({ onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        hoTen: '',
        sdt: '',
        diaChiChiTiet: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.hoTen || !formData.sdt || !formData.diaChiChiTiet) {
            ThongBao.ThongBao_CanhBao("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        if (!/^\d+$/.test(formData.sdt)) {
            ThongBao.ThongBao_CanhBao("Số điện thoại chỉ được chứa ký số!");
            return;
        }
        // Gửi dữ liệu ngược lên component cha
        onSave(formData);
    };

    return (
        <div className="bg-white p-5 rounded-3xl border border-blue-400 shadow-xl mb-6 animate-in fade-in zoom-in duration-300">
            <p className="text-[10px] font-black text-blue-600 uppercase mb-4 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Thay đổi thông tin nhận hàng
            </p>
            
            <div className="space-y-4">
                <div className="relative">
                    <i className="fas fa-user absolute left-3.5 top-3.5 text-gray-400 text-xs"></i>
                    <input 
                        name="hoTen"
                        value={formData.hoTen}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Họ và tên người nhận" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                    />
                </div>

                <div className="relative">
                    <i className="fas fa-phone absolute left-3.5 top-3.5 text-gray-400 text-xs"></i>
                    <input 
                        name="sdt"
                        value={formData.sdt}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Số điện thoại" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                    />
                </div>

                <div className="relative">
                    <i className="fas fa-map-marked-alt absolute left-3.5 top-3.5 text-gray-400 text-xs"></i>
                    <textarea 
                        name="diaChiChiTiet"
                        value={formData.diaChiChiTiet}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Địa chỉ cụ thể (Số nhà, đường...)" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                    <button 
                        onClick={handleSubmit}
                        className="flex-[2] py-3.5 bg-blue-600 text-white rounded-2xl text-[11px] font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all uppercase"
                    >
                        Xác nhận lưu
                    </button>
                    <button 
                        onClick={onCancel} 
                        className="flex-1 py-3.5 bg-gray-100 text-gray-500 rounded-2xl text-[11px] font-bold hover:bg-gray-200 active:scale-95 transition-all uppercase"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};
function DiaChi({ DuLieu }) {
    // Lấy state và hàm cập nhật từ Zustand
    const { ThongTinDatDon, setThongTinDatDon } = useThongTinDonHang();
    const [isOpen, setOpen] = useState(false);

    // Rút gọn đường dẫn dữ liệu để code sạch hơn
    const khachHang = ThongTinDatDon?.ThongTin_KhachHang;

    const handleSaveNewAddress = (data) => {
        // CẬP NHẬT VÀO STORE: Phải đúng cấu trúc ThongTin_KhachHang
        setThongTinDatDon({
            ThongTin_KhachHang: {
                HoTen: data.hoTen,
                SDT: data.sdt,
                DiaChi_MacDinh: data.diaChiChiTiet 
            }
        });
        
        setOpen(false);
        ThongBao.ThongBao_ThanhCong("Đã cập nhật địa chỉ thành công!");
    };

    return (
        <div className="max-w-md mx-auto space-y-5 p-2 pb-10">
            
            {/* 1. HIỂN THỊ ĐỊA CHỈ HIỆN TẠI */}
            <div className="bg-white p-5 rounded-[2.5rem] border-2 border-orange-500 shadow-xl relative ring-8 ring-orange-50/50">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-base">
                                {/* Ưu tiên hiển thị từ Store, nếu trống mới lấy từ Props DuLieu */}
                                {khachHang?.HoTen || DuLieu?.HoTen || "Chưa có tên"}
                            </span>
                            <span className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                                Đang chọn
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                            {khachHang?.SDT || DuLieu?.SDT || "Chưa có SĐT"}
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex gap-3 text-sm text-gray-600 italic leading-relaxed">
                    <i className="fas fa-map-marker-alt text-orange-500 mt-1"></i>
                    <p className="line-clamp-3">
                        {khachHang?.DiaChi_MacDinh || DuLieu?.DiaChi_MacDinh || "Chưa có địa chỉ"}
                    </p>
                </div>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <i className="fas fa-check text-xs"></i>
                </div>
            </div>

            {/* 2. NÚT ĐIỀU KHIỂN */}
            <button 
                onClick={() => setOpen(!isOpen)}
                className={`w-full py-5 border-2 border-dashed rounded-[2rem] flex items-center justify-center gap-3 transition-all duration-500
                    ${isOpen ? 'border-orange-400 bg-orange-50 text-orange-600 scale-[0.98]' : 'border-gray-200 text-gray-400 bg-white hover:border-orange-300 hover:text-orange-400'}`}
            >
                <i className={`fas ${isOpen ? 'fa-minus-circle' : 'fa-plus-circle'} text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
                <span className="text-[11px] font-black uppercase tracking-[0.15em]">
                    {isOpen ? 'Hủy bỏ thay đổi' : 'Thay đổi thông tin nhận hàng'}
                </span>
            </button>

            {/* 3. FORM NHẬP */}
            {isOpen && (
                <AddressEditForm 
                    onCancel={() => setOpen(false)} 
                    onSave={handleSaveNewAddress} 
                />
            )}

            {/* 4. GỢI Ý (Chỉ hiện khi đóng form) */}
            {!isOpen && (
                <div className="opacity-50 grayscale scale-95 pointer-events-none">
                     <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200">
                        <p className="text-xs font-bold text-gray-400 italic">Hệ thống sẽ tự động cập nhật đơn hàng sau khi bạn nhấn "Xác nhận lưu".</p>
                     </div>
                </div>
            )}
        </div>
    );
}

export default DiaChi;