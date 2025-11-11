import '../../../CSS/QLBL.css'; // Giữ lại import CSS tùy chỉnh nếu cần thiết
import { Link } from 'react-router-dom';
function BinhLuan() {
    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Tiêu đề & Hành động */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center">
                    <i className="fas fa-comments text-blue-600 mr-3"></i> Quản Lý Bình Luận
                </h2>
                <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-0 flex-shrink-0">
                    <button
                        className="action-button bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md disabled:opacity-50"
                        disabled
                        title="Đang lọc bình luận chờ duyệt"
                    >
                        <i className="fas fa-filter mr-2"></i>Lọc (**3** Chờ Duyệt)
                    </button>
                    <button className="action-button border border-gray-300 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out shadow-sm">
                        <i className="fas fa-sync-alt mr-2"></i>Làm Mới
                    </button>
                </div>
            </div>

            {/* Bảng Quản lý Bình Luận */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            {/* Cột ID: Rộng vừa đủ */}
                            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-16">ID</th> 
                            {/* Cột Tác Giả & Sản Phẩm: Rộng hơn một chút */}
                            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[180px]">Tác Giả & Sản Phẩm</th> 
                            {/* Cột Nội Dung: Rộng nhất */}
                            <th className="p-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[300px]">Nội Dung & Đánh Giá</th>
                            {/* Cột Trạng Thái: Tăng min-width để tránh xuống dòng */}
                            <th className="p-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px]">Trạng Thái</th> 
                            {/* Cột Ngày Đăng: Rộng vừa đủ */}
                            <th className="p-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-32">Ngày Đăng</th>
                            {/* Cột Hành Động: Rộng vừa đủ */}
                            <th className="p-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider w-32">Hành Động</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {/* Mẫu 1: Đã Duyệt */}
                        <tr className="hover:bg-blue-50 transition-colors">
                            <td className="p-4 text-sm font-semibold text-gray-800 whitespace-nowrap">101</td>
                            <td className="p-4 whitespace-nowrap">
                                <p className="font-semibold text-gray-800">Nguyễn Văn A</p>
                                <p className="text-xs text-blue-600 italic truncate" title="iPhone 16 Pro Max">iPhone 16 Pro Max</p>
                            </td>
                            <td className="p-4 text-sm text-gray-700 max-w-lg">
                                Sản phẩm tuyệt vời, giao hàng nhanh chóng và đóng gói cẩn thận.
                                <div className="text-base text-yellow-500 mt-1">★★★★★</div>
                            </td>
                            {/* Cột Trạng Thái: Thêm whitespace-nowrap và căn giữa */}
                            <td className="p-4 text-center whitespace-nowrap">
                                <span className="status-badge approved bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-300">Đã Duyệt</span>
                            </td>
                            <td className="p-4 text-center text-sm text-gray-500 whitespace-nowrap">05/11/2025</td>
                            <td className="p-4 text-right space-x-1 sm:space-x-2 flex justify-end items-center">
                                <Link to="/admin/BinhLuan/xem" className="action-icon text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100 transition" title="Xem Chi Tiết">
                                    <i className="fas fa-eye"></i>
                                </Link>
                                <button className="action-icon text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition" title="Trả lời">
                                    <i className="fas fa-reply"></i>
                                </button>
                                <button className="action-icon text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition" title="Xóa">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        {/* Mẫu 2: Chờ Duyệt */}
                        <tr className="hover:bg-yellow-50 transition-colors bg-yellow-50/50">
                            <td className="p-4 text-sm font-semibold text-gray-800 whitespace-nowrap">102</td>
                            <td className="p-4 whitespace-nowrap">
                                <p className="font-semibold text-gray-800">Lê Thị B</p>
                                <p className="text-xs text-blue-600 italic truncate" title="Samsung S25 Ultra">Samsung S25 Ultra</p>
                            </td>
                            <td className="p-4 text-sm text-gray-700 max-w-lg">
                                Máy đẹp, camera chụp nét, nhưng pin hơi yếu so với kỳ vọng.
                                <div className="text-base text-yellow-500 mt-1">★★★★☆</div>
                            </td>
                            {/* Cột Trạng Thái: Thêm whitespace-nowrap và căn giữa */}
                            <td className="p-4 text-center whitespace-nowrap">
                                <span className="status-badge pending bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full border border-yellow-300 animate-pulse">Chờ Duyệt</span>
                            </td>
                            <td className="p-4 text-center text-sm text-gray-500 whitespace-nowrap">04/11/2025</td>
                            <td className="p-4 text-right space-x-1 sm:space-x-2 flex justify-end items-center">
                                <button className="action-icon text-green-600 hover:text-white p-2 rounded-full bg-green-200 hover:bg-green-600 transition shadow-sm" title="Duyệt">
                                    <i className="fas fa-check-circle"></i>
                                </button>
                                <button className="action-icon text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition" title="Trả lời">
                                    <i className="fas fa-reply"></i>
                                </button>
                                <button className="action-icon text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition" title="Xóa">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        {/* Mẫu 3: Đã Xóa */}
                        <tr className="hover:bg-red-50/50 transition-colors opacity-75">
                            <td className="p-4 text-sm font-semibold text-gray-800 whitespace-nowrap">104</td>
                            <td className="p-4 whitespace-nowrap">
                                <p className="font-semibold text-gray-800">Phạm Hùng D</p>
                                <p className="text-xs text-blue-600 italic truncate" title="Oppo Find X8">Oppo Find X8</p>
                            </td>
                            <td className="p-4 text-sm text-gray-700 max-w-lg">
                                Đặt hàng 3 ngày rồi mà vẫn chưa thấy cập nhật trạng thái. (Phản hồi về đơn hàng)
                                <div className="text-base text-yellow-500 mt-1">★★☆☆☆</div>
                            </td>
                            {/* Cột Trạng Thái: Thêm whitespace-nowrap và căn giữa */}
                            <td className="p-4 text-center whitespace-nowrap">
                                <span className="status-badge deleted bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full border border-red-300">Đã Xóa</span>
                            </td>
                            <td className="p-4 text-center text-sm text-gray-500 whitespace-nowrap">02/11/2025</td>
                            <td className="p-4 text-right space-x-1 sm:space-x-2 flex justify-end items-center">
                                <button disabled className="action-icon text-gray-400 p-2 rounded-full" title="Đã xóa (Không thể Duyệt)">
                                    <i className="fas fa-ban"></i>
                                </button>
                                <button className="action-icon text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition" title="Trả lời">
                                    <i className="fas fa-reply"></i>
                                </button>
                                <button className="action-icon text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition" title="Xóa">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pagination hoặc Footer có thể thêm vào đây */}
        </div>
    );
}

export default BinhLuan;