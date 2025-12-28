import React, { useState } from 'react';

function ChinhSuaTrangThai() {
    const [status, setStatus] = useState('active');

    const handleSave = () => {
        console.log("Trạng thái mới:", status);
        alert("Cập nhật trạng thái thành công!");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Chỉnh sửa trạng thái thương hiệu
            </h2>
            
            <div className="space-y-4">
                {/* Lựa chọn trạng thái */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái hoạt động
                    </label>
                    <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                    >
                        <option value="active">🟢 Đang hoạt động</option>
                        <option value="inactive">🔴 Ngừng hoạt động</option>
                        <option value="maintenance">🟡 Đang bảo trì</option>
                    </select>
                </div>

                <p className="text-xs text-gray-500">
                    * Lưu ý: Thay đổi trạng thái sẽ ảnh hưởng đến việc hiển thị sản phẩm trên cửa hàng.
                </p>

                {/* Nút hành động */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Hủy
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChinhSuaTrangThai;