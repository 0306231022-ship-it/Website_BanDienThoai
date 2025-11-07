function SanPhamNoiBat() {
    return (
        <>
        <section id="featured" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Sản Phẩm Giảm Giá Mạnh</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

                 
                    <div className="bg-white p-5 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center border border-danger">
                        <div className="w-full h-40 bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative">
                            <span className="absolute top-2 right-2 bg-danger text-white text-sm font-bold px-3 py-1 rounded-full">-15%</span>
                            <svg className="w-12 h-12 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h4 className="font-bold mb-1 text-center">Galaxy A53 (256GB)</h4>
                        <p className="text-sm text-gray-500 mb-2">Giá cực sốc!</p>
                        <div className="flex items-baseline mb-4">
                            <span className="text-lg text-gray-400 line-through mr-3">8.500.000₫</span>
                            <span className="text-2xl font-extrabold text-danger">7.225.000₫</span>
                        </div>
                        <button className="w-full bg-danger text-white font-bold py-2 rounded-xl hover:bg-red-700 transition duration-300">
                            Chi Tiết
                        </button>
                    </div>

                  
                    <div className="bg-white p-5 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                         <div className="w-full h-40 bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative">
                            <span className="absolute top-2 right-2 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">Tặng Tai Nghe</span>
                            <svg className="w-12 h-12 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h4 className="font-bold mb-1 text-center">Vivo X90 Pro</h4>
                        <p className="text-sm text-gray-500 mb-2">Ưu đãi độc quyền</p>
                        <div className="flex items-baseline mb-4">
                            <span className="text-2xl font-extrabold text-primary">21.000.000₫</span>
                        </div>
                        <button className="w-full bg-primary text-white font-bold py-2 rounded-xl hover:bg-blue-700 transition duration-300">
                            Chi Tiết
                        </button>
                    </div>

                  
                    <div className="bg-white p-5 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center border border-secondary">
                        <div className="w-full h-40 bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative">
                            <span className="absolute top-2 right-2 bg-secondary text-primary text-sm font-bold px-3 py-1 rounded-full">Trả Góp 0%</span>
                            <svg className="w-12 h-12 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h4 className="font-bold mb-1 text-center">iPhone 15 Pro (128GB)</h4>
                        <p className="text-sm text-gray-500 mb-2">Duy nhất tại PhoneStore</p>
                        <div className="flex items-baseline mb-4">
                            <span className="text-2xl font-extrabold text-primary">27.990.000₫</span>
                        </div>
                        <button className="w-full bg-secondary text-primary font-bold py-2 rounded-xl hover:bg-yellow-400 transition duration-300">
                            Chi Tiết
                        </button>
                    </div>

                 
                    <div className="bg-white p-5 rounded-2xl shadow-xl card-hover transition duration-300 flex flex-col items-center">
                        <div className="w-full h-40 bg-gray-100 rounded-xl mb-3 flex items-center justify-center relative">
                            <span className="absolute top-2 right-2 bg-danger text-white text-sm font-bold px-3 py-1 rounded-full">-25%</span>
                            <svg className="w-12 h-12 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h4 className="font-bold mb-1 text-center">Tai Nghe Không Dây Pro</h4>
                        <p className="text-sm text-gray-500 mb-2">Phụ kiện bán chạy</p>
                        <div className="flex items-baseline mb-4">
                            <span className="text-lg text-gray-400 line-through mr-3">2.800.000₫</span>
                            <span className="text-2xl font-extrabold text-danger">2.100.000₫</span>
                        </div>
                        <button className="w-full bg-danger text-white font-bold py-2 rounded-xl hover:bg-red-700 transition duration-300">
                            Chi Tiết
                        </button>
                    </div>
                </div>
            </div> 
  </section> 
        </>
    );
};
export default SanPhamNoiBat;