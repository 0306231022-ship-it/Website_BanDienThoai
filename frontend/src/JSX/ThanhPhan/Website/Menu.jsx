import React from "react";
import { useAppContext } from "../../../CONTEXT/TrangChuWrb";

function Menu() {
    const { state, dispatch } = useAppContext();

    const ChuyenTrang = (tenTrang) => {
        dispatch({ type: "SET_TRANG", payload: tenTrang });
    };

    const isActive = (tenTrang) => state.Trang === tenTrang;

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <button className={`flex-shrink-0 text-2xl font-bold text-primary`}>
                        <i className="bi bi-phone-vibrate-fill text-blue-600"></i> TechZone
                    </button>

                    {/* Menu Desktop */}
                    <div className="hidden lg:flex lg:space-x-8">
                        <button
                            onClick={() => ChuyenTrang("TrangChu")}
                            className={`font-semibold py-2 px-1 ${
                                isActive("TrangChu")
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-gray-700 hover:text-primary"
                            }`}
                        >
                            Trang chủ
                        </button>

                        {/* Dropdown Sản phẩm */}
                        <div className="relative group">
                            <button className="text-gray-700 hover:text-primary py-2 px-1 inline-flex items-center">
                                Sản phẩm <i className="bi bi-chevron-down text-xs ml-1"></i>
                            </button>
                            <ul className="absolute hidden group-hover:block bg-white shadow-lg py-2 w-40 z-10 rounded-md">
                                {["Apple", "Samsung", "Xiaomi"].map((brand) => (
                                    <li key={brand}>
                                        <button
                                            className={`block px-4 py-2 w-full text-left ${
                                                isActive(brand)
                                                    ? "border-b-2 border-blue-600 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => ChuyenTrang(brand)}
                                        >
                                            {brand}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => ChuyenTrang("KhuyenMai")}
                            className={`py-2 px-1 ${
                                isActive("KhuyenMai")
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-gray-700 hover:text-primary"
                            }`}
                        >
                            Khuyến mãi
                        </button>

                        <button
                            onClick={() => ChuyenTrang("TinTuc")}
                            className={`py-2 px-1 ${
                                isActive("TinTuc")
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-gray-700 hover:text-primary"
                            }`}
                        >
                            Tin tức
                        </button>
                    </div>

                    {/* Icons và Buttons */}
                    <div className="flex items-center space-x-4">

                        {/* Search Desktop giữ nguyên */}
                        <div className="hidden xl:flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                            <input
                                type="search"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="py-1 px-3 text-sm focus:outline-none w-48 bg-transparent text-gray-800"
                            />
                            <button className="bg-primary bg-blue-700 text-white p-2 transition duration-200">
                                <i className="bi bi-search text-sm"></i>
                            </button>
                        </div>

                        {/* Cart Icon */}
                        <button 
                            className={`relative text-gray-700 hover:text-primary
                                        ${isActive("GioHang")
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-gray-700 hover:text-primary"}`}
                             onClick={() => ChuyenTrang("GioHang")}>
                            <i className="bi bi-cart3 text-xl"></i>
                            <span className="absolute top-0 right-0 -mt-1 -mr-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                2
                            </span>
                        </button>

                        {/* Search Icon Mobile */}
                        <button className="xl:hidden text-gray-700 hover:text-primary p-2">
                            <i className="bi bi-search text-xl"></i>
                        </button>

                        {/* Đăng nhập / Admin */}
                        <button
                            onClick={() => ChuyenTrang("DangNhap")}
                            className={` py-1 px-3 rounded-md border ${
                                isActive("DangNhap")
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-primary border-primary"
                            }`}
                        >
                            Đăng nhập
                        </button>
                        <button
                            onClick={() => ChuyenTrang("Admin")}
                            className={`hidden sm:inline-block py-1 px-3 rounded-md border ${
                                isActive("Admin")
                                    ? "border-b-2 border-blue-600 text-blue-700"
                                    : "text-primary border-primary"
                            }`}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary">
                        <i className="bi bi-list text-2xl"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
