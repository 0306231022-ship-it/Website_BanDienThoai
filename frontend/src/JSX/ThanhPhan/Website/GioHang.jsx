
function GioHang() {
    return (
    <>

        <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 animate-fade-in-up-1">
                        <img 
                            src="https://picsum.photos/300/300?random=2" 
                            alt="AI Phone Pro 2025" 
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-dark-900">AI Phone Pro 2025</h3>
                            <p className="text-dark-600 text-sm">Trợ lý AI, camera 200MP</p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <button className="w-8 h-8 bg-dark-50 rounded-full text-dark-600 hover:bg-dark-100 transition-colors">-</button>
                            <span className="w-12 text-center font-medium text-dark-900 text-lg">1</span>
                            <button className="w-8 h-8 bg-dark-50 rounded-full text-dark-600 hover:bg-dark-100 transition-colors">+</button>
                        </div>
                        <div className="text-xl font-bold text-primary-500 w-36 text-center md:text-right flex-shrink-0">
                            12.990.000₫
                        </div>
                        <button className="text-dark-600 hover:text-red-500 transition-colors flex-shrink-0">
                            <i className="fas fa-trash-alt fa-lg"></i>
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 animate-fade-in-up-2">
                        <img 
                            src="https://picsum.photos/300/300?random=3" 
                            alt="FoldMax Z" 
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-dark-900">FoldMax Z</h3>
                            <p className="text-dark-600 text-sm">Màn hình gập, đa nhiệm</p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <button className="w-8 h-8 bg-dark-50 rounded-full text-dark-600 hover:bg-dark-100 transition-colors">-</button>
                            <span className="w-12 text-center font-medium text-dark-900 text-lg">1</span>
                            <button className="w-8 h-8 bg-dark-50 rounded-full text-dark-600 hover:bg-dark-100 transition-colors">+</button>
                        </div>
                        <div className="text-xl font-bold text-primary-500 w-36 text-center md:text-right flex-shrink-0">
                            24.990.000₫
                        </div>
                        <button className="text-dark-600 hover:text-red-500 transition-colors flex-shrink-0">
                            <i className="fas fa-trash-alt fa-lg"></i>
                        </button>
                    </div>

                    <div className="mt-8">
                        <a href="mobile-phone-ecommerce-2025.html" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                            <i className="fas fa-arrow-left mr-2"></i>
                            Tiếp tục mua sắm
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up-3">
                            <h2 className="text-2xl font-bold text-dark-900 mb-6">Tóm Tắt Đơn Hàng</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-dark-600">
                                    <span>Tạm tính (2 sản phẩm)</span>
                                    <span className="font-medium text-dark-900">37.980.000₫</span>
                                </div>
                                <div className="flex justify-between text-dark-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-medium text-accent-500">Miễn Phí</span>
                                </div>
                                
                                <div className="pt-4">
                                    <label for="promo" className="block text-sm font-medium text-dark-900 mb-2">Mã giảm giá</label>
                                    <div className="flex gap-2">
                                        <input type="text" id="promo" placeholder="Nhập mã của bạn..." className="flex-1 px-4 py-2 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                        <button className="bg-dark-800 text-white px-4 py-2 rounded-lg hover:bg-dark-900 transition-colors">Áp Dụng</button>
                                    </div>
                                </div>

                                <div className="border-t border-dark-100 my-4 pt-4"></div>
                                
                                <div className="flex justify-between text-xl font-bold text-dark-900">
                                    <span>Tổng cộng</span>
                                    <span className="text-primary-500">37.980.000₫</span>
                                </div>

                                <button className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105 animate-glow">
                                    Tiến Hành Thanh Toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
    );
};
export default GioHang;