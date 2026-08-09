import { Link } from "react-router-dom";
import * as fun from '../../../../JS/FUNCTONS/function';
import { useEffect , useState} from "react";
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { website , Lay_TTCaNhan } from "../../../../hook/ThongTinHienThi_Website";
function HoSo() {
    const { OpenMoDal } = useModalContext();
    const [TTwebsite,setWebsite]=useState([])
    const [TTCaNhan,setTTCaNhan]=useState([])
  useEffect(() => {
    const GetTTwebsite = async () => {
      const [data, data2] = await Promise.all([website(),Lay_TTCaNhan(1)]);
      setWebsite(data.DuLieu);
      setTTCaNhan(data2.DuLieu);
    };
  GetTTwebsite();
  }, []);

    return (
        <>
            <div className="p-6 min-h-screen bg-gray-50">
                <header className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <div className="flex items-center mb-1">
                        <i className="fa-solid fa-user-circle text-indigo-600 text-3xl mr-3"></i>
                        <h2 className="text-2xl font-extrabold text-gray-900">Trang Cá Nhân và Thông Tin Tài Khoản</h2>
                    </div>
                    <p className="text-gray-500 mt-2">
                        Xem lại trang cá nhân và thông tin cá nhân bạn đã thêm vào Trung tâm tài khoản này.
                        <Link to="#" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium ml-1 transition">Tìm hiểu thêm</Link>
                    </p>
                </header>

                {/* 2. TRANG CÁ NHÂN */}
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">
                        <i className="fa-solid fa-circle-user mr-2"></i> Trang cá nhân
                    </h3>

                    <button 
                        onClick={() => OpenMoDal({ avatar: TTCaNhan?.AVATAR, TEN: TTCaNhan?.HOTEN },{TenTrang:'logo'})}
                        className="flex items-center justify-between w-full py-3 px-3 rounded-xl hover:bg-indigo-50 cursor-pointer transition duration-200 ease-in-out group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden flex-shrink-0 border-2 border-indigo-300">
                                <img 
                                    src={fun.getImageUrl(TTCaNhan?.AVATAR)} 
                                    alt="Avatar"
                                    className="w-full h-full object-cover" 
                                    loading="lazy" 
                                />
                            </div>

                            <div className='text-left'>
                                <p className="font-bold text-gray-900 text-lg group-hover:text-indigo-800">{TTCaNhan?.HOTEN || "Chưa cập nhật"}</p>
                                <div className="text-sm text-gray-500 flex items-center mt-1 gap-2">
                                    <img src={fun.getImageUrl(TTwebsite?.LoGo)} alt="Logo" className="w-6 h-6 rounded-full border shadow-sm"/>  
                                    <span>{TTwebsite?.TenWebsite}</span>
                                </div>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right w-4 h-4 text-gray-400 group-hover:text-indigo-600"></i>
                    </button>
                </main>

                {/* 3. THÔNG TIN CÁ NHÂN */}
                <main className="bg-white p-6 rounded-xl shadow-md mt-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3">🔑 Thông tin cá nhân</h3>

                    <button  onClick={() => OpenMoDal({ email: TTCaNhan?.EMAIL, sdt: TTCaNhan?.SDT },{TenTrang:'EmailVaSdt'})} className="flex justify-between items-center w-full py-4 px-3 rounded-xl hover:bg-gray-50 transition group border-b border-gray-100">
                        <div className='flex flex-col items-start text-left'>
                            <p className="font-semibold text-gray-800 group-hover:text-indigo-600">
                                <i className="fa-solid fa-phone-volume text-indigo-500 w-5 mr-3"></i> Thông tin liên hệ
                            </p>
                            <p className="text-sm text-gray-500 mt-1 pl-8">{TTCaNhan?.EMAIL || "Chưa cập nhật"}, {TTCaNhan?.SDT || "Chưa cập nhật"}</p>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-indigo-500"></i>
                    </button>
                </main>
            </div>

        </>
    );
}

export default HoSo;