import React, { useState } from 'react';

function TaoPhieuChi() {
    const [loading, setLoading] = useState(false);
    
    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        maPhieu: 'PC-AUTO-001', // Thường sẽ do BE sinh tự động
        ngayGhiSo: new Date().toISOString().split('T')[0],
        loaiDoiTuong: 'NCC', // NCC: Nhà cung cấp, NV: Nhân viên, KHAC: Khác
        doiTuong: '', // ID hoặc Tên đối tượng
        nguoiNhan: '',
        lyDoChi: 'Thanh toán tiền hàng',
        soTien: '',
        phuongThuc: 'TM', // TM: Tiền mặt, CK: Chuyển khoản
        nganHang: '',
        soTaiKhoan: '',
        ghiChu: ''
    });

    // Hàm định dạng tiền tệ (VD: 1000000 => 1.000.000)
    const formatCurrency = (value) => {
        if (!value) return '';
        // Xóa các ký tự không phải số
        const number = value.replace(/\D/g, '');
        return new Intl.NumberFormat('vi-VN').format(number);
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'soTien') {
            // Xử lý riêng cho ô số tiền để format
            const rawValue = value.replace(/\./g, '');
            if (!isNaN(rawValue)) {
                setFormData(prev => ({ ...prev, [name]: formatCurrency(rawValue) }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Giả lập lưu dữ liệu
    const handleSave = () => {
        setLoading(true);
        console.log("Dữ liệu gửi đi:", formData);
        
        // Giả lập API call delay
        setTimeout(() => {
            alert("Lưu phiếu chi thành công!");
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-10 font-sans">
            
            {/* --- HEADER --- */}
            <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-sm">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Tạo phiếu chi</h1>
                            <p className="text-sm text-slate-500">Tạo phiếu chi tiền mặt hoặc báo nợ ngân hàng</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => window.history.back()} className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all">
                            Hủy bỏ
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading && <i className="fa-solid fa-circle-notch animate-spin"></i>}
                            <span>Lưu phiếu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* --- BODY --- */}
            <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* CỘT TRÁI: THÔNG TIN CHUNG */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Card 1: Thông tin người nhận */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <i className="fa-regular fa-id-card text-blue-600"></i>
                                Thông tin người nhận
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Loại đối tượng</label>
                                    <select 
                                        name="loaiDoiTuong" 
                                        value={formData.loaiDoiTuong}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="NCC">Nhà cung cấp</option>
                                        <option value="NV">Nhân viên</option>
                                        <option value="KHAC">Khác</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Tên đối tượng <span className="text-red-500">*</span></label>
                                    {/* Ở đây thực tế sẽ là một Combobox tìm kiếm */}
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            name="doiTuong"
                                            value={formData.doiTuong}
                                            onChange={handleChange}
                                            placeholder="Tìm kiếm nhà cung cấp..." 
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Người nhận tiền</label>
                                <input 
                                    type="text" 
                                    name="nguoiNhan"
                                    value={formData.nguoiNhan}
                                    onChange={handleChange}
                                    placeholder="VD: Nguyễn Văn A" 
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Lý do chi</label>
                                <select 
                                    name="lyDoChi"
                                    value={formData.lyDoChi}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="Thanh toán tiền hàng">Thanh toán tiền hàng</option>
                                    <option value="Tạm ứng nhân viên">Tạm ứng nhân viên</option>
                                    <option value="Chi phí điện nước">Chi phí điện nước</option>
                                    <option value="Chi phí thuê mặt bằng">Chi phí thuê mặt bằng</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                        </div>

                        {/* Card 2: Giá trị & Phương thức */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-coins text-amber-500"></i>
                                Giá trị & Thanh toán
                            </h3>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Giá trị chi (VNĐ) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        name="soTien"
                                        value={formData.soTien}
                                        onChange={handleChange}
                                        placeholder="0" 
                                        className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-2xl font-bold text-slate-800 placeholder-slate-300 text-right"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₫</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-600 mb-2">Phương thức thanh toán</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.phuongThuc === 'TM' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="phuongThuc" 
                                            value="TM" 
                                            checked={formData.phuongThuc === 'TM'} 
                                            onChange={handleChange}
                                            className="hidden" 
                                        />
                                        <i className="fa-solid fa-wallet"></i>
                                        <span className="font-medium">Tiền mặt</span>
                                    </label>

                                    <label className={`flex-1 cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.phuongThuc === 'CK' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="phuongThuc" 
                                            value="CK" 
                                            checked={formData.phuongThuc === 'CK'} 
                                            onChange={handleChange}
                                            className="hidden" 
                                        />
                                        <i className="fa-solid fa-building-columns"></i>
                                        <span className="font-medium">Chuyển khoản</span>
                                    </label>
                                </div>
                            </div>

                            {/* Khu vực hiển thị động khi chọn Chuyển khoản */}
                            {formData.phuongThuc === 'CK' && (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 animate-fadeIn space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tài khoản chi (Của mình)</label>
                                        <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500">
                                            <option>Vietcombank - 0981xxx (Chính)</option>
                                            <option>MB Bank - 0352xxx (Phụ)</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ngân hàng thụ hưởng</label>
                                            <input type="text" placeholder="VD: Techcombank" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Số tài khoản thụ hưởng</label>
                                            <input type="text" placeholder="Nhập số TK..." className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* CỘT PHẢI: THÔNG TIN BỔ SUNG */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Card 3: Cấu hình phiếu */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-base font-bold text-slate-800 mb-4 uppercase tracking-wider">Thông tin phiếu</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Mã phiếu</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={formData.maPhieu}
                                            disabled
                                            className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono"
                                        />
                                        <i className="fa-solid fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Ngày ghi sổ</label>
                                    <input 
                                        type="date" 
                                        name="ngayGhiSo"
                                        value={formData.ngayGhiSo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Tham chiếu & Ghi chú */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Tham chiếu chứng từ (nếu có)</label>
                                <input 
                                    type="text" 
                                    placeholder="VD: PNK-001, HD-123..." 
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                />
                                <p className="text-xs text-slate-400 mt-1 italic">Nhập mã đơn nhập hàng để gán công nợ.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">Ghi chú nội bộ</label>
                                <textarea 
                                    rows="4"
                                    name="ghiChu"
                                    value={formData.ghiChu}
                                    onChange={handleChange}
                                    placeholder="Nhập ghi chú chi tiết..."
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                                ></textarea>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default TaoPhieuChi;