import Chung from "../CaiDatWebsite/Chung";
import { Routes, Route ,Link } from 'react-router-dom';
import HoSo from "../ThongTinCaNhan/HoSoAdmin";
import XemCaiDat from "../CaiDatWebsite/XemCaiDat";
import CaiDat from "../CaiDatWebsite/CaiDat";
import ChinhSua from "../ThongTinCaNhan/ChinhSuaThongTinAD";
import {useAppContext} from '../../../../CONTEXT/TrangChuAdmin';
function QuanLiTTCaNhan() {
    const { TTwebsite } = useAppContext();




    /**
     * const quizzes = [
  { question: "2 + 2 = ?", answer: "4" },
  { question: "Thủ đô Việt Nam là gì?", answer: "Hà Nội" },
  { question: "Năm nhuận có bao nhiêu ngày?", answer: "366" }
];

// Tìm kiếm theo từ khóa
function searchQuiz(keyword) {
  return quizzes.filter(q => q.question.includes(keyword));
}

// Ví dụ: tìm câu có chữ "Việt Nam"
const result = searchQuiz("Việt Nam");

// In ra danh sách kết quả
result.forEach(q => console.log(q.question));

     */
    return (
        <div id="main-layout" className="flex bg-gray-100 min-h-screen w-full"> 
            <div className="w-72 fixed  left-0 h-screen bg-white border-r border-gray-200 p-4 pt-6 overflow-y-auto shadow-md z-10"> 
             <div className="relative mb-6">
                 <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                 <input type="text" 
                        placeholder="Tìm kiếm cài đặt"
                        className="w-full bg-gray-100 text-gray-800 border border-transparent rounded-full py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-blue-500 focus:ring focus:ring-blue-100 transition"
                    />
            </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-inner space-y-3 mb-8">
                    <div className="flex items-center text-blue-600 font-bold space-x-2">
                         <img src={`http://localhost:3001${TTwebsite.LoGo}`} alt="Logo" className='w-5 h-5 rounded-full' />
                        <span>{TTwebsite.TenWebsite}</span>
                    </div>

                    <h3 className="font-semibold text-gray-800">Trung tâm cài đặt</h3>
                    <p className="text-xs text-gray-500 leading-snug">
                        Quản lý trung tâm tâm cài đặt được quản lí bỡi vn
                    </p>

                    {/* Navigation: Thêm hover effect */}
                    <nav className="space-y-2 text-sm mt-2">
                        
                        <Link to="/admin/CaiDat/hoAD" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-1.5 rounded-lg transition duration-150">
                            <i class="fa-solid fa-user-circle"></i>
                            <span>Thông tin cá nhân</span>
                        </Link >
                          <Link to="/admin/CaiDat/web" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-1.5 rounded-lg transition duration-150">
                            <i className="fa-solid fa-globe"></i>
                            <span>Thông tin website</span>
                        </Link >
                        <Link to="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 p-1.5 rounded-lg transition duration-150">
                            <i className="fa-solid fa-arrow-left"></i>
                            <span>Quay lại</span>
                        </Link >

                       

                    </nav>

                    <Link to="" className="text-sm font-semibold text-blue-600 hover:underline block pt-1">
                        Xem thêm trong Trung tâm tài khoản
                    </Link >
                </div>

                {/* Tool Box */}
                <div className="pt-2"> {/* Thêm padding trên để tách khỏi khối Meta */}
                    <h3 className="text-gray-900 font-bold mb-2">Công cụ & nguồn lực</h3>
                    <p className="text-sm text-gray-500 mb-4">Quản lý quyền riêng tư và các công cụ hỗ trợ bạn.</p>

                    <Link
                        href="#"
                        className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2..." 
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium">Kiểm tra quyền riêng tư</span>
                    </Link >

                </div>
            </div>


            <div className="flex-grow ml-72 p-10 overflow-y-auto min-h-screen">
                <Routes>
                    <Route index element={<Chung/>}/>
                    <Route path="/hoAD" element={<HoSo/>}/>
                    <Route path="/web" element={<XemCaiDat/>} />
                    <Route path="/CaiTT" element={<CaiDat/>} />
                    <Route path="/ChinhSua" element={<ChinhSua/>} />
                </Routes>
            </div>
        </div>
    );
}

export default QuanLiTTCaNhan;