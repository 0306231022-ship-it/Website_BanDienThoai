import { Link } from "react-router-dom";

// Cấu hình Tailwind CSS cho các màu tùy chỉnh
// Primary: Xanh đậm (Deep Indigo)
// Secondary: Vàng (Accent Yellow)


// Thành phần chính của ứng dụng
const SanPhamTrangChu = () => {
    // Để tích hợp cấu hình Tailwind CSS vào môi trường React đơn file
    // chúng ta chèn script config vào đầu trang (hoặc sử dụng global script)
    // Trong môi trường này, ta giả định config đã được load.

    // Nội dung component SanPhamTrangChu của bạn
    return (
        <>
          <div className="min-h-screen bg-gray-50">
            {/* Inject custom Tailwind config via a dangerouslySetInnerHTML block (for single-file environment) */}
        
            {/* Header Section */}
            <section id="home" className="bg-primary text-white py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <span className="text-secondary uppercase font-bold text-sm tracking-widest block mb-2">Công nghệ đỉnh cao trong tay bạn</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                            Khám Phá Thế Giới Điện Thoại <span className="text-secondary">Mới Nhất</span>
                        </h1>
                        <p className="text-lg mb-8 opacity-90 max-w-lg">
                            Tuyển chọn những mẫu smartphone cao cấp, hiệu năng vượt trội và thiết kế đột phá. Mua sắm ngay để nhận ưu đãi lớn!
                        </p>
                        <Link className="inline-block bg-secondary text-primary font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
                            Xem Sản Phẩm Ngay
                        </Link>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        {/* Placeholder ảnh điện thoại */}
                        <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gray-700 rounded-3xl shadow-2xl flex items-center justify-center relative transform rotate-3">
                            <svg className="w-3/4 h-3/4 text-gray-500 opacity-50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h10v16H7V4zm4 18a1 1 0 100-2 1 1 0 000 2z"></path></svg>
                            <span className="absolute text-2xl font-semibold text-white/90">Smartphone</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid Section (Bán chạy nhất) */}
            <section id="products" className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Sản Phẩm Bán Chạy Nhất</h2>
                    <p className="text-xl text-center text-gray-500 mb-12">Những lựa chọn được khách hàng yêu thích và đánh giá cao.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Product Card 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center border border-gray-100">
                            {/* Placeholder ảnh sản phẩm */}
                            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Galaxy Z Fold Pro</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">Galaxy Z Fold Pro</h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">Màn hình gập, 512GB</p>
                            <p className="text-3xl font-extrabold text-primary mb-6">39.990.000₫</p>
                            <button className="w-full bg-secondary text-primary-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-md">
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        {/* Product Card 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center border border-gray-100">
                            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">iPhone 16 Pro Max</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">iPhone 16 Pro Max</h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">Chip A18 Bionic, 256GB</p>
                            <p className="text-3xl font-extrabold text-primary mb-6">35.490.000₫</p>
                            <button className="w-full bg-secondary text-primary-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-md">
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        {/* Product Card 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center border border-gray-100">
                            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Xiaomi 15 Ultra</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">Xiaomi 15 Ultra</h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">Camera Leica, 1TB</p>
                            <p className="text-3xl font-extrabold text-primary mb-6">28.990.000₫</p>
                            <button className="w-full bg-secondary text-primary-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-md">
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        {/* Product Card 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center border border-gray-100">
                            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Oppo Find X7</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">Oppo Find X7</h3>
                            <p className="text-sm text-gray-500 mb-4 text-center">Sạc siêu nhanh, 12GB RAM</p>
                            <p className="text-3xl font-extrabold text-primary mb-6">19.500.000₫</p>
                            <button className="w-full bg-secondary text-primary-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-md">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link className="inline-block border-2 border-primary text-primary font-semibold py-3 px-8 rounded-xl hover:bg-primary hover:text-white transition duration-300 shadow-lg">
                            Xem tất cả sản phẩm
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section (Lý do chọn chúng tôi) */}
            <section id="featured" className="bg-primary py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Lý Do Khách Hàng Tin Tưởng PhoneStore</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">

                        {/* Feature 1 */}
                        <div className="text-center p-6 bg-primary/90 rounded-xl shadow-lg border border-white/20">
                            <svg className="w-10 h-10 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <h3 className="text-xl font-semibold mb-2">Giao Hàng Siêu Tốc</h3>
                            <p className="text-sm opacity-80">Nhận máy trong vòng 24 giờ tại các thành phố lớn.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6 bg-primary/90 rounded-xl shadow-lg border border-white/20">
                            <svg className="w-10 h-10 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.047 3.01 1.295 5.86 3.04 8.618a11.955 11.955 0 0114.13-14.13c1.745-2.758 2.993-5.608 3.04-8.618A12.001 12.001 0 0021.056 12z"></path></svg>
                            <h3 className="text-xl font-semibold mb-2">Bảo Hành 12 Tháng</h3>
                            <p className="text-sm opacity-80">Chính sách bảo hành chính hãng, 1 đổi 1 trong 30 ngày.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6 bg-primary/90 rounded-xl shadow-lg border border-white/20">
                            <svg className="w-10 h-10 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <h3 className="text-xl font-semibold mb-2">Thanh Toán Linh Hoạt</h3>
                            <p className="text-sm opacity-80">Hỗ trợ trả góp 0%, thanh toán qua nhiều hình thức.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="text-center p-6 bg-primary/90 rounded-xl shadow-lg border border-white/20">
                            <svg className="w-10 h-10 mx-auto mb-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            <h3 className="text-xl font-semibold mb-2">Hỗ Trợ 24/7</h3>
                            <p className="text-sm opacity-80">Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ kỹ thuật.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Đăng Ký Nhận Tin Tức & Khuyến Mãi</h2>
                    <p className="text-lg text-gray-600 mb-8">Đừng bỏ lỡ các ưu đãi độc quyền và thông tin sản phẩm mới nhất.</p>
                    <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                        {/* Đã sửa lỗi: Thêm dấu đóng / vào thẻ input */}
                        <input type="email" placeholder="Nhập địa chỉ email của bạn" className="flex-grow p-4 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary shadow-inner" />
                        <button className="bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md">
                            Đăng Ký Ngay
                        </button>
                    </div>
                </div>
            </section>
        </div>
        </>
      
    );
};

export default SanPhamTrangChu;