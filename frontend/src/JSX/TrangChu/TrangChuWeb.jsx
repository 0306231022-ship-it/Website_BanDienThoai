import '../../CSS/TrangChuWeb.css';
import { Link } from 'react-router-dom';

function TrangChuWeb() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container">
            <Link className="navbar-brand fs-4" to="">
              <i className="bi bi-phone-vibrate-fill"></i> TechZone
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="">Trang chủ</Link>
                </li>
                <li className="nav-item dropdown">
                  {/* === THAY ĐỔI Ở ĐÂY === */}
                  {/* Đổi Link thành a để Bootstrap Dropdown hoạt động chính xác */}
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Sản phẩm</a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="">Apple</Link></li>
                    <li><Link className="dropdown-item" to="">Samsung</Link></li>
                    <li><Link className="dropdown-item" to="">Xiaomi</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/khuyen-mai">Khuyến mãi</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="">Tin tức</Link>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                <Link to="" className="nav-link me-3 position-relative">
                  <i className="bi bi-cart3 fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
                </Link>
                <Link to="" className="nav-link me-3">
                  <i className="bi bi-person-circle fs-5"></i>
                </Link>
                <Link to="" className="btn btn-outline-primary me-2">Đăng nhập</Link>
                <Link to="" className="btn btn-primary">Đăng ký</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-banner">
          <div className="container">
            <h1>Sắm đồ công nghệ, giá siêu hời</h1>
            <p className="lead">Khám phá ngay những mẫu điện thoại mới nhất</p>
            <Link to="" className="btn btn-primary btn-lg">Mua sắm ngay</Link>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5 fw-bold">🔥 SẢN PHẨM BÁN CHẠY NHẤT</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              
              <div className="col">
                <div className="card h-100 product-card">
                  <img src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" className="card-img-top" alt="iPhone 15 Pro Max"/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">iPhone 15 Pro Max 256GB</h5>
                    <div className="mt-auto">
                      <p className="product-price">28.990.000₫ <span className="old-price">34.990.000₫</span></p>
                      <Link to="" className="btn btn-primary w-100">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100 product-card">
                  <img src="https://cdn.tgdd.vn/Products/Images/42/283818/samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg" className="card-img-top" alt="Samsung Galaxy S23 Ultra"/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Samsung Galaxy S23 Ultra 5G</h5>
                    <div className="mt-auto">
                      <p className="product-price">21.990.000₫ <span className="old-price">31.990.000₫</span></p>
                      <Link to="" className="btn btn-primary w-100">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col">
                <div className="card h-100 product-card">
                  <img src="https://cdn.tgdd.vn/Products/Images/42/313431/xiaomi-13t-pro-thumb-xanh-600x600.jpg" className="card-img-top" alt="Xiaomi 13T Pro"/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Xiaomi 13T Pro 5G</h5>
                    <div className="mt-auto">
                      <p className="product-price">15.990.000₫</p>
                      <Link to="" className="btn btn-primary w-100">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100 product-card">
                  <img src="https://cdn.tgdd.vn/Products/Images/42/289662/oppo-reno10-thumb-blue-600x600.jpg" className="card-img-top" alt="OPPO Reno10"/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">OPPO Reno10 5G 256GB</h5>
                    <div className="mt-auto">
                      <p className="product-price">9.490.000₫</p>
                      <Link to="" className="btn btn-primary w-100">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5 fw-bold">THƯƠNG HIỆU HÀNG ĐẦU</h2>
            <div className="row align-items-center justify-content-center text-center g-4">
              <div className="col-lg-2 col-md-4 col-6 brand-logo"><img src="https://cdn.worldvectorlogo.com/logos/apple-11.svg" alt="Apple" className="img-fluid"/></div>
              <div className="col-lg-2 col-md-4 col-6 brand-logo"><img src="https://cdn.worldvectorlogo.com/logos/samsung-5.svg" alt="Samsung" className="img-fluid"/></div>
              <div className="col-lg-2 col-md-4 col-6 brand-logo"><img src="https://cdn.worldvectorlogo.com/logos/xiaomi-2.svg" alt="Xiaomi" className="img-fluid"/></div>
              <div className="col-lg-2 col-md-4 col-6 brand-logo"><img src="https://cdn.worldvectorlogo.com/logos/oppo-logo.svg" alt="Oppo" className="img-fluid"/></div>
              <div className="col-lg-2 col-md-4 col-6 brand-logo"><img src="https://cdn.worldvectorlogo.com/logos/vivo-1.svg" alt="Vivo" className="img-fluid"/></div>
              <div className="col-lg-2 col-md-4 col-6 brand-logo"><img src="https://cdn.worldvectorlogo.com/logos/realme-1.svg" alt="Realme" className="img-fluid"/></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer pt-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="text-white mb-3">TechZone</h5>
              <p>Chuyên cung cấp các sản phẩm điện thoại thông minh chính hãng với giá tốt nhất thị trường, cùng dịch vụ hậu mãi chu đáo.</p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="text-white mb-3">Liên kết</h5>
              <ul className="list-unstyled">
                <li><Link to="">Sản phẩm</Link></li>
                <li><Link to="">Giới thiệu</Link></li>
                <li><Link to="">Liên hệ</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-white mb-3">Chính sách</h5>
              <ul className="list-unstyled">
                <li><Link to="">Chính sách bảo hành</Link></li>
                <li><Link to="">Chính sách đổi trả</Link></li>
                <li><Link to="">Chính sách giao hàng</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-white mb-3">Kết nối với chúng tôi</h5>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-tiktok"></i></a>
              </div>
            </div>
          </div>
          <hr className="bg-secondary"/>
          <div className="text-center">
            <p>&copy; 2025 TechZone. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default TrangChuWeb;
