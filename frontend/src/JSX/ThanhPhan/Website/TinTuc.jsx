import { Link } from "react-router-dom";
function TinTuc() {
    return (
    <>
                <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Khám Phá Công Nghệ Mới</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover transition duration-300">
                        <div className="h-48 bg-primary bg-opacity-10 flex items-center justify-center text-primary text-5xl font-extrabold p-4">
                            AI Camera
                        </div>
                        <div className="p-6">
                            <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 block">Xu hướng</span>
                            <h4 className="text-xl font-bold mb-3">Sức mạnh nhiếp ảnh AI</h4>
                            <p className="text-gray-600 text-sm">Tìm hiểu cách AI thay đổi khả năng chụp ảnh thiếu sáng và chỉnh sửa ảnh trên điện thoại.</p>
                            <Link to="" className="mt-4 inline-block text-primary hover:text-blue-700 font-medium text-sm">Đọc thêm &rarr;</Link>
                        </div>
                    </div>

            
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover transition duration-300">
                        <div className="h-48 bg-secondary bg-opacity-10 flex items-center justify-center text-secondary text-5xl font-extrabold p-4">
                            144Hz
                        </div>
                        <div className="p-6">
                            <span className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2 block">Hiệu năng</span>
                            <h4 className="text-xl font-bold mb-3">Trải nghiệm Màn hình Siêu Mượt</h4>
                            <p className="text-gray-600 text-sm">Điện thoại có tần số quét 144Hz mang lại sự khác biệt lớn trong chơi game và cuộn trang.</p>
                            <Link to="" className="mt-4 inline-block text-primary hover:text-blue-700 font-medium text-sm">Đọc thêm &rarr;</Link>
                        </div>
                    </div>

     
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover transition duration-300">
                        <div className="h-48 bg-gray-700 bg-opacity-10 flex items-center justify-center text-gray-700 text-5xl font-extrabold p-4">
                            Titanium
                        </div>
                        <div className="p-6">
                            <span className="text-xs text-gray-700 font-semibold uppercase tracking-wider mb-2 block">Vật liệu mới</span>
                            <h4 className="text-xl font-bold mb-3">Titanium: Nhẹ hơn, Bền hơn</h4>
                            <p className="text-gray-600 text-sm">Khám phá các mẫu điện thoại mới sử dụng khung viền Titanium siêu bền và cao cấp.</p>
                            <Link to="" className="mt-4 inline-block text-primary hover:text-blue-700 font-medium text-sm">Đọc thêm &rarr;</Link>
                        </div>
                    </div>
                </div>

    </>
    );
};
export default TinTuc;