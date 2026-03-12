function ThemBanner() {
  return (
    <>
      <div className="flex h-screen">
        {/* Thêm các class ẩn scrollbar vào thẻ main chứa overflow-y-auto */}
        <main className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold border-b pb-3 mb-4">
                Thông tin chung
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên chiến dịch
                  </label>
                  <input
                    type="text"
                    defaultValue="Flash Sale Mừng Lương Về"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  {/* Chuyển selected thành defaultValue trong React */}
                  <select
                    defaultValue="active"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-green-50 text-green-700 font-medium border-green-200"
                  >
                    <option value="active">Đang Bật (Active)</option>
                    <option value="inactive">Đã Tắt (Inactive)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Màu sắc nền (Tùy chọn)
                  </label>
                  <input
                    type="color"
                    defaultValue="#ef4444"
                    className="w-full h-[42px] border border-gray-300 rounded-md p-1 cursor-pointer"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bắt đầu lúc
                  </label>
                  <input
                    type="datetime-local"
                    defaultValue="2026-10-25T20:00"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kết thúc lúc
                  </label>
                  <input
                    type="datetime-local"
                    defaultValue="2026-10-25T23:59"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-lg font-semibold">Sản phẩm khuyến mãi</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2">
                  + Thêm Sản Phẩm
                </button>
              </div>

              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-medium rounded-tl-md">
                        Sản phẩm
                      </th>
                      <th className="px-4 py-3 font-medium">Giá Gốc</th>
                      <th className="px-4 py-3 font-medium">Giá Flash Sale</th>
                      <th className="px-4 py-3 font-medium w-24">Mở bán</th>
                      <th className="px-4 py-3 font-medium w-24">
                        Đã bán (Ảo)
                      </th>
                      <th className="px-4 py-3 font-medium text-right rounded-tr-md">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                        <span className="font-medium text-gray-800 line-clamp-1">
                          iPhone 14 Pro Max 256GB
                        </span>
                      </td>
                      <td className="px-4 py-3 line-through text-gray-400">
                        29.990.000đ
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue="24990000"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-red-600 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue="100"
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue="80"
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 font-medium">
                          Lưu
                        </button>
                        <button className="text-red-500 hover:text-red-700 font-medium">
                          Xóa
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                        <span className="font-medium text-gray-800 line-clamp-1">
                          Samsung Galaxy S23 Ultra
                        </span>
                      </td>
                      <td className="px-4 py-3 line-through text-gray-400">
                        25.990.000đ
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue="16990000"
                          className="w-full border border-gray-300 rounded px-2 py-1 text-red-600 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue="50"
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue="30"
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 font-medium">
                          Lưu
                        </button>
                        <button className="text-red-500 hover:text-red-700 font-medium">
                          Xóa
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium mr-3 transition">
                Hủy
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-medium shadow-md transition">
                Lưu Chiến Dịch
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ThemBanner;