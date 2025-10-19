function SanPhamTrangChu(){
    const featuredProducts = [
        {
            name: "iPhone 15 Pro Max 256GB",
            currentPrice: "28.990.000₫",
            oldPrice: "34.990.000₫",
            imageUrl: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
            link: "chi-tiet-san-pham.html"
        },
        {
            name: "Samsung Galaxy S23 Ultra 5G",
            currentPrice: "21.990.000₫",
            oldPrice: "31.990.000₫",
            imageUrl: "https://cdn.tgdd.vn/Products/Images/42/283818/samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg",
            link: "chi-tiet-san-pham.html"
        },
        {
            name: "Xiaomi 13T Pro 5G",
            currentPrice: "15.990.000₫",
            oldPrice: null,
            imageUrl: "https://cdn.tgdd.vn/Products/Images/42/313431/xiaomi-13t-pro-thumb-xanh-600x600.jpg",
            link: "chi-tiet-san-pham.html"
        },
        {
            name: "OPPO Reno10 5G 256GB",
            currentPrice: "9.490.000₫",
            oldPrice: null,
            imageUrl: "https://cdn.tgdd.vn/Products/Images/42/289662/oppo-reno10-thumb-blue-600x600.jpg",
            link: "chi-tiet-san-pham.html"
        },
    ];

    const brands = [
        { name: "Apple", logoUrl: "https://cdn.worldvectorlogo.com/logos/apple-11.svg" },
        { name: "Samsung", logoUrl: "https://cdn.worldvectorlogo.com/logos/samsung-5.svg" },
        { name: "Xiaomi", logoUrl: "https://cdn.worldvectorlogo.com/logos/xiaomi-2.svg" },
        { name: "Oppo", logoUrl: "https://cdn.worldvectorlogo.com/logos/oppo-logo.svg" },
        { name: "Vivo", logoUrl: "https://cdn.worldvectorlogo.com/logos/vivo-1.svg" },
        { name: "Realme", logoUrl: "https://cdn.worldvectorlogo.com/logos/realme-1.svg" },
    ];

    const ProductCard = ({ product }) => (
        <div className="col">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col product-card hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100">
                <img src={product.imageUrl} className="w-full" alt={product.name} />
                <div className="p-4 flex flex-col flex-grow">
                    <h5 className="text-lg font-semibold mb-2">{product.name}</h5>
                    <div className="mt-auto">
                        <p className="text-2xl font-bold text-blue-600 mb-3">
                            {product.currentPrice}
                            {product.oldPrice && (
                                <span className="text-base font-normal text-gray-500 line-through ml-2">{product.oldPrice}</span>
                            )}
                        </p>
                        <a href={product.link} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        </div>
    );

    return(
        <>
                 {/* Hero Banner */}
                <section className="hero-banner flex items-center justify-center text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">Sắm đồ công nghệ, giá siêu hời</h1>
                        <p className="text-xl sm:text-2xl mb-8 text-white">Khám phá ngay những mẫu điện thoại mới nhất</p>
                        <a href="#" className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 inline-block bg-blue-600">Mua sắm ngay</a>
                    </div>
                </section>

                {/* Sản phẩm bán chạy nhất */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">🔥 SẢN PHẨM BÁN CHẠY NHẤT</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* --- */}

                {/* Thương hiệu hàng đầu */}
                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">THƯƠNG HIỆU HÀNG ĐẦU</h2>
                        <div className="flex flex-wrap justify-center items-center -mx-4">
                            {brands.map((brand, index) => (
                                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-4 mb-8 brand-logo text-center">
                                    <img src={brand.logoUrl} alt={brand.name} className="max-h-12 mx-auto transition duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
        </>
    )
}
export default SanPhamTrangChu;