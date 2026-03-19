import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../../JS/FUNCTONS/function';
import { useState , useEffect, } from 'react';
import { Link } from 'react-router-dom';
function DanhSachBanner() {
    const [page, setPage] = useState(1);
    const [loading,setloading] = useState(false);
    const [DanhSachFlashSale, setDanhSachFlashSale] = useState([]);
    const pageSize = 10; // Số mục hiển thị trên mỗi trang
    const totalItems = DanhSachFlashSale.length; // Tổng số mục (có thể lấy từ API)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const ketqua = await API.CallAPI(undefined,{PhuongThuc:2, url:'/admin/danhsach_flashsale?page='+page});
                if(ketqua.status){
                    ThongBao.ThongBao_Loi(ketqua.message);
                    return;
                }
                if(ketqua.ThanhCong){
                    setDanhSachFlashSale(ketqua.dulieu);
                }
            } catch (error) {
                console.error('Có lỗi sãy ra:' + error);
                ThongBao.ThongBao_Loi('Có lỗi xảy ra khi lấy danh sách Flash Sale!');
            } finally{
                setloading(false);
            }
        }
        fetchData();
    }, [page]);
    return (
        <>
         <div className="flex h-screen overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-6">
                
                <div className="bg-white rounded-t-xl p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
                    
                    <div className="relative w-full md:w-96">
                        <input type="text" placeholder="Tìm tên chiến dịch..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full md:w-auto">
                            <option value="">Tất cả Trạng thái</option>
                            <option value="active">Đang chạy</option>
                            <option value="upcoming">Sắp diễn ra</option>
                            <option value="ended">Đã kết thúc</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hidden sm:block">
                            <option value="">Loại: Tất cả</option>
                            <option value="flash-sale">Flash Sale</option>
                            <option value="banner">Banner Trưng bày</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Tên chiến dịch / Loại</th>
                                    <th className="px-6 py-4">Thời gian áp dụng</th>
                                    <th className="px-6 py-4 text-center">Sản phẩm</th>
                                    <th className="px-6 py-4">Trạng thái</th>
                                    <th className="px-6 py-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                Đang tải dữ liệu...
                                            </td>
                                        </tr>
                                    ) : (
                                        DanhSachFlashSale.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    Không có chiến dịch nào!
                                                </td>
                                            </tr>
                                        ) : (
                                            DanhSachFlashSale.map((flash) => (
                                        <tr className="hover:bg-blue-50/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 text-base mb-1">{flash.TENFS}</div>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[${flash.MAUNEN}] text-white`}>#{flash.IDFS}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-800"> Bắt đầu :{fun.formatTime(flash.THOIGIAN_BATDAU)} - {fun.formatDate(flash.THOIGIAN_BATDAU)}</div>
                                                <div className="text-gray-400 text-xs">Kết thúc: {fun.formatTime(flash.THOIGIAN_KETTHUC)} - {fun.formatDate(flash.THOIGIAN_KETTHUC)}</div>
                                            </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-semibold text-gray-800">{flash.SoSanPham}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            flash.TRANGTHAI === 1 ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                    Đang chạy
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                                    Đã kết thúc
                                                </span>
                                            )
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                      < div className="flex justify-center gap-1.5">
                                                    <Link to={`chitiet/${flash.IDFS}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết">
                                                        xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                                    </Link>
                                                </div>
                                    </td>
                                </tr>
                            ))
                                        )
                                    )
                                }
                               

                            </tbody>
                        </table>
                    </div>
                    
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <span className="text-sm text-gray-500">Hiển thị <span className="font-medium text-gray-800">{(page - 1) * pageSize + 1}</span> đến <span className="font-medium text-gray-800">{Math.min(page * pageSize, totalItems)}</span> của <span className="font-medium text-gray-800">{DanhSachFlashSale.length}</span> chiến dịch</span>
                        <div className="flex items-center gap-1">
                            <button onClick={()=>{setPage(p=>p-1)}} disabled={page === 1} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-white transition" >&larr; Trước</button>
                            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium shadow-sm">{page}</span>
                            <button onClick={()=>{setPage(p=>p+1)}}  disabled={page * pageSize >= totalItems} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white transition">Sau &rarr;</button>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    </div>
        </>
    )
};
export default DanhSachBanner;