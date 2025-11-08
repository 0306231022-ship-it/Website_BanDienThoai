import React from 'react';

// LỖI: Module not found: Error: Can't resolve '../../CSS/Website/AI_CONGNGHE.css'
// GIẢI PHÁP: Xóa dòng "import '../../CSS/Website/AI_CONGNGHE.css'"
//
// Lý do: Tất cả các style 'neon-blue', 'gradient-text', 'animate-glow', 'animate-float'
// đã được định nghĩa bên trong thẻ <style> dưới đây rồi.
// Việc import file .css bên ngoài là không cần thiết và gây ra lỗi nếu
// file đó không tồn Uhoặc
// đường dẫn bị sai.

function AI_CONGNGHE() {
    return (
        <>
            {/* BỔ SUNG STYLE NỘI TUYẾN
                Định nghĩa các màu "Neon" và class "gradient-text"
                mà file config Tailwind gốc không có.
            */}
            <style>{`
              :root {
                --neon-blue: #40C9FF;
                --neon-purple: #D462FF;
                --dark-bg: #0f172a;
              }
              .gradient-text {
                background-image: linear-gradient(to right, var(--neon-blue), var(--neon-purple));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
              .from-neon-blue {
                --tw-gradient-from: var(--neon-blue);
                --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(64, 201, 255, 0));
              }
              .to-neon-purple {
                --tw-gradient-to: var(--neon-purple);
              }
              .text-neon-blue {
                color: var(--neon-blue);
              }
              .border-neon-blue {
                border-color: var(--neon-blue);
              }
              .hover\\:text-neon-blue:hover {
                color: var(--neon-blue);
              }
              .hover\\:bg-neon-blue\\/10:hover {
                background-color: rgba(64, 201, 255, 0.1);
              }
              .shadow-neon-blue\\/20 {
                 box-shadow: 0 4px 14px 0 rgba(64, 201, 255, 0.2);
              }
              .hover\\:shadow-neon-blue\\/20:hover {
                 box-shadow: 0 4px 14px 0 rgba(64, 201, 255, 0.2);
              }
              .hover\\:shadow-neon-blue\\/30:hover {
                 box-shadow: 0 10px 20px 0 rgba(64, 201, 255, 0.3);
              }
              .blur-xl {
                 filter: blur(24px);
              }
              .text-dark-bg {
                color: var(--dark-bg);
              }
              .hover\\:border-neon-blue:hover {
                border-color: var(--neon-blue);
              }
              /* Định nghĩa animation 'glow' */
              @keyframes glow {
                0% { box-shadow: 0 0 20px rgba(64, 201, 255, 0.3); }
                100% { box-shadow: 0 0 30px rgba(212, 98, 255, 0.6); }
              }
              .animate-glow {
                animation: glow 2s ease-in-out infinite alternate;
              }
               /* Định nghĩa animation 'float' */
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }
            `}</style>
    
            {/* SỬA LỖI: Tất cả 'class' đã được đổi thành 'className' 
            */}
        

            <main>
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                                    <span className="gradient-text">Điện Thoại AI</span><br/>
                                    Tương Lai 2025
                                </h1>
                                <p className="text-xl text-gray-700 mb-8">
                                    Trải nghiệm công nghệ trí tuệ nhân tạo tiên tiến trong lòng bàn tay. 
                                    Điện thoại thông minh thế hệ mới với AI tích hợp toàn diện.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-gradient-to-r from-neon-blue to-neon-purple text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-neon-blue/30 transition-all">
                                        Khám Phá Ngay
                                    </button>
                                    <button className="border border-neon-blue text-neon-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-neon-blue/10 transition-all">
                                        Xem Demo AI
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <img 
                                    src="https://picsum.photos/600/400?random=1" 
                                    alt="Điện thoại AI cao cấp với màn hình cong và ánh sáng neon"
                                    className="rounded-2xl shadow-2xl animate-float"
                                    loading="lazy"
                                />
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-purple rounded-full blur-xl opacity-50"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-blue rounded-full blur-xl opacity-30"></div>
                            </div>
                        </div>
                    </div>
                </section>

            
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4 gradient-text">Công Nghệ AI Đột Phá</h2>
                            <p className="text-xl text-gray-600">Những tính năng thông minh định hình tương lai di động</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-4 group-hover:animate-glow">
                                    <i className="fas fa-brain text-2xl text-gray-800"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">AI Assistant Pro</h3>
                                <p className="text-gray-600">Trợ lý ảo thông minh học hỏi thói quen và tối ưu hóa trải nghiệm người dùng</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-4 group-hover:animate-glow">
                                    <i className="fas fa-camera text-2xl text-gray-800"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Camera AI Vision</h3>
                                <p className="text-gray-600">Hệ thống camera tích hợp AI nhận diện cảnh vật và tối ưu hóa hình ảnh thời gian thực</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-4 group-hover:animate-glow">
                                    <i className="fas fa-battery-full text-2xl text-gray-800"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Smart Battery AI</h3>
                                <p className="text-gray-600">AI quản lý pin thông minh, học tập thói quen sử dụng để tối ưu thời lượng</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-4 group-hover:animate-glow">
                                    <i className="fas fa-shield-alt text-2xl text-gray-800"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">AI Security</h3>
                                <p className="text-gray-600">Bảo mật nâng cao với AI nhận diện khuôn mặt và hành vi bất thường</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4 gradient-text">Sản Phẩm AI Hàng Đầu</h2>
                            <p className="text-xl text-gray-600">Những điện thoại thông minh tích hợp AI tiên tiến nhất</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="https://picsum.photos/400/300?random=2" 
                                        alt="Quantum AI Pro - Điện thoại AI cao cấp"
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-neon-blue to-neon-purple text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                        MỚI
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">Quantum AI Pro</h3>
                                    <p className="text-gray-600 mb-4">Chip AI Neural 8.0, Camera 200MP AI, Pin 5000mAh Smart</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-neon-blue">28.990.000₫</span>
                                        <span className="text-gray-500 line-through">32.990.000₫</span>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-gray-800 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-blue/20 transition-all">
                                        Thêm Vào Giỏ
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="https://picsum.photos/400/300?random=3" 
                                        alt="Neural Vision X - Điện thoại camera AI"
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">Neural Vision X</h3>
                                    <p className="text-gray-600 mb-4">Triple Camera AI 150MP, Màn hình OLED 120Hz, Chip AI 7.0</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-neon-blue">22.490.000₫</span>
                                        <span className="text-gray-500 line-through">25.990.000₫</span>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-gray-800 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-blue/20 transition-all">
                                        Thêm Vào Giỏ
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-neon-blue transition-all group">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="https://picsum.photos/400/300?random=4" 
                                        alt="Smart AI Lite - Điện thoại AI giá rẻ"
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 right-4 bg-red-500 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                        GIẢM 15%
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">Smart AI Lite</h3>
                                    <p className="text-gray-600 mb-4">Chip AI 5.0, Camera 108MP, Pin 4500mAh, Màn hình AMOLED</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-neon-blue">15.990.000₫</span>
                                        <span className="text-gray-500 line-through">18.790.000₫</span>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-gray-800 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-blue/20 transition-all">
                                        Thêm Vào Giỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6 gradient-text">Trải Nghiệm AI Thực Tế</h2>
                                <p className="text-xl text-gray-700 mb-8">
                                    Tương tác với trí tuệ nhân tạo ngay trên trình duyệt. 
                                    Trải nghiệm sức mạnh của công nghệ 2025.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-300">
                                        <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center">
                                            <i className="fas fa-microphone text-gray-800"></i>
                                        </div>
                                        <p className="text-gray-600">Nhấn để nói chuyện với AI Assistant</p>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-300">
                                        <div className="w-12 h-12 bg-neon-purple rounded-full flex items-center justify-center">
                                            <i className="fas fa-image text-gray-800"></i>
                                        </div>
                                        <p className="text-gray-600">Tải ảnh lên để AI phân tích và tối ưu hóa</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center animate-glow">
                                            <i className="fas fa-robot text-4xl text-gray-800"></i>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">AI Demo Center</h3>
                                        <p className="text-gray-200 mb-6">Trải nghiệm các tính năng AI tiên tiến</p>
                                        <button className="bg-white text-dark-bg px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
                                            Bắt Đầu Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-12 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">Nhận Tin Công Nghệ AI</h2>
                            <p className="text-xl text-gray-200 mb-8">Đăng ký để nhận thông tin mới nhất về điện thoại AI và công nghệ 2025</p>
                            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
                                <input 
                                    type="email" 
                                    placeholder="Nhập email của bạn..." 
                                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-neon-blue transition-all"
                                />
                                <button className="bg-gradient-to-r from-neon-blue to-neon-purple text-gray-800 px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-neon-blue/30 transition-all">
                                    Đăng Ký Ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};
export default AI_CONGNGHE;