import React, { useState, useEffect } from 'react';
import * as API from '../../../../../JS/API/API'

function ThongTinChinhSua({ data, onClose, url }) {
    const [formData, setFormData] = useState({
        TENNCC: '',
        SDT: '',
        DIACHI: '',
        EMAIL: '',
        MST: '',
        LIENHE_DOITAC: '',
        MAVACH: ''
    });

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            setFormData({
                TENNCC: data.TENNCC || '',
                SDT: data.SDT || '',
                DIACHI: data.DIACHI || '',
                EMAIL: data.EMAIL || '',
                MST: data.MST || '',
                LIENHE_DOITAC: data.LIENHE_DOITAC || '',
                MAVACH: data.MAVACH || ''
            });
        }
    }, [data]);

    // 3. Xử lý nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 4. Xử lý Lưu
    const handleSave = async () => {
        // Validate cơ bản
        if (!formData.TENNCC.trim()) {
            alert("Vui lòng nhập tên nhà cung cấp");
            return;
        }

        setLoading(true);
        try {
            const res = await API.CallAPI(formData, { url: url, PhuongThuc: "POST" });
            
            if (res.Status) {
                alert('Cập nhật thất bại: ' + res.message);
            } else {
                // Thành công
                // Cách 1: Reload trang
                window.location.reload(); 
                
                // Cách 2: Nếu bạn muốn UX mượt hơn thì gọi hàm reload data ở cha và đóng modal
                // onClose();
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi hệ thống khi cập nhật!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[95vw] max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scaleIn">
            
            {/* --- HEADER --- */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                        <i className="fa-solid fa-pen-to-square text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-800 tracking-tight">Cập nhật thông tin</h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-0.5">Chỉnh sửa hồ sơ nhà cung cấp</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-all shadow-sm"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            {/* --- BODY (SCROLLABLE) --- */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="space-y-6">
                    
                    {/* Hàng 1: Tên NCC (Quan trọng nhất) */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <i className="fa-solid fa-building text-blue-500"></i> Tên Nhà Cung Cấp <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="TENNCC"
                            value={formData.TENNCC}
                            onChange={handleChange}
                            placeholder="Ví dụ: Công ty TNHH ABC..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-semibold text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    {/* Hàng 2: Grid 2 cột */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Người đại diện */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Người đại diện</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-user-tie"></i></span>
                                <input 
                                    type="text" 
                                    name="LIENHE_DOITAC"
                                    value={formData.LIENHE_DOITAC}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>
                        </div>

                        {/* Mã số thuế */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Mã số thuế</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-file-invoice"></i></span>
                                <input 
                                    type="text" 
                                    name="MST"
                                    value={formData.MST}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                                    placeholder="0123456789"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hàng 3: Grid 2 cột (Liên hệ) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Số điện thoại */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Số điện thoại</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-phone"></i></span>
                                <input 
                                    type="text" 
                                    name="SDT"
                                    value={formData.SDT}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-500 outline-none transition-all"
                                    placeholder="09xxx..."
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Email liên hệ</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-envelope"></i></span>
                                <input 
                                    type="email" 
                                    name="EMAIL"
                                    value={formData.EMAIL}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all"
                                    placeholder="company@gmail.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hàng 4: Địa chỉ */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">Địa chỉ trụ sở</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-gray-400"><i className="fa-solid fa-map-location-dot"></i></span>
                            <textarea 
                                rows="3"
                                name="DIACHI"
                                value={formData.DIACHI}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all resize-none"
                                placeholder="Số nhà, đường, phường/xã..."
                            ></textarea>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                <button 
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow-sm border border-transparent hover:border-gray-200 transition-all"
                >
                    Hủy bỏ
                </button>
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <i className="fa-solid fa-circle-notch animate-spin"></i> Đang lưu...
                        </>
                    ) : (
                        <>
                            <i className="fa-regular fa-floppy-disk"></i> Lưu thay đổi
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ThongTinChinhSua;