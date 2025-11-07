import { Link } from "react-router-dom";
function SanPham() {
    return (
       <>
           <section id="products" className="py-16 md:py-24 bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">
                    
             
                    <div className="lg:w-1/4 p-6 bg-white rounded-2xl shadow-xl h-fit hidden lg:block">
                        <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Bộ Lọc</h3>
                        <div className="mb-6">
                            <h4 className="font-semibold text-lg mb-3 flex justify-between items-center">
                                Hãng Sản Xuất
                            </h4>
                            <div className="space-y-2 text-gray-600">
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-primary rounded-md mr-2"/> Apple (12)
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-primary rounded-md mr-2"/> Samsung (15)
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-primary rounded-md mr-2"/> Xiaomi (8)
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-primary rounded-md mr-2"/> Oppo (5)
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-primary rounded-md mr-2"/> Khác (3)
                                </label>
                            </div>
                        </div>


                        <div className="mb-6 border-t pt-4">
                            <h4 className="font-semibold text-lg mb-3">Khoảng Giá (VNĐ)</h4>
                            <input type="range" min="1000000" max="50000000" value="20000000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-primary"/>
                            <p className="text-sm mt-2 text-center text-gray-500">Dưới 20.000.000</p>
                        </div>

                        <div className="mb-6 border-t pt-4">
                            <h4 className="font-semibold text-lg mb-3">RAM</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:opacity-80">8GB</span>
                                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">12GB</span>
                                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">16GB</span>
                                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300">24GB</span>
                            </div>
                        </div>

                        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition duration-300 mt-4">
                            Áp Dụng Lọc
                        </button>
                    </div>
                    
       
                    <div className="lg:w-3/4">
              
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
                            <p className="text-gray-600 mb-3 sm:mb-0">Hiển thị <span className="font-bold">1-9</span> trong <span className="font-bold">43</span> sản phẩm</p>
                            <div className="flex items-center space-x-3">
                                <label for="sort" className="text-sm font-medium text-gray-700">Sắp xếp theo:</label>
                                <select id="sort" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                    <option>Mới nhất</option>
                                    <option>Giá: Thấp đến Cao</option>
                                    <option>Giá: Cao đến Thấp</option>
                                    <option>Đánh giá</option>
                                </select>
                            </div>
                        </div>
                        
     
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            
             
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center relative">
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">HOT</span>
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">iPhone 16 Pro Max</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">256GB, Sierra Blue. Hàng chính hãng.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.9 (245 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">35.490.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                           
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center relative">
                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">MỚI</span>
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m7-2h3v8H7v-8h3m0 0V4m0 0h-4v16a2 2 0 002 2h6a2 2 0 002-2V4h-4z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">Galaxy Z Fold Pro</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Màn hình gập, 512GB, màu Đen.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.7 (189 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">39.990.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                           
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">Xiaomi 15 Ultra</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Camera Leica, 1TB. Hiệu năng khủng.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.8 (312 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">28.990.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                        
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">Oppo Find X7</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Sạc siêu nhanh, 12GB RAM, Xanh Ngọc.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.5 (98 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">19.500.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                       
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">Samsung S25 Ultra</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Chip Exynos 2500, 512GB, Đen.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.6 (150 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">32.990.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                      
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">iPhone SE (2025)</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Giá tốt, 128GB, màu Đỏ.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.4 (500 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">14.990.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">Google Pixel 10 Pro</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Camera AI đỉnh cao, 256GB.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.8 (99 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">25.500.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

             
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">Sony Xperia Z6</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Chống nước IP68, 512GB, Xanh rêu.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.3 (78 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">22.000.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>

                         
                            <div className="bg-white p-6 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-center">ROG Phone 9 Pro</h3>
                                <p className="text-sm text-gray-500 mb-4 text-center">Điện thoại chơi game, 16GB RAM.</p>
                                <div className="flex items-center mb-2">
                                    <span className="text-secondary mr-1">★</span> 4.9 (120 đánh giá)
                                </div>
                                <p className="text-3xl font-extrabold text-primary mb-6">29.990.000₫</p>
                                <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300">
                                    Mua Ngay
                                </button>
                            </div>
                        </div>

        
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2" aria-label="Pagination">
                                <Link to="" className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                                    Trước
                                </Link>
                                <Link to="" aria-current="page" className="z-10 px-4 py-2 text-sm font-medium text-primary border border-primary bg-blue-50 rounded-lg">
                                    1
                                </Link>
                                <Link to="" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                                    2
                                </Link>
                                <Link to="" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                                    3
                                </Link>
                                <Link to="" className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                                    Sau
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       </>
    );
};
export default SanPham;