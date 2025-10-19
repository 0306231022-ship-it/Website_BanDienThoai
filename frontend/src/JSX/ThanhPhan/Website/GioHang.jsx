import React from 'react';

const ShoppingCart = () => {
    const cartItems = [
        {
            name: "iPhone 15 Pro Max 256GB",
            color: "Titan Xanh",
            price: "28.990.000",
            imageUrl: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
            quantity: 1
        },
        {
            name: "Samsung Galaxy S23 Ultra 5G",
            color: "Xanh Rêu",
            price: "21.990.000",
            imageUrl: "https://cdn.tgdd.vn/Products/Images/42/283818/samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg",
            quantity: 1
        }
    ];

    const subtotal = "50.980.000";
    const shippingFee = "Miễn phí";
    const total = subtotal;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Giỏ hàng */}
                    <div className="lg:w-8/12">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <table className="w-full table-auto border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sản phẩm</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Giá</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Số lượng</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cartItems.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 flex items-center space-x-4">
                                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-contain rounded-lg shadow-sm" />
                                                <div>
                                                    <p className="text-gray-800 font-semibold">{item.name}</p>
                                                    <span className="text-gray-500 text-sm">Màu: {item.color}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center font-bold text-gray-800">{item.price}₫</td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="inline-flex border rounded-md overflow-hidden">
                                                    <button className="px-3 h-10 text-gray-600 hover:bg-gray-100 transition">-</button>
                                                    <input type="text" value={item.quantity} readOnly className="w-16 h-10 text-center border-l border-r border-gray-300 focus:ring-1 focus:ring-primary" />
                                                    <button className="px-3 h-10 text-gray-600 hover:bg-gray-100 transition">+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="text-red-600 hover:text-red-800 text-xl transition">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <a href="index.html" className="text-primary hover:text-primary-dark mt-6 inline-block font-medium">
                            <i className="bi bi-arrow-left mr-1"></i> Tiếp tục mua sắm
                        </a>
                    </div>

                    {/* Tóm tắt đơn hàng */}
                    <div className="lg:w-4/12">
                        <div className="bg-white rounded-xl shadow-2xl p-6 lg:sticky lg:top-24 border border-gray-100">
                            <h4 className="text-xl font-extrabold mb-5 text-gray-800 border-b-2 pb-3 border-gray-200 flex items-center">
                                <i className="bi bi-journal-check mr-2 text-primary"></i> Tóm tắt đơn hàng
                            </h4>

                            {/* Mã giảm giá */}
                            <div className="mb-6">
                                <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">Mã giảm giá</label>
                                <div className="flex">
                                    <input 
                                        type="text" 
                                        id="couponCode" 
                                        placeholder="Nhập mã của bạn" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150" 
                                    />
                                    <button 
                                        className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-r-lg transition duration-200"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>

                            <hr className="my-5" />

                            <div className="space-y-3">
                                <div className="flex justify-between text-base text-gray-700">
                                    <span>Tạm tính</span>
                                    <span className="font-semibold text-gray-800">{subtotal}₫</span>
                                </div>
                                <div className="flex justify-between text-base text-gray-700">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-bold text-green-600">{shippingFee}</span>
                                </div>
                            </div>

                            <hr className="my-5 border-gray-300" />

                            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                                <span>Thành tiền</span>
                                <span className="text-2xl text-primary font-extrabold">{total}₫</span>
                            </div>

                            <div className="mt-8">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3.5 rounded-lg transition duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <i className="bi bi-credit-card-fill mr-2"></i> TIẾN HÀNH THANH TOÁN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ShoppingCart;
