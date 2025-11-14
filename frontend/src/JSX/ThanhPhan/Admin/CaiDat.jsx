import { Link } from "react-router-dom";
function CaiDat() {

    return (
        <>
            <section id="section-settings" className="section" aria-label="Cài đặt website">

                <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Cài Đặt Website Cơ Bản</h2>
                    <div className="flex gap-3">
                        <Link
                            to="/admin/xemThongTin"
                            type="button"
                            className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold shadow-md transition"
                        >
                            <i className="fas fa-arrow-left mr-2"></i> Quay lại
                        </Link>

                        <button
                            type="submit"
                            className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition"
                            aria-label="Lưu cấu hình"
                        >
                            <i className="fas fa-save mr-2"></i> Lưu Cấu Hình
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-2xl border border-teal-100">
                    <form className="space-y-6">
                        <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100">1. Thông tin Chung</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên Website <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="site-name"
                                    placeholder="Ví dụ: Cửa hàng Di Động XYZ"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                                    defaultValue="Admin Store Pro"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Liên hệ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    placeholder="Ví dụ: info@yourwebsite.com"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                                    defaultValue="support@adminstore.vn"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ Trụ sở Chính
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Ví dụ: 123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                                    defaultValue="456 Đường Lạc Long Quân, P.10, Q.Tân Bình, TP.HCM"
                                />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100 mt-8">2. Liên kết Mạng xã hội</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="social-facebook" className="block text-sm font-medium text-gray-700 mb-2">
                                    <i className="fab fa-facebook-square text-blue-600 mr-2"></i> Link Facebook
                                </label>
                                <input
                                    type="url"
                                    id="social-facebook"
                                    placeholder="https://facebook.com/yourpage"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                                    defaultValue="https://facebook.com/adminstoreshop"
                                />
                            </div>

                            <div>
                                <label htmlFor="social-instagram" className="block text-sm font-medium text-gray-700 mb-2">
                                    <i className="fab fa-instagram text-pink-600 mr-2"></i> Link Instagram
                                </label>
                                <input
                                    type="url"
                                    id="social-instagram"
                                    placeholder="https://instagram.com/youraccount"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                                    defaultValue="https://instagram.com/adminstore_official"
                                />
                            </div>

                            <div>
                                <label htmlFor="social-zalo" className="block text-sm font-medium text-gray-700 mb-2">
                                    <i className="fas fa-phone-alt text-green-500 mr-2"></i> Hotline/Zalo
                                </label>
                                <input
                                    type="tel"
                                    id="social-zalo"
                                    placeholder="090 123 4567"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                                    defaultValue="0901234567"
                                />
                            </div>

                            <div>
                                <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 mb-2">
                                    <i className="fas fa-image text-gray-500 mr-2"></i> Cập nhật Logo
                                </label>
                                <input
                                    type="file"
                                    id="logo-upload"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        {/* Khu vực nút hành động */}
                        <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold shadow-md transition"
                            >
                                <i className="fas fa-times mr-2"></i> Hủy thay đổi
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-bold shadow-lg transition"
                            >
                                <i className="fas fa-upload mr-2"></i> Cập nhật và Lưu Thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default CaiDat;
