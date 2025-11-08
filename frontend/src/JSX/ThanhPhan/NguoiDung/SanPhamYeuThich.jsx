function SanPhamYeuThich() {
    return (
        <>
            <main className="min-h-screen w-full bg-white font-inter py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                        Danh Sách Yêu Thích
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Sản phẩm 1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative">
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition">
                                <i className="fas fa-trash"></i>
                            </button>
                            <img src="https://picsum.photos/300/300?random=2" alt="Sản phẩm" className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-gray-900">AI Phone Pro 2025</h3>
                                <p className="text-xl font-bold text-primary-500 mt-2">12.990.000₫</p>
                                <button className="w-full mt-4 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>

                        {/* Sản phẩm 2 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative">
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition">
                                <i className="fas fa-trash"></i>
                            </button>
                            <img src="https://picsum.photos/300/300?random=4" alt="Sản phẩm" className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-gray-900">Eco Phone</h3>
                                <p className="text-xl font-bold text-primary-500 mt-2">8.490.000₫</p>
                                <button className="w-full mt-4 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>

                        {/* Sản phẩm 3 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative">
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition">
                                <i className="fas fa-trash"></i>
                            </button>
                            <img src="https://picsum.photos/300/300?random=3" alt="Sản phẩm" className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-gray-900">FoldMax Z</h3>
                                <p className="text-xl font-bold text-primary-500 mt-2">24.990.000₫</p>
                                <button className="w-full mt-4 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SanPhamYeuThich;
