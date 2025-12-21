
import { Link } from 'react-router-dom';
import {useAppContext} from '../../../../CONTEXT/TrangChuAdmin';
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import ChinhSuaImgaeVaTen from "./modal/ChinhSuaNameLoGo";
import ChinhSuaTen from './modal/Conmodal/ChinhSuaName';
import ChinhSuaLoGo from './modal/Conmodal/ChinhSuaLoGo';
import SuaMoTa from './modal/SuaMoTa';
import Trang404 from "../../../TRANG/err/404";
function XemCaiDat(){
    const { TTwebsite} = useAppContext();
    const {modalState,MoModal,DongModal,ChinhSuaModel} = useModalContext();
    return(
        <>
            <div className="p-6 min-h-screen">
                <header className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-circle-info text-indigo-600 text-3xl mr-3"></i> 
                        <h2 className="text-2xl font-extrabold text-gray-900">Trang Thông Tin Website</h2>
                    </div>
                    <p className="text-gray-500 mt-2">
                        Quản lý và chỉnh sửa các thông tin cơ bản, liên hệ, và mạng xã hội của website.
                        <Link to="" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium ml-2 transition">
                            Tìm hiểu thêm
                        </Link>
                    </p>
                </header>
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">📋 Thông tin chính</h3>
                    <button 
                        onClick={() => MoModal('Logo&Name', { 
                            LoGo: TTwebsite.LoGo, 
                            TenWebsite: TTwebsite.TenWebsite
                        })} 
                        className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-indigo-50 cursor-pointer transition duration-200 ease-in-out group"
                    >
                        <div className="flex items-center space-x-4">
                            <img 
                                src={`http://localhost:3001/${TTwebsite.LoGo}`} 
                                alt="Logo" 
                                className='w-12 h-12 rounded-full object-cover border-2 border-indigo-200 shadow-inner' 
                            />
                            <div className='text-left'>
                                <p className="font-bold text-gray-900 text-lg group-hover:text-indigo-800">{TTwebsite.TenWebsite}</p>
                                <p className="text-sm text-gray-500">Tên và Logo Website</p>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-400 group-hover:text-indigo-600"></i>
                    </button>
                </main>
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
                        <i className="fa-solid fa-globe text-indigo-600 mr-2"></i> Mô Tả Thông Tin Website
                    </h3>
                    <button 
                        onClick={() => MoModal("SuaMoTa", { MoTaWebstite: TTwebsite.MoTaWebstite })}
                        className="flex items-start justify-between w-full py-4 px-3 rounded-xl transition duration-200 ease-in-out 
                                   group hover:bg-indigo-50 hover:shadow-md border border-transparent hover:border-indigo-200"
                    >
                        <div className="flex items-start space-x-4">
                            <i className="fa-solid fa-file-lines w-6 h-6 text-indigo-500 mt-0.5 flex-shrink-0"></i>
                            <div className="text-left">
                                <p className="font-semibold text-gray-900 mb-1">Chi tiết mô tả:</p> 
                                <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                                    {TTwebsite.MoTaWebstite || "Chưa có mô tả. Nhấn vào để thêm/sửa mô tả website."}
                                </p>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 ml-4 mt-0.5"></i>
                    </button>
                </main>
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">🔗 Liên kết mạng xã hội</h3>
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group border-b border-gray-100">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600 flex items-center">
                                <i className="fa-brands fa-facebook-f text-blue-700 w-5 mr-3"></i> Facebook
                            </p>
                            <Link to={`${TTwebsite.LinkFacebook}`} target="_blank" className="text-sm text-gray-500 mt-1 pl-8 hover:underline">
                                {TTwebsite.LinkFacebook || "Chưa thiết lập"}
                            </Link>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600 flex items-center">
                                <i className="fa-brands fa-instagram bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent w-5 mr-3"></i> Instagram
                            </p>
                            <Link to={`${TTwebsite.LinkInstagram}`} target="_blank" className="text-sm text-gray-500 mt-1 pl-8 hover:underline">
                                {TTwebsite.LinkInstagram || "Chưa thiết lập"}
                            </Link>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                </main>
                

                <main className="bg-white p-6 rounded-xl shadow-md mt-6 mb-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3"><i className="fa-solid fa-square-phone text-green-600 w-5 mr-3"></i> Thông tin liên hệ</h3>
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group border-b border-gray-100">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600 flex items-center">
                                <i className="text-red-600 fa-solid fa-location-dot w-5 mr-3"></i> Địa chỉ
                            </p>
                            <p className="text-sm text-gray-500 mt-1 pl-8">{TTwebsite.DiaChi || "Chưa thiết lập"}</p>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group border-b border-gray-100">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600 flex items-center">
                                <i className="fa-solid fa-envelope text-blue-600 w-5 mr-3"></i> Email
                            </p>
                            <p className="text-sm text-gray-500 mt-1 pl-8">{TTwebsite.Email || "Chưa thiết lập"}</p>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                    <button className="flex justify-between items-center w-full py-3 px-3 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out group">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-base mb-1 text-gray-800 group-hover:text-indigo-600 flex items-center">
                                <i className="fa-solid fa-phone text-green-600 w-5 mr-3"></i> Số điện thoại / Zalo
                            </p>
                            <p className="text-sm text-gray-500 mt-1 pl-8">{TTwebsite.Zalo || "Chưa thiết lập"}</p>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-300 group-hover:text-indigo-500 ml-4 flex-shrink-0"></i>
                    </button>
                </main>
            </div>
            {
                modalState.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                         <div className="relative bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                             <button onClick={DongModal} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition">
                                <i className="fa-solid fa-xmark text-white"></i>
                            </button>
                            {
                                modalState.TrangThaiTrang!==modalState.TrangThaiTrangTruoc && (
                                  <button  onClick={()=>{ChinhSuaModel(modalState.TrangThaiTrangTruoc)}} class="btn-back"><i class="fa-solid fa-chevron-left"></i> Quay lại</button>
                                )
                            }
                             <p className="text-gray-600 mb-6">
                                {(() => {
                                    switch(modalState.TrangThaiTrang){
                                        case 'Logo&Name' :
                                            return  <ChinhSuaImgaeVaTen/>;
                                        case 'SuaTen' :
                                            return <ChinhSuaTen/> ;
                                        case 'SuaAnh' :
                                            return <ChinhSuaLoGo/>;
                                        case 'SuaMoTa' :
                                            return <SuaMoTa/>
                                            
                                        default :
                                        return <Trang404/>
                                    }
                                })()}
                             </p>
                         
                        </div>
                    </div>
                )
            } 
        </>
    )
};

export default XemCaiDat;