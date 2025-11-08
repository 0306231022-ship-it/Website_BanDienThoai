const SanPhamTrangChu = () => {
    return (
        <>
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-400/20 text-accent-500 text-sm font-medium">
                            <i className="fas fa-leaf mr-2"></i>
                            Công Nghệ Bền Vững 2025
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-dark-900 leading-tight">
                            Tương Lai Di Động
                            <span className="text-primary-500">Đã Tới</span>
                        </h1>
                        <p className="text-xl text-dark-600 leading-relaxed">
                            Khám phá điện thoại thông minh thế hệ mới với AI tích hợp, thiết kế bền vững và trải nghiệm người dùng đột phá.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105">
                            Mua Ngay
                            </button>
                            <button className="border border-primary-500 text-primary-500 hover:bg-primary-50 px-8 py-4 rounded-lg font-medium transition-all">
                                <i className="fas fa-play mr-2"></i>
                                Xem Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img 
                            src="https://picsum.photos/600/400?random=1" 
                            alt="Điện thoại thông minh công nghệ AI 2025" 
                            className="w-full rounded-2xl shadow-2xl animate-float"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-6 animate-glow">
                            <div className="text-2xl font-bold text-primary-500">AI Pro</div>
                            <div className="text-sm text-dark-600">Trợ lý ảo thông minh</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

   
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        Xu Hướng Công Nghệ 2025
                    </h2>
                    <p className="text-xl text-dark-600 max-w-2xl mx-auto">
                        Các tính năng đột phá định hình tương lai của điện thoại thông minh
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-brain text-primary-500 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark-900 mb-2">AI Tích Hợp</h3>
                        <p className="text-dark-600">Trợ lý ảo thông minh, xử lý hình ảnh AI, tối ưu hóa hiệu suất</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-accent-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-recycle text-accent-500 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark-900 mb-2">Bền Vững</h3>
                        <p className="text-dark-600">Vật liệu tái chế, tiết kiệm năng lượng, thiết kế thân thiện môi trường</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-expand-alt text-primary-500 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark-900 mb-2">Màn Hình Gập</h3>
                        <p className="text-dark-600">Công nghệ màn hình linh hoạt, đa nhiệm hoàn hảo</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-bolt text-primary-500 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-dark-900 mb-2">Sạc Siêu Nhanh</h3>
                        <p className="text-dark-600">Sạc không dây 100W, pin sinh học, công nghệ tiết kiệm năng lượng</p>
                    </div>
                </div>
            </div>
        </section>


        <section className="py-16 bg-dark-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                            Sản Phẩm Nổi Bật
                        </h2>
                        <p className="text-dark-600">Điện thoại thông minh với công nghệ tiên tiến nhất</p>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">Tất Cả</button>
                        <button className="px-4 py-2 text-dark-600 hover:bg-white rounded-lg transition-colors">AI Series</button>
                        <button className="px-4 py-2 text-dark-600 hover:bg-white rounded-lg transition-colors">Foldable</button>
                        <button className="px-4 py-2 text-dark-600 hover:bg-white rounded-lg transition-colors">Eco Series</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=2" 
                                    alt="AI Phone Pro 2025 - Điện thoại AI cao cấp" 
                                    className="w-full rounded-xl mb-4"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-accent-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    Bền Vững
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">AI Phone Pro 2025</h3>
                            <p className="text-dark-600 text-sm mb-4">Trợ lý AI, camera 200MP, pin 2 ngày</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">12.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

    
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=3" 
                                    alt="FoldMax Z - Điện thoại màn hình gập" 
                                    className="w-full rounded-xl mb-4"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    Mới
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">FoldMax Z</h3>
                            <p className="text-dark-600 text-sm mb-4">Màn hình gập, đa nhiệm, thiết kế cao cấp</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">24.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=4" 
                                    alt="Eco Phone S - Điện thoại bền vững" 
                                    className="w-full rounded-xl mb-4"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-accent-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    Eco
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">Eco Phone S</h3>
                            <p className="text-dark-600 text-sm mb-4">Vật liệu tái chế, tiết kiệm năng lượng, thiết kế tối giản</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">8.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

        
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=5" 
                                    alt="AI Phone Lite - Điện thoại AI giá rẻ" 
                                    className="w-full rounded-xl mb-4"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    AI
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">AI Phone Lite</h3>
                            <p className="text-dark-600 text-sm mb-4">Trợ lý AI cơ bản, camera 108MP, pin 1.5 ngày</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">6.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
                            Trải Nghiệm AR
                            <span className="text-primary-500">Thực Tế Ảo</span>
                        </h2>
                        <p className="text-xl text-dark-600 leading-relaxed">
                                Trải nghiệm điện thoại trong không gian ảo với công nghệ AR. Xem sản phẩm từ mọi góc độ trước khi mua.
                            </p>
                            <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105">
                            <i className="fas fa-vr-cardboard mr-2"></i>
                            Khởi Động AR
                            </button>
                        </div>
                        <div className="relative">
                            <img 
                                src="https://picsum.photos/600/400?random=6" 
                                alt="Trải nghiệm thực tế ảo với điện thoại" 
                                className="w-full rounded-2xl shadow-xl"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end justify-center pb-8">
                                <div className="text-white text-center">
                                    <div className="text-2xl font-bold mb-2">AR Experience</div>
                                    <div className="text-sm">Quét mã QR để trải nghiệm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-primary-500">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Cập Nhật Công Nghệ Mới
                        </h2>
                        <p className="text-primary-100 text-xl mb-8">
                            Nhận thông tin mới nhất về điện thoại và công nghệ 2025
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Email của bạn..." 
                                className="flex-1 px-6 py-4 rounded-lg border-0 outline-none"
                            />
                            <button className="bg-white text-primary-500 hover:bg-primary-50 px-8 py-4 rounded-lg font-medium transition-all">
                            Đăng Ký Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
      
    );
};

export default SanPhamTrangChu;