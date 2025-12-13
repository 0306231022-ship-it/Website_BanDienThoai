// src/components/CaiDatWebsite/ChinhSuaModal.jsx

import React from 'react';

// Component ChinhSuaModal dùng chung cho cả Edit All và Edit Single
function ChinhSuaModal({ isEditAll, setModalOpen, data = {} }) {
    const handleClose = () => {
        setModalOpen(false);
    };

    const handleReset = (e) => {
        e.preventDefault();
        // Logic reset: Đặt lại giá trị input về giá trị data.currentValue
        alert(`Đã reset giá trị cho ${isEditAll ? 'tất cả các trường' : data.fieldName}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic gọi API lưu dữ liệu
        alert(`Đã lưu thành công ${isEditAll ? 'TẤT CẢ CÀI ĐẶT' : `trường: ${data.fieldName}`}`);
        setModalOpen(false);
    };

    const title = isEditAll ? "📝 Chỉnh Sửa Tất Cả Thông Tin" : `⚙️ Sửa: ${data.fieldName}`;
    const maxWidth = isEditAll ? 'max-w-5xl' : 'max-w-lg';

    // Tailwind CSS cho Modal (Sử dụng CSS đẹp mắt đã tạo trước đó)
    return (
        <div id="modalContainer" className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-xl shadow-3xl w-full ${maxWidth} p-6 md:p-8 transition-all duration-300 transform scale-100`}>
                <div className={`flex justify-between items-center pb-4 mb-4 border-b ${isEditAll ? 'border-gray-200' : 'border-indigo-100'}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        {title}
                    </h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-transform duration-200 hover:rotate-90">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Phần cho Chỉnh sửa Đơn lẻ */}
                    {!isEditAll && data.fieldName && (
                        <>
                            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                                <p className="text-sm font-medium text-indigo-600 mb-1">Giá trị hiện tại:</p>
                                <p className="text-lg font-extrabold text-indigo-900 break-words">{data.currentValue}</p>
                            </div>
                            
                            <div>
                                <label htmlFor="newValueInput" className="block text-sm font-medium text-gray-700 mb-1">{data.fieldName} mới:</label>
                                {/* Dùng Textarea nếu là Địa chỉ/Mô tả, ngược lại dùng Input */}
                                {data.fieldName.includes('Địa chỉ') || data.fieldName.includes('Mô tả') ? (
                                    <textarea id="newValueInput" rows="3" defaultValue={data.currentValue} required className="w-full border border-gray-300 rounded-lg shadow-inner p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"></textarea>
                                ) : (
                                    <input type={data.fieldName.includes('Link') ? 'url' : (data.fieldName.includes('Số điện thoại') ? 'tel' : (data.fieldName === 'Logo' ? 'file' : 'text'))} id="newValueInput" defaultValue={data.currentValue} required className="w-full border border-gray-300 rounded-lg shadow-inner p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"/>
                                )}
                            </div>
                        </>
                    )}

                    {/* Phần cho Chỉnh sửa Tất cả (Chỉ hiển thị các trường Input cơ bản) */}
                    {isEditAll && (
                        <>
                            {/* ... Các trường Input cho Edit All (Bạn cần điền dữ liệu từ TTwebsite vào đây) ... */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Tên Website" defaultValue={data.Title || 'CellphoneX Store'} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"/>
                                <input type="tel" placeholder="Số điện thoại" defaultValue={data.Phone || '0987 654 321'} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <textarea rows="3" placeholder="Địa chỉ (Footer)" defaultValue={data.Address || '123 Đường ABC...'} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            {/* ... Thêm các trường khác tương tự ... */}
                        </>
                    )}
                
                    {/* Nút Hành động */}
                    <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                        <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-150">Hủy</button>
                        
                        {!isEditAll && ( // Nút Reset chỉ cần cho Edit Single
                            <button type="button" onClick={handleReset} className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition duration-150">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356-2A8.001 8.001 0 004.582 19.42M20 20v-5h-.581m0 0a8.003 8.003 0 01-15.357-2.14m15.357 2.14l-.001-.001"></path></svg>
                                    Reset
                                </span>
                            </button>
                        )}

                        <button type="submit" className={`px-4 py-2 text-sm font-medium text-white ${isEditAll ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} rounded-lg shadow-md transition duration-150`}>
                            Lưu Thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChinhSuaModal;