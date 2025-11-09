import { Link } from "react-router-dom";
function ThemThuongHieu() {
    return(
        <>
         <div id="brand-form-modal" className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6 transition duration-500 border border-teal-200" Style="margin-top: 20px;">
    <h3 id="brand-form-title" className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-teal-500/50 pb-3">
        🏷️ Thêm Thương Hiệu Mới
    </h3>
    
    <form id="brand-crud-form" className="space-y-6">
        
        <div>
            <label for="brand-name" className="block text-sm font-semibold text-gray-700 mb-1">Tên Thương hiệu *</label>
            <input type="text" id="brand-name" placeholder="Ví dụ: Apple, Samsung, Xiaomi" 
                   className="w-full p-3 border border-gray-300 rounded-lg text-base 
                          focus:ring-teal-500 focus:border-teal-500 transition duration-150 bg-gray-50" required/>
        </div>

        <div>
            <label for="brand-description" className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
            <textarea id="brand-description" rows="2" placeholder="Tóm tắt về thương hiệu, lịch sử hoặc định hướng sản phẩm..." 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-gray-50"></textarea>
        </div>

        <div className="border-2 border-dashed border-teal-300 p-5 rounded-xl bg-teal-50/50 transition hover:bg-teal-100">
            <label className="block text-base font-bold text-teal-800 mb-3">🖼️ Logo Thương hiệu</label>

            <input type="file" id="logo-upload" accept="image/*" className="hidden" onchange="previewLogo(event)"/>
            
            <div id="logo-preview-container" className="mt-4 mb-4 flex items-center gap-4">
                <img id="logo-preview" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                     alt="Xem trước Logo" 
                     className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white" 
                     Style="display: none;"/>
                <span id="logo-placeholder" className="text-sm text-gray-500 italic">Chưa có logo nào được chọn.</span>
            </div>

            <button type="button" onclick="document.getElementById('logo-upload').click()" 
                    className="bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md font-semibold text-sm">
                Chọn Logo
            </button>
        </div>

        <div className="flex gap-3 pt-2">
            <button type="submit" id="brand-submit-btn" 
                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 font-bold shadow-md shadow-teal-300/50 
                           transition duration-300 uppercase text-base">
                💾 Lưu Thương Hiệu
            </button>
            <Link to="/admin/thuonghieu" id="brand-cancel-btn" 
                    className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold text-base transition duration-200">
                Hủy
            </Link>
        </div>
    </form>
</div>
        </>
    )
};

export default ThemThuongHieu;