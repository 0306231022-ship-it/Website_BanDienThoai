import { Link } from "react-router-dom";
function HoSo(){
    return(
        <>
          <div className="container mx-auto max-w-4xl">
    <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        <i className="fas fa-user-circle mr-3 text-indigo-500"></i> Hồ Sơ Quản Trị Viên
    </h1>

    <div className="bg-white shadow-2xl rounded-xl overflow-hidden transform transition duration-500 hover:scale-[1.01]">
        
        <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                
                <div className="flex-shrink-0">
                    <img 
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-offset-2 ring-indigo-500 shadow-md" 
                        src="https://picsum.photos/150?random=1" 
                        alt="Avatar của Admin TechMobile"
                    />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-indigo-700 leading-tight">Admin TechMobile</h2>
                    <p className="text-xl text-gray-600 font-semibold mt-1 mb-4">Quản trị viên cấp cao</p>
                    
                    <div className="space-y-3">
                        <p className="flex items-center justify-center md:justify-start text-gray-700">
                            <i className="fas fa-envelope w-5 mr-3 text-indigo-500"></i>
                            <span className="truncate">admin@techmobile.com</span>
                        </p>
                        <p className="flex items-center justify-center md:justify-start text-gray-700">
                            <i className="fas fa-phone w-5 mr-3 text-indigo-500"></i>
                            0901 234 567
                        </p>
                        <p className="flex items-center justify-center md:justify-start text-gray-700">
                            <i className="fas fa-map-marker-alt w-5 mr-3 text-indigo-500"></i>
                            TP. Hồ Chí Minh, Việt Nam
                        </p>
                        <p className="flex items-center justify-center md:justify-start text-gray-700">
                            <i className="fas fa-birthday-cake w-5 mr-3 text-indigo-500"></i>
                            <span className="font-medium">Ngày sinh:</span> 25/08/1990
                        </p>
                        </div>
                </div>
            </div>
        </div>
        
        <div className="p-8 bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-indigo-300 pb-2">Thông tin hệ thống & Hoạt động</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Ngày tham gia</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">01/01/2023</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Đăng nhập gần nhất</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">14/11/2025 18:30:00</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Đơn hàng đã xử lý</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">1,250</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Quyền truy cập</p>
                    <p className="text-lg font-bold text-red-600 mt-1">Toàn Quyền</p>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-end">
            <Link to="/admin/hoso/ChinhSuaThongTinAdmin"
                href="#" 
                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors transform hover:scale-[1.02] text-center" 
                role="button"
            >
                <i className="fas fa-pen mr-2"></i> Chỉnh Sửa Hồ Sơ
            </Link>
            <button
                type="button"
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors transform hover:scale-[1.02] text-center" 
            >
                <i className="fas fa-sign-out-alt mr-2"></i> Đăng Xuất
            </button>
        </div>
    </div>
</div>
        </>
    );
};
export default HoSo;