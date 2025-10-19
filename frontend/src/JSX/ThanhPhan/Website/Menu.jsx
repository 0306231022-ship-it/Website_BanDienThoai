import { useAppContext } from "../../../CONTEXT/TrangChuWrb";
function Menu(){
    const { TrangThaiTrang, setTrangThaiTrang } = useAppContext();
    const ChuyenTrang = (tenTrang) => {
    setTrangThaiTrang({ type: "SET_USER", TrangThaiTrang: tenTrang, Trang:tenTrang }); // ví dụ dùng SET_USER
  };
    return(
        <>
         <nav className="sticky top-0 z-50 bg-white shadow-md">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <a className="flex-shrink-0 text-2xl font-bold text-primary" href="index.html">
                                <i className="bi bi-phone-vibrate-fill text-blue-600"></i> TechZone
                            </a>

                            {/* Menu Desktop */}
                            <div className="hidden lg:flex lg:space-x-8">
                                <a href="index.html" className="text-primary font-semibold border-b-2 border-primary py-2 px-1 text-blue-600">Trang chủ</a>

                                <div className="relative group">
                                    <button className="text-gray-700 hover:text-primary py-2 px-1 inline-flex items-center">
                                        Sản phẩm <i className="bi bi-chevron-down text-xs ml-1"></i>
                                    </button>
                                    <ul className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-40 z-10 rounded-md">
                                        <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Apple</a></li>
                                        <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Samsung</a></li>
                                        <li><a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Xiaomi</a></li>
                                    </ul>
                                </div>

                                <button type="button" onClick={(e)=>{ChuyenTrang('KhuyenMai')}} className="text-gray-700 hover:text-primary py-2 px-1">Khuyến mãi</button>
                                <a href="./tintuc.html" className="text-gray-700 hover:text-primary py-2 px-1">Tin tức</a>
                            </div>

                            {/* Icons và Buttons */}
                            <div className="flex items-center space-x-4">
                                {/* Search Bar Desktop */}
                                <div className="hidden xl:flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                                    <input type="search" placeholder="Tìm kiếm sản phẩm..." className="py-1 px-3 text-sm focus:outline-none w-48 bg-transparent text-gray-800" />
                                    <button className="bg-primary hover:bg-blue-700 text-white p-2 transition duration-200">
                                        <i className="bi bi-search text-sm"></i>
                                    </button>
                                </div>

                                {/* Cart Icon */}
                                <a href="./GioHang.html" className="relative text-gray-700 hover:text-primary">
                                    <i className="bi bi-cart3 text-xl"></i>
                                    <span className="absolute top-0 right-0 -mt-1 -mr-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">2</span>
                                </a>

                                {/* Search Icon Mobile */}
                                <button className="xl:hidden text-gray-700 hover:text-primary p-2">
                                    <i className="bi bi-search text-xl"></i>
                                </button>

                                {/* Login/Admin Buttons */}
                                <a href="./DangKy.html" className="hidden sm:inline-block border border-primary text-primary hover:bg-primary hover:text-white transition duration-200 py-1 px-3 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600">Đăng nhập</a>
                                <a href="./dn_ad.html" className="hidden sm:inline-block border border-primary text-primary hover:bg-primary hover:text-white transition duration-200 py-1 px-3 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600">admin</a>
                            </div>

                            {/* Mobile Menu Icon */}
                            <button className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary">
                                <i className="bi bi-list text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </nav>
        </>
    );
};
export default Menu;