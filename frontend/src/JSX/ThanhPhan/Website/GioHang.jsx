
function GioHang() {
    return (
    <>

  <main className="py-12 md:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-primary">Giỏ Hàng Của Tôi</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="lg:w-7/12 space-y-6">

  
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-800">iPhone 16 Pro Max</h3>
              <p className="text-gray-500 text-sm">Giá đơn vị: 35.490.000₫</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg p-1">
                <button className="p-1 text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button>
                <input type="number" value="1" className="w-12 text-center border-none focus:ring-0"/>
                <button className="p-1 text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button>
              </div>
              <p className="text-lg font-bold text-primary">35.490.000₫</p>
              <button className="ml-4 p-2 rounded-full text-danger hover:bg-red-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m7-2h3v8H7v-8h3m0 0V4m0 0h-4v16a2 2 0 002 2h6a2 2 0 002-2V4h-4z"></path></svg>
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-800">Galaxy Z Fold Pro (512GB)</h3>
              <p className="text-gray-500 text-sm">Giá đơn vị: 39.990.000₫</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg p-1">
                <button className="p-1 text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button>
                <input type="number" value="1" className="w-12 text-center border-none focus:ring-0"/>
                <button className="p-1 text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></button>
              </div>
              <p className="text-lg font-bold text-primary">39.990.000₫</p>
              <button className="ml-4 p-2 rounded-full text-danger hover:bg-red-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        </div>

   
        <div className="lg:w-5/12">
          <div className="bg-white p-6 rounded-xl shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">Tóm Tắt Đơn Hàng</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between"><p className="text-gray-600">Tổng phụ:</p><p>75.480.000₫</p></div>
              <div className="flex justify-between"><p className="text-gray-600">Chiết khấu:</p><p className="text-danger">-0₫</p></div>
              <div className="flex justify-between"><p className="text-gray-600">Phí vận chuyển:</p><p className="text-green-600 font-bold">Miễn phí</p></div>
            </div>
            <div className="mt-6 border-t pt-6 flex justify-between items-center">
              <p className="text-xl font-extrabold">Tổng cộng:</p>
              <p className="text-3xl font-extrabold text-primary">75.480.000₫</p>
            </div>
            <button className="w-full mt-6 py-4 rounded-xl shadow-lg text-lg font-bold text-white bg-secondary hover:bg-yellow-500 transition">Tiến hành thanh toán</button>
          </div>
        </div>

      </div>
    </div>
  </main>

    </>
    );
};
export default GioHang;