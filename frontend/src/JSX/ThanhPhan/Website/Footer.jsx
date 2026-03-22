import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../CONTEXT/TrangChuAdmin';

function Footer() {
    const { GetTTwebsite, TTwebsite } = useAppContext();

    useEffect(() => {
        GetTTwebsite();
    }, []);

    return (
        <footer className="bg-[#0a0a0a] text-gray-400 py-16 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-1 bg-white/5 rounded-xl border border-white/10 shadow-2xl">
                                <img 
                                    src={`http://localhost:3001/${TTwebsite.LoGo}`} 
                                    alt="Logo" 
                                    className="w-10 h-10 rounded-lg object-cover shadow-inner" 
                                />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter uppercase">
                                {TTwebsite.TenWebsite}
                            </span>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Đi đầu trong công nghệ di động với các sản phẩm AI, bền vững và đột phá. Chúng tôi kiến tạo tương lai số qua từng thiết bị.
                        </p>
                        <div className="flex space-x-3">
                            {[
                                { link: TTwebsite.LinkFacebook, icon: 'fab fa-facebook-f' },
                                { link: '#', icon: 'fab fa-twitter' },
                                { link: TTwebsite.LinkInstagram, icon: 'fab fa-instagram' },
                                { link: '#', icon: 'fab fa-youtube' }
                            ].map((social, index) => (
                                <Link 
                                    key={index}
                                    to={social.link} 
                                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                                >
                                    <i className={social.icon}></i>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Products Links */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-1 after:bg-blue-600 after:rounded-full">
                            Sản Phẩm
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {['AI Series', 'Foldable', 'Eco Series', 'Phụ Kiện'].map((item) => (
                                <li key={item}>
                                    <Link to="" className="hover:text-blue-500 hover:translate-x-2 flex items-center transition-all duration-300 group">
                                        <span className="w-0 h-[1px] bg-blue-500 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-1 after:bg-blue-600 after:rounded-full">
                            Hỗ Trợ
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {['Trung Tâm Hỗ Trợ', 'Bảo Hành', 'Hướng Dẫn Mua Hàng', 'Liên Hệ'].map((item) => (
                                <li key={item}>
                                    <Link to="" className="hover:text-blue-500 hover:translate-x-2 flex items-center transition-all duration-300 group">
                                        <span className="w-0 h-[1px] bg-blue-500 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-1 after:bg-blue-600 after:rounded-full">
                            Liên Hệ
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start group">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                                    <i className="fas fa-map-marker-alt text-blue-500 group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <span className="flex-1 group-hover:text-white transition-colors">{TTwebsite.DiaChi}</span>
                            </div>
                            <div className="flex items-center group">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                                    <i className="fas fa-phone text-blue-500 group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <span className="group-hover:text-white transition-colors font-semibold uppercase">{TTwebsite.Zalo}</span>
                            </div>
                            <div className="flex items-center group">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                                    <i className="fas fa-envelope text-blue-500 group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <span className="group-hover:text-white transition-colors underline decoration-blue-500/30 underline-offset-4">{TTwebsite.Email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase">
                    <p className="text-gray-600 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} <span className="text-white font-bold">{TTwebsite.TenWebsite}</span>. Đã đăng ký bản quyền.
                    </p>
                    <div className="flex space-x-6 text-gray-600">
                        <Link to="" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
                        <Link to="" className="hover:text-white transition-colors">Điều khoản dịch vụ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
