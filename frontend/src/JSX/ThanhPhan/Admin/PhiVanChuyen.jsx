function PhiVanChuyen(){
    return(
        <>
        <section id="section-shipping-config" className="section" aria-label="Cấu hình phí vận chuyển">
    
    <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">⚙️ Cấu hình Phí Vận chuyển</h2>
        <button className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition" aria-label="Lưu cấu hình phí vận chuyển">
            <i className="fas fa-save mr-2"></i> Lưu Cấu hình
        </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl border-2 border-blue-100">
            <h3 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2">Thêm/Sửa Quy tắc Phí</h3>
            
            <form id="shipping-rule-form" className="space-y-4">
                
                <div>
                    <label for="shipping-zone" className="block text-sm font-medium text-gray-700 mb-1">Khu vực Áp dụng <span className="text-red-500">*</span></label>
                    <select id="shipping-zone" className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500 transition">
                        <option value="HN_HCM">Hà Nội & TP. Hồ Chí Minh</option>
                        <option value="City_Tier2">Các Thành phố lớn (Tier 2)</option>
                        <option value="Rural">Khu vực Nông thôn/Hải đảo</option>
                        <option value="International">Quốc tế</option>
                    </select>
                </div>
                
                <div>
                    <label for="rule-type" className="block text-sm font-medium text-gray-700 mb-1">Tính phí dựa trên</label>
                    <select id="rule-type" className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500 transition">
                        <option value="weight">Trọng lượng (kg)</option>
                        <option value="value">Giá trị đơn hàng (₫)</option>
                    </select>
                </div>

                <div>
                    <label for="rule-min" className="block text-sm font-medium text-gray-700 mb-1">Từ Ngưỡng (Min) <span className="text-xs text-gray-500">(kg/₫)</span></label>
                    <input type="number" id="rule-min" value="0" min="0" 
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                </div>
                
                <div>
                    <label for="rule-max" className="block text-sm font-medium text-gray-700 mb-1">Đến Ngưỡng (Max) <span className="text-xs text-gray-500">(kg/₫)</span></label>
                    <input type="number" id="rule-max" placeholder="Để trống nếu không giới hạn" 
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                </div>

                <div>
                    <label for="shipping-fee" className="block text-sm font-medium text-gray-700 mb-1">Phí Vận chuyển (₫) <span className="text-red-500">*</span></label>
                    <input type="number" id="shipping-fee" value="25000" min="0" 
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                </div>
                
                <div className="pt-2">
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition shadow-md">
                        <i className="fas fa-plus mr-2"></i> Thêm Quy tắc Mới
                    </button>
                </div>
            </form>
        </div>

        <div className="lg:col-span-2 bg-teal-50 p-6 rounded-xl shadow-2xl border-2 border-teal-300">
            <h3 className="text-xl font-bold text-teal-800 mb-4 border-b pb-2">Danh sách Quy tắc Vận chuyển</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-teal-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Khu vực</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Loại</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Ngưỡng (Từ - Đến)</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Phí (₫)</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50 transition duration-100">
                            <td className="px-4 py-3 text-sm font-medium text-teal-600">HN & HCM</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Trọng lượng</td>
                            <td className="px-4 py-3 text-sm text-gray-700">0 kg - 5 kg</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">25,000</td>
                            <td className="px-4 py-3 text-center text-sm">
                                <button className="text-blue-600 hover:text-blue-900 mr-2">Sửa</button>
                                <button className="text-red-600 hover:text-red-900">Xóa</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition duration-100">
                            <td className="px-4 py-3 text-sm font-medium text-teal-600">HN & HCM</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Giá trị</td>
                            <td className="px-4 py-3 text-sm text-gray-700">1,500,000₫ trở lên</td>
                            <td className="px-4 py-3 text-sm font-semibold text-green-600 text-right">0 (Miễn phí)</td>
                            <td className="px-4 py-3 text-center text-sm">
                                <button className="text-blue-600 hover:text-blue-900 mr-2">Sửa</button>
                                <button className="text-red-600 hover:text-red-900">Xóa</button>
                            </td>
                        </tr>
                         <tr className="hover:bg-gray-50 transition duration-100">
                            <td className="px-4 py-3 text-sm font-medium text-teal-600">Khu vực Nông thôn</td>
                            <td className="px-4 py-3 text-sm text-gray-700">Trọng lượng</td>
                            <td className="px-4 py-3 text-sm text-gray-700">0 kg - 5 kg</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">45,000</td>
                            <td className="px-4 py-3 text-center text-sm">
                                <button className="text-blue-600 hover:text-blue-900 mr-2">Sửa</button>
                                <button className="text-red-600 hover:text-red-900">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <i className="fas fa-info-circle mr-2"></i> Lưu ý: Các quy tắc được áp dụng theo thứ tự ưu tiên từ trên xuống dưới.
            </div>
        </div>
    </div>
</section>
        </>
    );
};
export default PhiVanChuyen;