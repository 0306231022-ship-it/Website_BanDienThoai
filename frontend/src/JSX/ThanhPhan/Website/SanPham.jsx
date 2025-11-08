import { Link } from "react-router-dom";
function SanPham() {
    return (
       <>
               
    
        <section className="bg-dark-50 py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-dark-900 mb-4">
                    Khám Phá Sản Phẩm
                </h1>
                <p className="text-xl text-dark-600 max-w-2xl mx-auto">
                    Tìm kiếm công nghệ di động tiên tiến nhất, được thiết kế cho tương lai.
                </p>
        
                <div className="flex flex-wrap justify-center space-x-2 mt-8">
                    <Link to="#" className="px-4 py-2 bg-primary-500 text-white rounded-lg">Tất Cả</Link>
                    <Link to="#ai-series" className="px-4 py-2 text-dark-600 hover:bg-white rounded-lg transition-colors">AI Series</Link>
                    <Link to="#foldable" className="px-4 py-2 text-dark-600 hover:bg-white rounded-lg transition-colors">Foldable</Link>
                    <Link to="#eco-series" className="px-4 py-2 text-dark-600 hover:bg-white rounded-lg transition-colors">Eco Series</Link>
                </div>
            </div>
        </section>


        <section id="ai-series" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        AI Series
                    </h2>
                    <p className="text-dark-600">Trí tuệ nhân tạo trong tầm tay bạn, tối ưu hóa mọi trải nghiệm.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=2" 
                                    alt="AI Phone Pro 2025" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
                                <div className="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    AI
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
                                    src="https://picsum.photos/300/300?random=5" 
                                    alt="AI Phone Lite" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
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
       
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=7" 
                                    alt="AI Vision Max" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
                                <div className="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    AI
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">AI Vision Max</h3>
                            <p className="text-dark-600 text-sm mb-4">Chuyên gia nhiếp ảnh AI, màn hình 8K</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">18.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    
        <section id="foldable" className="py-16 bg-dark-50">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        Foldable
                    </h2>
                    <p className="text-dark-600">Mở ra tương lai của màn hình gập, đa nhiệm không giới hạn.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=3" 
                                    alt="FoldMax Z" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
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
                                    src="https://picsum.photos/300/300?random=9" 
                                    alt="FoldMini" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
                                <div className="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    Mới
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">FoldMini</h3>
                            <p className="text-dark-600 text-sm mb-4">Thiết kế gập vỏ sò, nhỏ gọn, thời trang</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">21.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
   
        <section id="eco-series" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                        Eco Series
                    </h2>
                    <p className="text-dark-600">Công nghệ bền vững, thiết kế vì môi trường, hiệu năng ấn tượng.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="p-6">
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/300/300?random=4" 
                                    alt="Eco Phone S" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
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
                                    src="https://picsum.photos/300/300?random=11" 
                                    alt="Eco Pro" 
                                    className="w-full rounded-xl mb-4" loading="lazy" />
                                <div className="absolute top-4 left-4 bg-accent-500 text-white px-2 py-1 rounded text-sm font-medium">
                                    Eco
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-2">Eco Pro</h3>
                            <p className="text-dark-600 text-sm mb-4">Pin năng lượng mặt trời (thụ động), vỏ tre</p>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-primary-500">11.990.000₫</div>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       </>
    );
};
export default SanPham;