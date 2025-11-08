import React from 'react';

function BenVung() {
    return (
        <>
          <style>{`
            /* BỔ SUNG: Định nghĩa biến màu --eco-green và --dark-bg */
            :root {
              --eco-green: #10b981; /* Đây là màu green-500 của Tailwind */
              --dark-bg: #0f172a; /* Đây là màu dark-900 */
            }
            .gradient-text {
                background: linear-gradient(45deg, var(--eco-green), #0d9488);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .eco-glow {
                box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
            }
            /* BỔ SUNG: Các class để sử dụng màu --eco-green */
            .text-eco-green {
              color: var(--eco-green);
            }
            .bg-eco-green {
              background-color: var(--eco-green);
            }
            .hover\\:border-eco-green:hover {
              border-color: var(--eco-green);
            }
            .text-dark-bg {
              color: var(--dark-bg);
            }
          `}</style>
            <section id="sustainability" className="py-16">
                <div className="container mx-auto px-4">
        
                    <div className="text-center mb-16">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            <span className="gradient-text">Tương Lai Bền Vững</span><br/>
                            Cùng TechVision
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Cam kết của chúng tôi về môi trường và trách nhiệm xã hội trong từng sản phẩm công nghệ
                        </p>
                    </div>

        
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-eco-green transition-all group text-center">
                            <div className="w-20 h-20 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:eco-glow transition-all">
                                <i className="fas fa-recycle text-3xl text-gray-800"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Vật Liệu Tái Chế</h3>
                            <p className="text-gray-600">Sử dụng 85% vật liệu tái chế trong sản xuất vỏ máy và phụ kiện</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-eco-green transition-all group text-center">
                            <div className="w-20 h-20 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:eco-glow transition-all">
                                <i className="fas fa-leaf text-3xl text-gray-800"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Năng Lượng Xanh</h3>
                            <p className="text-gray-600">Nhà máy sản xuất sử dụng 100% năng lượng tái tạo</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-eco-green transition-all group text-center">
                            <div className="w-20 h-20 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:eco-glow transition-all">
                                <i className="fas fa-truck text-3xl text-gray-800"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Vận Chuyển Xanh</h3>
                            <p className="text-gray-600">Giảm 60% khí thải carbon trong chuỗi cung ứng và vận chuyển</p>
                        </div>
                    </div>

    
                    <div className="bg-gradient-to-r from-green-900 to-teal-900 rounded-2xl p-12 mb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-6">Chương Trình Tái Chế</h2>
                                <p className="text-xl text-gray-200 mb-6">
                                    Thu hồi và tái chế điện thoại cũ. Nhận ưu đãi lên đến 3 triệu đồng khi đổi máy cũ lấy máy mới.
                                </p>
                                <ul className="space-y-3 text-gray-200 mb-8">
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-eco-green mr-3"></i>
                                        Xử lý an toàn chất thải điện tử
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-eco-green mr-3"></i>
                                        Tái chế 99% linh kiện có thể tái sử dụng
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-check-circle text-eco-green mr-3"></i>
                                        Bảo vệ dữ liệu người dùng tuyệt đối
                                    </li>
                                </ul>
                                <button className="bg-white text-dark-bg px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
                                    Tham Gia Ngay
                                </button>
                            </div>
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/500/400?random=5" 
                                    alt="Chương trình tái chế điện thoại thân thiện môi trường"
                                    className="rounded-2xl shadow-2xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

       
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Thành Tựu Bền Vững 2024</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            <div className="p-6">
                                <div className="text-4xl font-bold text-eco-green mb-2">85%</div>
                                <div className="text-gray-600">Vật liệu tái chế</div>
                            </div>
                            <div className="p-6">
                                <div className="text-4xl font-bold text-eco-green mb-2">60%</div>
                                <div className="text-gray-600">Giảm khí thải carbon</div>
                            </div>
                            <div className="p-6">
                                <div className="text-4xl font-bold text-eco-green mb-2">50K+</div>
                                <div className="text-gray-600">Điện thoại tái chế</div>
                            </div>
                            <div className="p-6">
                                <div className="text-4xl font-bold text-eco-green mb-2">100%</div>
                                <div className="text-gray-600">Năng lượng tái tạo</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
};
export default BenVung;