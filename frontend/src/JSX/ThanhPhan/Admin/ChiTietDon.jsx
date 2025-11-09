import { useState } from 'react';
import { Link } from 'react-router-dom';
function ChiTietDon() {
  const [showCancelForm, setShowCancelForm] = useState(false);

  return (
    <>
      <section
        id="order-detail-admin"
        className="section"
        aria-label="Chi tiết và xử lý đơn hàng"
      >
        <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
          <Link
            id="back-to-orders-btn"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
            to="/admin/DonHang">
            <i className="fas fa-arrow-left mr-2"></i> Quay Lại
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Chi Tiết Đơn Hàng #10235
          </h2>
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-base font-bold">
            <i className="fas fa-hourglass-start mr-1"></i> Đang Chờ Xử Lý
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100">
              <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2">
                Thông tin Khách hàng & Giao hàng
              </h3>
              <div className="grid grid-cols-2 gap-y-3">
                <p>
                  <span className="font-semibold text-gray-600">Khách hàng:</span>{' '}
                  Trần Bùi
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Email:</span>{' '}
                  tranbui@example.vn
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Điện thoại:</span>{' '}
                  0987 XXX 123
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Phương thức:</span>{' '}
                  Chuyển khoản ngân hàng
                </p>
                <p className="col-span-2">
                  <span className="font-semibold text-gray-600">Địa chỉ:</span> 24/7
                  Đường ABC, Phường 10, Quận 3, TP. Hồ Chí Minh
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100">
              <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2">
                Danh sách Sản phẩm
              </h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-500 uppercase">
                      Sản phẩm
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-500 uppercase">
                      SL
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase">
                      Đơn giá
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-sm">
                    <td className="px-3 py-3 font-medium text-gray-900">
                      iPhone 15 Pro Max (256GB, Titan)
                    </td>
                    <td className="px-3 py-3 text-center">1</td>
                    <td className="px-3 py-3 text-right">33,990,000₫</td>
                    <td className="px-3 py-3 text-right">33,990,000₫</td>
                  </tr>
                  <tr className="text-sm">
                    <td className="px-3 py-3 font-medium text-gray-900">
                      Apple Watch SE 2023
                    </td>
                    <td className="px-3 py-3 text-center">1</td>
                    <td className="px-3 py-3 text-right">6,500,000₫</td>
                    <td className="px-3 py-3 text-right">6,500,000₫</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-gray-200 text-right space-y-1">
                <p className="text-sm">
                  <span className="font-semibold text-gray-600">Tạm tính:</span>{' '}
                  40,490,000₫
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-600">Phí Vận chuyển:</span>{' '}
                  30,000₫
                </p>
                <p className="text-xl font-bold text-red-600">
                  <span className="text-gray-700">Tổng cộng:</span> 40,520,000₫
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-teal-50 p-6 rounded-xl shadow-inner border border-teal-300">
              <h3 className="text-xl font-bold text-teal-800 mb-4">
                Cập nhật Trạng thái
              </h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow-md">
                  <i className="fas fa-box-open mr-2"></i> Chuyển sang: Đang Xử Lý
                </button>
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition shadow-md">
                  <i className="fas fa-truck mr-2"></i> Chuyển sang: Đang Giao
                </button>
                <button
                  onClick={() => setShowCancelForm(!showCancelForm)}
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition shadow-md"
                >
                  <i className="fas fa-times-circle mr-2"></i> Hủy Đơn Hàng
                </button>
              </div>
            </div>

            <div
              id="cancel-reason-form"
              className={`bg-red-50 p-6 rounded-xl shadow-lg border-2 border-red-300 ${
                showCancelForm ? '' : 'hidden'
              }`}
            >
              <h3 className="text-xl font-bold text-red-700 mb-3">
                <i className="fas fa-exclamation-triangle mr-2"></i> Xác nhận Hủy Đơn
              </h3>

              <div>
                <label
                  htmlFor="cancel-reason"
                  className="block text-sm font-semibold text-red-700 mb-1"
                >
                  Lý do hủy đơn hàng (Bắt buộc)*
                </label>
                <textarea
                  id="cancel-reason"
                  rows="3"
                  placeholder="Ví dụ: Sản phẩm hết hàng, Khách hàng yêu cầu hủy, Lỗi hệ thống..."
                  className="w-full p-3 border border-red-300 rounded-lg text-base focus:ring-red-500 focus:border-red-500 transition duration-150 bg-white"
                  required
                ></textarea>
              </div>

              <div className="mt-3 p-3 bg-red-100 border border-red-400 rounded-lg">
                <p className="text-sm font-medium text-red-800">
                  *Lý do này sẽ được **gửi thông báo** đến Khách hàng Trần Bùi.
                </p>
              </div>

              <button className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition shadow-md">
                <i className="fas fa-ban mr-2"></i> Xác Nhận HỦY Đơn
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChiTietDon;
