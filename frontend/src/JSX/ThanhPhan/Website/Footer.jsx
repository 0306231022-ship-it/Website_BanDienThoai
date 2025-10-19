import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Cột 1: TechZone */}
                    <div className="space-y-3">
                        <h5 className="text-white text-xl font-bold mb-4">TechZone</h5>
                        <p>Chuyên cung cấp các sản phẩm điện thoại thông minh chính hãng với giá tốt nhất thị trường, cùng dịch vụ hậu mãi chu đáo.</p>

                        <div className="space-y-2 mt-2">
                            <p className="flex items-start">
                                <span className="mr-3 mt-1 text-blue-500 text-xl">📍</span>
                                <span><strong>Địa chỉ:</strong> Tòa nhà TechZone, 123 Đường Công Nghệ, Quận Thủ Đức, TP. HCM</span>
                            </p>
                            <p className="flex items-center">
                                <span className="mr-3 text-blue-500 text-xl">📞</span>
                                <span><strong>Điện thoại:</strong> (028) 123 4567 - 0987 654 321</span>
                            </p>
                            <p className="flex items-center">
                                <span className="mr-3 text-blue-500 text-xl">✉️</span>
                                <span><strong>Email:</strong> support@techzone.vn</span>
                            </p>
                        </div>
                    </div>

                    {/* Cột 2: Liên kết */}
                    <div>
                        <h5 className="text-white text-xl font-bold mb-4">Liên kết</h5>
                        <ul className="space-y-2">
                            {['Sản phẩm', 'Giới thiệu', 'Liên hệ', 'Tin tức'].map((link, idx) => (
                                <li key={idx}>
                                    <a href="#" className="hover:text-white transition duration-200">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách */}
                    <div>
                        <h5 className="text-white text-xl font-bold mb-4">Chính sách</h5>
                        <ul className="space-y-2">
                            {['Chính sách bảo hành', 'Chính sách đổi trả', 'Chính sách giao hàng', 'Quy định bảo mật'].map((policy, idx) => (
                                <li key={idx}>
                                    <a href="#" className="hover:text-white transition duration-200">{policy}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 4: Kết nối */}
                    <div>
                        <h5 className="text-white text-xl font-bold mb-4">Kết nối với chúng tôi</h5>
                        <div className="flex space-x-4 mt-2">
                            {[
                                { name: 'Facebook', icon: '📘' },
                                { name: 'Instagram', icon: '📸' },
                                { name: 'TikTok', icon: '🎵' },
                                { name: 'Zalo', icon: '💬' }
                            ].map((social, idx) => (
                                <a key={idx} href="#" aria-label={social.name} className="text-gray-400 hover:text-white transition duration-200 text-2xl">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                <hr className="border-gray-700 my-8" />

                <div className="text-center text-gray-500">
                    <p>&copy; 2025 TechZone. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
