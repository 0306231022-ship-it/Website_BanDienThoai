import React from 'react';

function HoTro() {
    return (
        <>
          <style>{`
            /* BỔ SUNG: Định nghĩa biến màu --eco-green và --dark-bg */
            :root {
              --eco-green: #10b981; /* Đây là màu green-500 của Tailwind */
              --dark-bg: #0f172a; /* Đây là màu dark-900 */
              --eco-teal: #0d9488; /* BỔ SUNG: Màu teal-700 cho hover */
            }
            .gradient-text {
                background: linear-gradient(45deg, var(--eco-green), var(--eco-teal));
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
            /* BỔ SUNG: Class cho màu hover eco-teal */
            .hover\\:text-eco-teal:hover {
              color: var(--eco-teal);
            }
            /* BỔ SUNG: Class animation cho icon (ví dụ) */
            .group-hover\\:animate-pulse-slow:hover {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .7; }
            }
          `}</style>
        <section id="support" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
        
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        <span className="gradient-text">Trung Tâm Hỗ Trợ</span><br/>
                        Luôn Đồng Hành Cùng Bạn
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Dịch vụ hỗ trợ 24/7 với AI thông minh và đội ngũ chuyên gia giàu kinh nghiệm
                    </p>
                </div>

                {/* SỬA LỖI: Cập nhật hover:text-eco-teal (giờ đã được định nghĩa) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-eco-green transition-all text-center group">
                        <div className="w-16 h-16 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                            <i className="fas fa-robot text-2xl text-gray-800"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Hỗ Trợ AI</h3>
                        <p className="text-gray-600 text-sm">Trợ lý ảo thông minh giải đáp 24/7</p>
                        <button className="mt-4 text-eco-green hover:text-eco-teal transition-colors font-medium">
                            Bắt Đầu Chat
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-eco-green transition-all text-center group">
                        <div className="w-16 h-16 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                            <i className="fas fa-phone-alt text-2xl text-gray-800"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Hotline</h3>
                        <p className="text-gray-600 text-sm">1800-1234 (Miễn phí)</p>
                        <button className="mt-4 text-eco-green hover:text-eco-teal transition-colors font-medium">
                            Gọi Ngay
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-eco-green transition-all text-center group">
                        <div className="w-16 h-16 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                            <i className="fas fa-store text-2xl text-gray-800"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Cửa Hàng</h3>
                        <p className="text-gray-600 text-sm">Hệ thống 50+ cửa hàng toàn quốc</p>
                        <button className="mt-4 text-eco-green hover:text-eco-teal transition-colors font-medium">
                            Tìm Cửa Hàng
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-eco-green transition-all text-center group">
                        <div className="w-16 h-16 bg-eco-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                            <i className="fas fa-tools text-2xl text-gray-800"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Sửa Chữa</h3>
                        <p className="text-gray-600 text-sm">Dịch vụ sửa chữa chuyên nghiệp</p>
                        <button className="mt-4 text-eco-green hover:text-eco-teal transition-colors font-medium">
                            Đặt Lịch
                        </button>
                    </div>
                </div>

                
                <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Câu Hỏi Thường Gặp</h2>
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <div className="border-b border-gray-300 pb-4">
                            <button className="flex justify-between items-center w-full text-left font-semibold text-lg hover:text-eco-green transition-colors">
                                <span>Làm thế nào để tham gia chương trình đổi cũ lấy mới?</span>
                                <i className="fas fa-chevron-down text-eco-green"></i>
                            </button>
                            <div className="mt-2 text-gray-600">
                                Bạn có thể mang điện thoại cũ đến bất kỳ cửa hàng TechVision nào để được đánh giá và nhận ưu đãi. Hoặc sử dụng dịch vụ thu hồi tận nơi qua ứng dụng của chúng tôi.
                            </div>
                        </div>
                        <div className="border-b border-gray-300 pb-4">
                            <button className="flex justify-between items-center w-full text-left font-semibold text-lg hover:text-eco-green transition-colors">
                                <span>Thời gian bảo hành sản phẩm là bao lâu?</span>
                                <i className="fas fa-chevron-down text-eco-green"></i>
                            </button>
                            <div className="mt-2 text-gray-600">
                                Tất cả sản phẩm TechVision được bảo hành chính hãng 24 tháng cho phần cứng và 12 tháng cho pin. Dịch vụ bảo hành mở rộng có sẵn.
                            </div>
                        </div>
                        <div className="border-b border-gray-300 pb-4">
                            <button className="flex justify-between items-center w-full text-left font-semibold text-lg hover:text-eco-green transition-colors">
                                <span>Có dịch vụ sửa chữa tại nhà không?</span>
                                <i className="fas fa-chevron-down text-eco-green"></i>
                            </button>
                            <div className="mt-2 text-gray-600">
                                Có, chúng tôi cung cấp dịch vụ sửa chữa tại nhà tại các thành phố lớn. Đặt lịch qua ứng dụng hoặc hotline 1800-1234.
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* SỬA LỖI: Chữ tối trên nền tối */}
                <div className="bg-gradient-to-r from-green-900 to-teal-900 rounded-2xl p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            {/* SỬA LỖI: Thêm className="text-white" */}
                            <h2 className="text-4xl font-bold text-white mb-6">Liên Hệ Với Chúng Tôi</h2>
                            <p className="text-xl text-gray-200 mb-8">
                                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center">
                                        <i className="fas fa-clock text-gray-800"></i>
                                    </div>
                                    <div>
                                        {/* SỬA LỖI: Thêm className="text-gray-100" */}
                                        <div className="font-semibold text-gray-100">Thời Gian Làm Việc</div>
                                        {/* SỬA LỖI: Đổi text-gray-700 (tối) -> text-gray-300 (sáng) */}
                                        <div className="text-gray-300">24/7 - Hỗ trợ qua AI và Hotline</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center">
                                        <i className="fas fa-envelope text-gray-800"></i>
                                    </div>
                                    <div>
                                        {/* SỬA LỖI: Thêm className="text-gray-100" */}
                                        <div className="font-semibold text-gray-100">Email Hỗ Trợ</div>
                                        {/* SỬA LỖI: Đổi text-gray-700 (tối) -> text-gray-300 (sáng) */}
                                        <div className="text-gray-300">support@techvision.vn</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-gray-200 mb-2">Họ và Tên</label>
                                    {/* SỬA LỖI: Đổi text-gray-800 (tối) -> text-white (sáng) */}
                                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-eco-green transition-all"/>
                                </div>
                                <div>
                                    <label className="block text-gray-200 mb-2">Email</label>
                                    {/* SỬA LỖI: Đổi text-gray-800 (tối) -> text-white (sáng) */}
                                    <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-eco-green transition-all"/>
                                </div>
                                <div>
                                    <label className="block text-gray-200 mb-2">Tin Nhắn</label>
                                    {/* SỬA LỖI: Đổi text-gray-800 (tối) -> text-white (sáng) */}
                                    <textarea rows="4" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-eco-green transition-all"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-eco-green text-gray-800 py-4 rounded-xl font-semibold hover:bg-opacity-80 transition-all">
                                    Gửi Tin Nhắn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    );
};
export default HoTro;