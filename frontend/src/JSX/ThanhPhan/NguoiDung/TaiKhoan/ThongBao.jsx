import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
function ThongBao() {
    const { OpenMoDal , CloseAllModals } = useModalContext();
    const ChuyenTab = ( TenTrang, TieuDe )=>{
        CloseAllModals();
        OpenMoDal(null, { TenTrang: TenTrang, TieuDe: TieuDe })
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
    
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100">
        
        <div className="bg-[#e11d48] p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Dừng lại một chút!</h3>
        </div>

        <div className="p-8 text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
                Bạn cần <span className="font-bold text-[#e11d48]">Đăng nhập</span> hoặc <span className="font-bold text-[#e11d48]">Đăng ký</span> thành viên để sử dụng chức năng tuyệt vời này.
            </p>

            <div className="flex flex-col gap-3">
                <button onClick={()=>{ChuyenTab('DangNhap', 'Đăng nhập')}} className="bg-[#e11d48] text-white font-bold py-3 rounded-xl hover:bg-red-700 transition duration-300 shadow-md">
                    ĐĂNG NHẬP NGAY
                </button>
                
                <button onClick={()=>{ChuyenTab('DangKy', 'Đăng ký')}} className="border-2 border-[#e11d48] text-[#e11d48] font-bold py-3 rounded-xl hover:bg-red-50 transition duration-300">
                    TẠO TÀI KHOẢN MỚI
                </button>
            </div>

            <button className="mt-4 text-gray-400 hover:text-gray-600 text-sm underline transition duration-200">
                Để sau, tôi muốn xem thêm
            </button>
        </div>
    </div>
</div>
    );
};
export default ThongBao;