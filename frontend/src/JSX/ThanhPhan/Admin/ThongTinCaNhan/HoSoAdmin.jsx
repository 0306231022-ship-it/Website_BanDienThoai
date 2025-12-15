import { Link } from "react-router-dom";

function HoSo() {
    return (
        <>
            <div className="p-6 min-h-screen">
                
                {/* 1. HEADER - Tiêu đề trang */}
                <header className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <div className="flex items-center mb-1">
                        {/* Icon và tiêu đề được làm nổi bật */}
                        <i className="fa-solid fa-user-circle text-indigo-600 text-3xl mr-3"></i> 
                        <h2 className="text-2xl font-extrabold text-gray-900">Trang Cá Nhân và Thông Tin Tài Khoản</h2>
                    </div>
                    <p className="text-gray-500 mt-2">
                        Xem lại trang cá nhân và thông tin cá nhân bạn đã thêm vào Trung tâm tài khoản này.
                        Thêm trang cá nhân khác bằng cách thêm tài khoản. 
                        <Link to="" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium ml-1 transition">Tìm hiểu thêm</Link>
                    </p>
                </header>

                {/* 2. TRANG CÁ NHÂN */}
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">👤 Trang cá nhân</h3>
                    
                    {/* Mục chi tiết Trang cá nhân */}
                    <button className="flex items-center justify-between w-full py-3 px-3 rounded-xl hover:bg-indigo-50 cursor-pointer transition duration-200 ease-in-out group">
                        <div className="flex items-center space-x-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden flex-shrink-0 border-2 border-indigo-300">
                                {/* Thay SVG bằng Font Awesome hoặc giữ SVG nếu đây là placeholder chuẩn */}
                                <i className="fa-solid fa-user-circle text-indigo-500 text-3xl flex justify-center items-center h-full"></i>
                            </div>
                            
                            <div className='text-left'>
                                {/* Tên người dùng */}
                                <p className="font-bold text-gray-900 text-lg group-hover:text-indigo-800">Nguyễn Ngọc Hiếu</p>
                                
                                {/* Nguồn/Loại tài khoản */}
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                    <i className="fa-brands fa-facebook-f text-blue-600 w-4 h-4 mr-2"></i> Facebook
                                </p>
                            </div>
                        </div>
                        
                        {/* Mũi tên */}
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-400 group-hover:text-indigo-600"></i>
                    </button>
                    {/* Có thể thêm nút "Thêm tài khoản" ở đây nếu cần */}
                </main>

                {/* Thay thế <hr> bằng khoảng trống nhẹ */}
                <div className="my-8"></div> 

                {/* 3. THÔNG TIN CÁ NHÂN */}
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">🔑 Thông tin cá nhân</h3>
                    
                    {/* Mục Thông tin liên hệ */}
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group border-b border-gray-100">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600">
                                <i className="fa-solid fa-phone-volume text-indigo-500 w-5 mr-3"></i> Thông tin liên hệ
                            </p>
                            <p className="text-sm text-gray-500 mt-1 pl-8 truncate max-w-lg"> 
                                {`dc01.nnh.2048ae@gmail.com, +84398004970`}
                            </p>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>

                    {/* Mục Ngày sinh */}
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600">
                                <i className="fa-solid fa-calendar-days text-indigo-500 w-5 mr-3"></i> Ngày sinh
                            </p>
                            <p className="text-sm text-gray-500 mt-1 pl-8">07/06/2005</p>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                </main>

                {/* 4. ĐỊA CHỈ LIÊN HỆ (Đã đổi tên và sửa nội dung) */}
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 mb-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">📍 Địa chỉ đã lưu</h3>

                    {/* Mục Địa chỉ */}
                    {/* Mục này có vẻ trùng nội dung với mục liên hệ, tôi giả định bạn muốn lưu Địa chỉ riêng */}
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600">
                                <i className="fa-solid fa-location-dot text-indigo-500 w-5 mr-3"></i> Địa chỉ mặc định
                            </p>
                            {/* Giả định đây là một địa chỉ vật lý */}
                            <p className="text-sm text-gray-500 mt-1 pl-8 truncate max-w-lg">
                                Phường X, Quận Y, Thành phố Z, Việt Nam (hoặc nội dung tương tự)
                            </p>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                    {/* Mục Ngày sinh thứ 2 đã được loại bỏ vì bị lặp lại không cần thiết */}
                </main>

            </div>
        </>
    );
};
export default HoSo;