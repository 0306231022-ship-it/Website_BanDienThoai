import { useState,useEffect } from "react";
import { useNavigate} from 'react-router-dom'
import * as API from '../../../../JS/API/API';
function ThungRacSanPham(){
    const [page,setpage] = useState(1);
    const navigate = useNavigate();
    const [loading,setloading] = useState(false);
    
    const [err,seterrr] = useState('');
    useEffect(()=>{
        const LayDL = async()=>{
            setloading(true)
            try {
                const ketqua = await API.CallAPI(undefined,{PhuongThuc:2, url :`/admin/sanpham_daxoa?page=${page}`});
                alert(JSON.stringify(ketqua))
                if(ketqua.status){
                    seterrr(ketqua.message)
                }

            } catch (error) {
                console.error('lỗi sãy ra:' + error);
            } finally {
                setloading(false)
            }
        }
        LayDL();
    },[page]);
    if (loading) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }
     if (err) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500 mb-6"></i>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{err}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold shadow-lg hover:bg-red-600 transition-all">Thử lại</button>
                        <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
        <div className="max-w-6xl mx-auto p-4">
    <div className="flex justify-between items-end mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Thùng rác hệ thống</h1>
            <p className="text-gray-500">Dữ liệu sẽ được lưu trữ tối đa 30 ngày trước khi xóa vĩnh viễn.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                <i className="fa-solid fa-rotate-left mr-2"></i>Khôi phục tất cả
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <i className="fa-solid fa-trash-can mr-2"></i>Dọn sạch rác
            </button>
        </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <div className="relative w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </span>
                <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm" placeholder="Tìm kiếm..."/>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-gray-400 uppercase text-[11px] font-bold tracking-wider border-b border-gray-100">
                        <th className="px-6 py-4">Thông tin sản phẩm</th>
                        <th className="px-6 py-4">Mã / Loại</th>
                        <th className="px-6 py-4">Thời gian còn lại</th>
                        <th className="px-6 py-4 text-right">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    
                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden border">
                                <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=100" alt="prod"/>
                            </div>
                            <div>
                                <div className="font-bold text-gray-800 italic line-through">iPhone 15 Pro Max</div>
                                <div className="text-xs text-gray-400">ID: #SP-9921</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                            <span className="block text-gray-600 font-mono text-xs">IP15-PM-BLK</span>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase">Điện thoại</span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-col">
                                <span className="text-red-600 font-bold flex items-center gap-1">
                                    <i className="fa-solid fa-clock-rotate-left"></i> Còn 2 ngày
                                </span>
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                    <div className="bg-red-500 h-full w-[10%]"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button title="Khôi phục" className="text-blue-600 hover:bg-blue-50 w-8 h-8 rounded-full transition"><i className="fa-solid fa-undo text-sm"></i></button>
                            <button title="Xóa vĩnh viễn" className="text-gray-400 hover:text-red-600 w-8 h-8 rounded-full transition ml-1"><i className="fa-solid fa-trash-can text-sm"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
            <span className="text-sm text-gray-500">Hiển thị 2 trên 15 sản phẩm</span>
            <div className="flex gap-1">
                <button onClick={()=>{setpage(p=>p-1)}} className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50" disabled={page===1}>Trước</button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded shadow-sm">{page}</span>
                <button onClick={()=>{setpage(p=>p+1)}} className="px-3 py-1 border rounded hover:bg-white text-gray-600">Sau</button>
            </div>
        </div>
    </div>
</div>

        </>
    )
};
export default ThungRacSanPham;