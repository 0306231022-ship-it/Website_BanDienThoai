import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as API from '../../../../JS/API/API';
import * as fun from '../../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';

function ThungRacSanPham() {
    const [page, setpage] = useState(1);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [sanpham, setsanpham] = useState([]);
    const [err, seterrr] = useState('');
    const [tongso, settongso] = useState(0);
    useEffect(() => {
        const LayDL = async () => {
            setloading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { 
                    PhuongThuc: 2, 
                    url: `/admin/sanpham_daxoa?page=${page}` 
                });
                if (ketqua.status) {
                    seterrr(ketqua.message);
                }
                if (ketqua.ThanhCong) {
                    setsanpham(ketqua.dulieu);
                    settongso(ketqua.tongso);
                }
            } catch (error) {
                console.error('lỗi xảy ra:' + error);
                seterrr('Không thể kết nối đến máy chủ');
            } finally {
                setloading(false);
            }
        };
        LayDL();
    }, [page]);
     const Khoi_Phuc = async(id)=>{
            const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn khôi phục sản phẩm này chứ?');
            if(!XacNhan) return;
            try {
                setloading(true)
                const khoiphuc = await API.CallAPI(undefined,{url : `/admin/khoiphuc_sanpham?id=${id}` , PhuongThuc:1});
                if(khoiphuc.status){
                    seterrr(khoiphuc.message);
                    return;
                }
                if(khoiphuc.ThanhCong){
                    setsanpham(sanpham.filter(item => item.IDSANPHAM !== id));
                    ThongBao.ThongBao_ThanhCong(khoiphuc.message);
                    return;
                }else{
                    ThongBao.ThongBao_Loi(khoiphuc.message);
                    return;
                }
            } catch (error) {
                console.error('lỗi sãy ra:' + error)
            } finally {
                setloading(false)
            }
        }
        const xoa_tatca= async()=>{
                const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn xóa tất cả các phiếu nhập trong thùng rác?');
                if(!XacNhan) return;
               setloading(true)
                try {
                    const ketqua = await API.CallAPI(undefined,{PhuongThuc:1, url :'/admin/xoa_tatca_sanpham'});
                     if(ketqua.status){
                        ThongBao.ThongBao_CanhBao(ketqua.message);
                        return;
                     }
                     if(ketqua.ThanhCong){
                         setsanpham([]);
                         ThongBao.ThongBao_ThanhCong(ketqua.message);
                         return;
                     }else{
                        ThongBao.ThongBao_Loi(ketqua.message);
                        return;
                     }
        
                } catch (error) {
                    console.error('lỗi sãy ra : ' + error)
                } finally {
                    setloading(false)
                }
            }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang truy xuất thùng rác...</p>
            </div>
        );
    }

    if (err) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md border border-red-50">
                    <i className="fa-solid fa-circle-exclamation text-6xl text-red-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Thông báo lỗi</h3>
                    <p className="text-gray-500 mb-6">{err}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">Thử lại</button>
                        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-gray-200 transition">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        <span className="p-3 bg-red-100 text-red-600 rounded-2xl">
                            <i className="fa-solid fa-trash-can"></i>
                        </span>
                        Thùng rác hệ thống
                    </h1>
                    <p className="text-gray-500 mt-2 italic text-sm">Tự động làm sạch sau 30 ngày kể từ lúc xóa.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                        <i className="fa-solid fa-rotate-left mr-2 text-blue-500"></i> Khôi phục hết
                    </button>
                    <button onClick={()=>{xoa_tatca()}} className="flex-1 md:flex-none px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition shadow-lg">
                        Dọn sạch ngay
                    </button>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                    <div className="relative w-full max-w-sm">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 transition outline-none text-sm" placeholder="Tìm kiếm sản phẩm đã xóa..."/>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] font-black tracking-[0.15em] border-b border-gray-50">
                                <th className="px-8 py-5">Sản phẩm</th>
                                <th className="px-8 py-5 text-center">ID Phiếu</th>
                                <th className="px-8 py-5">Hạn lưu trữ</th>
                                <th className="px-8 py-5 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {sanpham && sanpham.length > 0 ? (
                                sanpham.map((sp, index) => {
                                    const { soNgay, phanTram } = fun.tinhThoiGian(sp.DELETE_AT);
                                    return (
                                        <tr key={index} className="hover:bg-red-50/30 transition group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative group-hover:scale-105 transition-transform">
                                                        <img src={`http://localhost:3001/${sp.HINHANH}`} className="w-14 h-14 rounded-2xl object-cover border border-gray-100" alt="product"/>
                                                        <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800 line-through decoration-gray-400 decoration-2">{sp.TENSANPHAM}</div>
                                                        <div className="text-[10px] font-mono text-gray-400 tracking-widest mt-1 uppercase">Mã: {sp.IDSANPHAM}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold">#{sp.IDPN}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="w-40">
                                                    <div className={`flex items-center justify-between mb-2 text-xs font-bold ${soNgay <= 5 ? 'text-red-600' : 'text-orange-500'}`}>
                                                        <span>{soNgay > 0 ? `Còn ${soNgay} ngày` : 'Hết hạn'}</span>
                                                        <span>{Math.round(phanTram)}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-50 shadow-inner">
                                                        <div 
                                                            className={`h-full transition-all duration-1000 ease-out rounded-full ${soNgay <= 5 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}
                                                            style={{ width: `${phanTram}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={()=>{Khoi_Phuc(sp.IDSANPHAM)}} className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                        <i className="fa-solid fa-arrow-rotate-left text-sm"></i>
                                                    </button>
                                                    <button title="Xóa vĩnh viễn" className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                        <i className="fa-solid fa-trash-can text-sm"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-24 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <i className="fa-solid fa-box-open text-7xl mb-4"></i>
                                            <p className="text-xl font-bold uppercase tracking-widest">Thùng rác đang trống</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center px-8">
                    <span className="text-sm font-medium text-gray-400">Trang <b className="text-gray-900">{page}</b></span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setpage(p => p - 1)} 
                            disabled={page === 1}
                            className="p-2 w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-white disabled:opacity-30 transition cursor-pointer"
                        >
                            <i className="fa-solid fa-chevron-left text-xs"></i>
                        </button>
                        <span className="p-2 w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl">
                           {page}
                        </span>
                        <button 
                            onClick={() => setpage(p => p + 1)}
                            disabled={page >= Math.ceil(tongso / 10)}
                            className="p-2 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:shadow-md transition cursor-pointer font-bold text-gray-700"
                        >
                            <i className="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThungRacSanPham;