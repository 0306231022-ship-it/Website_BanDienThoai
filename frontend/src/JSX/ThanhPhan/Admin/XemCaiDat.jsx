//Tạm thời xong nhiệm vụ
import { Link } from "react-router-dom";
import {useAppContext} from '../../../CONTEXT/TrangChuAdmin';
function XemThongTinWebsite() {
    const { TTwebsite } = useAppContext();
    return (
        <>
            <section id="section-view-settings" className="section" aria-label="Xem thông tin website">
                <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Thông Tin Website</h2>
                    <Link 
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition"
                        aria-label="Chỉnh sửa cấu hình"
                        to="/admin/CaiDat/caidatwebsite"
                    >
                        <i className="fas fa-edit mr-2"></i> Chỉnh Sửa
                    </Link>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-100 space-y-8">
                    {/* Thông tin chung */}
                    <div>
                        <h3 className="text-xl font-bold text-blue-700 pb-2 border-b border-gray-100">1. Thông tin Chung</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Tên Website</p>
                                <p className="text-lg font-semibold text-gray-900">{TTwebsite.TenWebsite}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email Liên hệ</p>
                                <p className="text-lg font-semibold text-gray-900">{TTwebsite.Email}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500 mb-1">Địa chỉ Trụ sở Chính</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {TTwebsite.DiaChi}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Liên kết mạng xã hội */}
                    <div>
                        <h3 className="text-xl font-bold text-blue-700 pb-2 border-b border-gray-100">2. Liên kết Mạng xã hội</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    <i className="fab fa-facebook-square text-blue-600 mr-2"></i>Facebook
                                </p>
                                <Link 
                                    to={`${TTwebsite.LinkFacebook}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-teal-600 font-semibold hover:underline"
                                >
                                   {TTwebsite.LinkFacebook}
                                </Link>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    <i className="fab fa-instagram text-pink-600 mr-2"></i>Instagram
                                </p>
                                <Link 
                                    to={`${TTwebsite.LinkInstagram}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-teal-600 font-semibold hover:underline"
                                >
                                    {TTwebsite.LinkInstagram}
                                </Link>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    <i className="fas fa-phone-alt text-green-500 mr-2"></i>Hotline/Zalo
                                </p>
                                <p className="text-lg font-semibold text-gray-900">{TTwebsite.Zalo}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    <i className="fas fa-image text-gray-500 mr-2"></i>Logo Hiện tại
                                </p>
                                <img 
                                    src={`http://localhost:3001${TTwebsite.LoGo}`} 
                                    alt="Logo Website" 
                                    className="w-40 h-40 object-contain rounded-lg border border-gray-200 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default XemThongTinWebsite;
