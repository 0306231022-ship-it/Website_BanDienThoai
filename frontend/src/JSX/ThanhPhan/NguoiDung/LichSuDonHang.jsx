import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LichSuDonHang() {
    // Giả lập dữ liệu mẫu nhiều hơn để thấy được phân trang
    const allOrders = [
        { id: "TECH2025-001", date: "01/01/2026", status: "dagiao", statusText: "Đã giao hàng", total: "2.500.000đ" },
        { id: "TECH2025-002", date: "02/01/2026", status: "dangxuly", statusText: "Đang xử lý", total: "1.200.000đ" },
        { id: "TECH2025-003", date: "03/01/2026", status: "dahuy", statusText: "Đã hủy", total: "500.000đ" },
        { id: "TECH2025-004", date: "04/01/2026", status: "dagiao", statusText: "Đã giao hàng", total: "3.100.000đ" },
        { id: "TECH2025-005", date: "05/01/2026", status: "dagiao", statusText: "Đã giao hàng", total: "950.000đ" },
        { id: "TECH2025-006", date: "06/01/2026", status: "dangxuly", statusText: "Đang xử lý", total: "4.200.000đ" },
    ];

    const [tab, setTab] = useState('tatca');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Số đơn hàng mỗi trang

    // 1. Lọc dữ liệu theo Tab
    const filteredOrders = tab === 'tatca' 
        ? allOrders 
        : allOrders.filter(order => order.status === tab);

    // 2. Tính toán phân trang
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    // 3. Reset trang về 1 khi đổi Tab
    useEffect(() => {
        setCurrentPage(1);
    }, [tab]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'dagiao': return 'bg-green-100 text-green-700';
            case 'dangxuly': return 'bg-blue-100 text-blue-700';
            case 'dahuy': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch Sử Đơn Hàng</h2>

                    {/* Tabs Navigation */}
                    <div className="flex space-x-4 border-b border-gray-100 mb-8 overflow-x-auto">
                        {['tatca', 'dangxuly', 'dagiao', 'dahuy'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`pb-3 px-2 font-medium capitalize transition-all ${
                                    tab === t ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                                }`}
                            >
                                {t === 'tatca' ? 'Tất cả' : t === 'dangxuly' ? 'Đang xử lý' : t === 'dagiao' ? 'Đã giao' : 'Đã hủy'}
                            </button>
                        ))}
                    </div>

                    {/* Danh sách đơn hàng */}
                    <div className="space-y-4 min-h-[300px]">
                        {currentItems.length > 0 ? (
                            currentItems.map((order) => (
                                <div key={order.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-200 transition-all">
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-lg font-bold">#{order.id}</span>
                                                <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                                                    {order.statusText}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">Ngày đặt: {order.date} | <span className="font-semibold text-gray-700">{order.total}</span></p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link to={`/order/${order.id}`} className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 border rounded-lg">
                                                Xem chi tiết
                                            </Link>
                                            {order.status === 'dangxuly' ? (
                                                <button className="px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium">
                                                    Hủy đơn
                                                </button>
                                            ) : (
                                                <button className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium">
                                                    Mua lại
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 text-gray-400">Trống</div>
                        )}
                    </div>

                    {/* Nút Phân Trang */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
                            >
                                ⬅️
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 rounded-lg border font-medium transition-colors ${
                                        currentPage === index + 1 
                                        ? "bg-blue-600 text-white border-blue-600" 
                                        : "hover:bg-gray-50 text-gray-600"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
                            >
                                ➡️
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default LichSuDonHang;