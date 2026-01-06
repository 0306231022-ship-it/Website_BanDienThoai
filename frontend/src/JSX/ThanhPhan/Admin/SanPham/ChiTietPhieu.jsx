import { Link,useParams } from "react-router-dom";
import * as API from '../../../../JS/API/API';
import { useState, useEffect } from "react";
function ChiTietPhieu() {
    const {id}  = useParams();
    const [DuLieu,setDuLieu] = useState(null);
    useEffect(()=>{
        const Laydata=async()=>{
            const KetQua=await API.CallAPI(undefined,{url:`/admin/ChiTietPhieuNhap?id=${id}` , PhuongThuc:2});
            setDuLieu(KetQua.DuLieu);
        };
        Laydata();
    },[id])
    return (
        <>
            {/* Đã thêm max-w-5xl để giới hạn chiều rộng và mx-auto để căn giữa */}
            <div className="p-4 max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 no-print">
                    <div>
                        <Link to='/admin/PhieuNhapHang' className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm mb-1">
                            <i className="fa-solid fa-arrow-left"></i> Quay lại danh sách
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Phiếu Nhập: <span className="text-blue-600">#{id}</span>
                            <span className="ml-2 text-sm font-medium bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded border border-yellow-200">
                                <i className="fa-solid fa-clock"></i> Công nợ
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500">Ngày tạo: 19/10/2023 lúc 08:15 AM</p>
                    </div>

                    <div className="flex gap-2">
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50">
                            <i className="fa-solid fa-print"></i> In phiếu
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm">
                            <i className="fa-solid fa-file-invoice-dollar"></i> Thanh toán thêm
                        </button>
                        <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded shadow-sm border border-red-200">
                            <i className="fa-solid fa-rotate-left"></i> Hoàn trả
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden print-area">

                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                {
                                    DuLieu.CungCap && (
                                       DuLieu.CungCap.map((item,index)=>(
                                        <>
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nhà cung cấp</h3>
                                <p className="font-bold text-lg text-gray-800">{item.TENCC}</p>
                                <p className="text-sm text-gray-600"><i className="fa-solid fa-phone w-4"></i> {item.SDT}</p>
                                <p className="text-sm text-gray-600"><i className="fa-solid fa-map-location-dot w-4"></i> {item.DIACHI}</p>
                                        </>
                                       ))
                                    )
                                }
                                
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Thông tin người nhập</h3>
                                <p className="font-bold text-gray-800">Trần Thị B (Kho)</p>
                                <p className="text-sm text-gray-600">ID: STF-002</p>
                                <div className="mt-2 text-sm bg-blue-50 text-blue-800 p-2 rounded border border-blue-100 italic">
                                    "Ghi chú: Nhập hàng đợt Flash Sale, đã kiểm tra seal kỹ."
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Tổng tiền hàng:</span>
                                    <span className="font-bold">150.000.000 ₫</span>
                                </div>
                                <div className="flex justify-between mb-1 text-green-600">
                                    <span>Đã thanh toán:</span>
                                    <span className="font-bold">- 100.000.000 ₫</span>
                                </div>
                                <div className="border-t pt-2 mt-2 flex justify-between text-red-600 text-lg font-bold">
                                    <span>Còn nợ:</span>
                                    <span>50.000.000 ₫</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-0">
                        <h3 className="p-6 pb-2 text-lg font-bold text-gray-800 border-b">Chi tiết sản phẩm nhập kho</h3>

                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 w-10">#</th>
                                    <th className="px-6 py-3">Tên sản phẩm / Thông số</th>
                                    <th className="px-6 py-3 text-center">SL</th>
                                    <th className="px-6 py-3 text-right">Đơn giá</th>
                                    <th className="px-6 py-3 text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">

                                <tr className="bg-white">
                                    <td className="px-6 py-4 font-bold">1</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                                                <img src="https://via.placeholder.com/150" className="w-full h-full object-cover" alt="S23 Ultra" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-base">Samsung Galaxy S23 Ultra</p>
                                                <p className="text-xs text-gray-500">Màu: Đen Phantom | RAM: 12GB | ROM: 512GB</p>

                                                <details className="group mt-2">
                                                    <summary className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 select-none text-xs font-medium">
                                                        <i className="fa-solid fa-barcode"></i>
                                                        <span>Xem 2 mã IMEI</span>
                                                        <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                                    </summary>
                                                    <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <div className="flex justify-between items-center bg-white p-2 border rounded">
                                                            <code className="text-gray-800 font-mono font-bold">893456789012345</code>
                                                            <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded">Trong kho</span>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-white p-2 border rounded">
                                                            <code className="text-gray-800 font-mono font-bold">893456789012346</code>
                                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-1 rounded">Đã bán</span>
                                                        </div>
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-gray-900">2</td>
                                    <td className="px-6 py-4 text-right">25.000.000 ₫</td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">50.000.000 ₫</td>
                                </tr>

                                <tr className="bg-white">
                                    <td className="px-6 py-4 font-bold">2</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                                                <img src="https://via.placeholder.com/150" className="w-full h-full object-cover" alt="Z Flip 5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-base">Samsung Galaxy Z Flip 5</p>
                                                <p className="text-xs text-gray-500">Màu: Tím | RAM: 8GB | ROM: 256GB</p>

                                                <details className="group mt-2">
                                                    <summary className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 select-none text-xs font-medium">
                                                        <i className="fa-solid fa-barcode"></i>
                                                        <span>Xem 5 mã IMEI</span>
                                                        <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                                    </summary>
                                                    <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                        <div className="bg-white p-1.5 border rounded text-xs font-mono text-center">356789012345671</div>
                                                        <div className="bg-white p-1.5 border rounded text-xs font-mono text-center">356789012345672</div>
                                                        <div className="bg-white p-1.5 border rounded text-xs font-mono text-center">356789012345673</div>
                                                        <div className="bg-white p-1.5 border rounded text-xs font-mono text-center">356789012345674</div>
                                                        <div className="bg-white p-1.5 border rounded text-xs font-mono text-center">356789012345675</div>
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-gray-900">5</td>
                                    <td className="px-6 py-4 text-right">20.000.000 ₫</td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">100.000.000 ₫</td>
                                </tr>

                            </tbody>
                            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                                <tr>
                                    <td colSpan="4" className="px-6 py-3 text-right font-bold text-gray-600 uppercase">Tổng cộng</td>
                                    <td className="px-6 py-3 text-right font-bold text-xl text-blue-700">150.000.000 ₫</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                        <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase"><i className="fa-solid fa-history mr-1"></i> Lịch sử thanh toán</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Thanh toán lần 1 (Tiền mặt)</p>
                                        <p className="text-xs text-gray-500">19/10/2023 - Người thu: Kế toán trưởng</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-700">100.000.000 ₫</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="text-center mt-6 text-gray-400 text-xs no-print">
                    <p>Hệ thống quản lý kho - </p>
                </div>

            </div>
        </>
    )
};
export default ChiTietPhieu;