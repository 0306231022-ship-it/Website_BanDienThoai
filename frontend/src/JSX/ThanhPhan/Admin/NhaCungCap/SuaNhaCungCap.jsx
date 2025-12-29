import React, { useState } from 'react';

function SuaNhaCungCap() {
    // State mô phỏng dữ liệu đang chỉnh sửa
    const [formData, setFormData] = useState({
        tenNCC: 'Công Ty Cổ Phần FPT Trading',
        mst: '0101234567',
        nguoiLienHe: 'Ms. Nguyễn Thị Lan',
        sdt: '0909123456',
        email: 'sale@fpt.com',
        diaChi: 'Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội',
        nganHang: 'Vietcombank',
        stk: '0011002999888',
        tenChuTK: 'FPT TRADING JSC',
        trangThai: 1 // 1: Active, 0: Inactive
    });

    // Hàm xử lý khi nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            
            {/* --- HEADER --- */}
            <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-sm">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Chỉnh sửa nhà cung cấp</h1>
                            <p className="text-sm text-slate-500">Cập nhật thông tin cho mã: <span className="font-mono font-bold text-slate-700">SUP-0010</span></p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => window.history.back()} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all">
                            Hủy bỏ
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2">
                            <i className="fa-solid fa-floppy-disk"></i> Lưu thay đổi
                        </button>
                    </div>
                </div>
            </header>

            {/* --- MAIN FORM --- */}
            <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
                
                <form className="space-y-8">
                    
                    {/* KHỐI 1: THÔNG TIN CHUNG */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <i className="fa-regular fa-building text-xl"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Thông tin chung</h2>
                                <p className="text-sm text-slate-500">Tên thương hiệu và thông tin pháp lý</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tên NCC */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên nhà cung cấp <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    name="tenNCC"
                                    value={formData.tenNCC}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="Nhập tên công ty..." 
                                />
                            </div>

                            {/* Mã số thuế */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mã số thuế</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i className="fa-solid fa-barcode"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        name="mst"
                                        value={formData.mst}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="VD: 0101234567" 
                                    />
                                </div>
                            </div>

                            {/* Trạng thái (Select Box) */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái hợp tác</label>
                                <select 
                                    name="trangThai"
                                    value={formData.trangThai}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                >
                                    <option value={1}>Đang hợp tác</option>
                                    <option value={0}>Ngừng hợp tác</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* KHỐI 2: THÔNG TIN LIÊN HỆ */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                <i className="fa-solid fa-address-book text-xl"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Liên hệ & Địa chỉ</h2>
                                <p className="text-sm text-slate-500">Thông tin liên lạc với đầu mối NCC</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Người liên hệ */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Người đại diện / Sale</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i className="fa-regular fa-user"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        name="nguoiLienHe"
                                        value={formData.nguoiLienHe}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Số điện thoại */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i className="fa-solid fa-phone"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        name="sdt"
                                        value={formData.sdt}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i className="fa-regular fa-envelope"></i>
                                    </span>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                             {/* Địa chỉ */}
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ kho / Văn phòng</label>
                                <div className="relative">
                                    <span className="absolute top-3 left-3 flex items-center text-slate-400">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </span>
                                    <textarea 
                                        name="diaChi"
                                        value={formData.diaChi}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* KHỐI 3: THÔNG TIN TÀI CHÍNH */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                                <i className="fa-solid fa-building-columns text-xl"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Thông tin thanh toán</h2>
                                <p className="text-sm text-slate-500">Tài khoản ngân hàng để chuyển khoản công nợ</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Ngân hàng */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Ngân hàng thụ hưởng</label>
                                <select 
                                    name="nganHang"
                                    value={formData.nganHang}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                >
                                    <option value="Vietcombank">Vietcombank - TMCP Ngoại Thương VN</option>
                                    <option value="Agribank">Agribank - NN & PTNT Việt Nam</option>
                                    <option value="Techcombank">Techcombank - TMCP Kỹ Thương</option>
                                    <option value="MBBank">MB Bank - Quân Đội</option>
                                </select>
                            </div>

                            {/* Số tài khoản */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Số tài khoản</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i className="fa-regular fa-credit-card"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        name="stk"
                                        value={formData.stk}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono font-bold tracking-wide"
                                    />
                                </div>
                            </div>

                            {/* Tên chủ tài khoản */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên chủ tài khoản</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i className="fa-solid fa-user-tag"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        name="tenChuTK"
                                        value={formData.tenChuTK}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                </form>
            </main>
        </div>
    );
}

export default SuaNhaCungCap;