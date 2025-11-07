import { useUI } from "../../../REDUCER/TrangChuWeb";
import { Link } from "react-router-dom";

function Menu() {
    const { dispatch } = useUI();

    // Giả sử số lượng sản phẩm trong giỏ (bạn có thể lấy từ context, cookie, API,...)
    const cartCount = 3; 

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">

                <div className="flex items-center w-full lg:w-auto">
                    <Link to="" className="text-2xl font-bold text-primary flex items-center mr-6 flex-shrink-0">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Phone<span className="text-secondary">Store</span>
                    </Link>

                    <nav className="hidden lg:flex space-x-6 text-lg mr-8 flex-shrink-0">
                        <Link onClick={() => dispatch({ type: "SHOW_HOME" })} className="hover:text-primary transition duration-300">Trang chủ</Link>
                        <Link onClick={() => dispatch({ type: "SHOW_PRODUCTS" })} className="hover:text-primary transition duration-300">Sản phẩm</Link>
                        <Link onClick={() => dispatch({ type: "SHOW_NOIBAT" })} className="hover:text-primary transition duration-300">Nổi bật</Link>
                        <Link onClick={() => dispatch({ type: "SHOW_TINTUC" })} className="hover:text-primary transition duration-300">Tin tức</Link>
                        <Link onClick={() => dispatch({ type: "SHOW_LIENHE" })} className="hover:text-primary transition duration-300">Liên hệ</Link>
                    </nav>

                    <div className="hidden md:flex items-center border border-gray-200 rounded-full px-4 py-2 shadow-sm focus-within:border-primary transition duration-300 w-full max-w-sm">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Tìm kiếm sản phẩm..." className="focus:outline-none w-full text-sm bg-transparent" />
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 ml-4">

                    {/* Nút tìm kiếm mobile */}
                    <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300 md:hidden" title="Tìm kiếm">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Giỏ hàng */}
                    <button onClick={() => dispatch({ type: "SHOW_GIOHANG" })} className="relative p-2 rounded-full hover:bg-gray-100 transition duration-300" title="Giỏ hàng">
                        {/* Biểu tượng */}
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 010 2a2 2 0 010-4m-8 2a2 2 0 010 2a2 2 0 010-4" />
                        </svg>

                        {/* Số lượng sản phẩm */}
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Tài khoản */}
                    <Link to="/TrangChuND" className="p-2 rounded-full hover:bg-gray-100 transition duration-300" title="Tài khoản">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>

                    {/* Admin */}
                    <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300" title="Khu vực Admin">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>

                    {/* Menu mobile */}
                    <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300 lg:hidden" title="Menu">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Menu;
