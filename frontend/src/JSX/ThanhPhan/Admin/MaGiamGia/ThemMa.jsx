import { useState , useEffect } from "react";
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import * as fun  from '../../../../JS/FUNCTONS/function';
function ThemMa() {
    const [danhSachNhaCungCap, setDanhSachNhaCungCap] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        tenChuongTrinh: '',
        magiamgia: '',
        loaiGiamGia: 'fixed',
        giaTriGiam: '',
        giaTriDonHangToiThieu: '',
        apDungChoHang: 'tatca',
        tongLuotSuDung: '',
        luotDungMoiKhach: '',
        ngayBatDau: '',
        ngayKetThuc: '',
    });
    const [err, seterr] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response =  await API.CallAPI(undefined, { url: '/admin/laythuonghieu', PhuongThuc: 2 });
                if (response && response.ThanhCong) {
                    setDanhSachNhaCungCap(response.DuLieu);
                }
            } catch (error) {
                ThongBao.ThongBao_Loi('Lỗi khi tải danh sách thương hiệu!');
                console.error('Lỗi khi tải danh sách thương hiệu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const MaGG_macDinh = ()=>{
        const randomString = fun.RandomString(8).toUpperCase();
        setFormData(prev=>({
            ...prev,
            magiamgia:randomString
        }))
    };
    const Them_DL = async ()=>{
        const kiemtra = fun.KiemTraRong(formData);
        if(!kiemtra.Status){
            const newErr = {};
            kiemtra.ErrorKeys.forEach(key=>{
                newErr[key] = 'Trường này không được để trống';
            });
            seterr(newErr);
            ThongBao.ThongBao_Loi('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        seterr({});
        try {
            
        } catch (error) {
            
        }
    }
   

   

    return (
        <>
    <section className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tên chương trình *</label>
                    <input onChange={(e)=>{
                        setFormData(prev=>({
                            ...prev,
                            tenChuongTrinh:e.target.value
                        }))
                    }} value={formData.tenChuongTrinh} type="text" placeholder="Ví dụ: Ưu đãi iPhone 15 Pro Max tháng 4" 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                    {
                        err.tenChuongTrinh && <p className="text-sm text-red-500 mt-1">{err.tenChuongTrinh}</p>
                    }
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mã giảm giá (Coupon Code) *</label>
                    <div className="flex gap-2">
                        <input onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                magiamgia:e.target.value
                            }))
                        }} type="text" value={formData.magiamgia} id="couponCode" placeholder="IPHONE2M" 
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 font-mono text-blue-600 font-bold uppercase outline-none focus:border-blue-500"/>
                        <button onClick={MaGG_macDinh} type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition">
                            Ngẫu nhiên
                        </button>
                    </div>
                         {
                            err.magiamgia && <p className="text-sm text-red-500 mt-1">{err.magiamgia}</p>
                        }
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loại giảm giá</label>
                        <select onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                loaiGiamGia:e.target.value
                            }))
                        }} value={formData.loaiGiamGia} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="fixed">Số tiền cố định (đ)</option>
                            <option value="percent">Phần trăm (%)</option>
                        </select>
                        {
                            err.loaiGiamGia && <p className="text-sm text-red-500 mt-1">{err.loaiGiamGia}</p>
                        }
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Giá trị giảm *</label>
                        <input onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                giaTriGiam:e.target.value
                            }))
                        }} value={formData.giaTriGiam} type="number" placeholder="2,000,000" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"/>
                        {
                            err.giaTriGiam && <p className="text-sm text-red-500 mt-1">{err.giaTriGiam}</p>
                        }
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giá trị đơn hàng tối thiểu (đ)</label>
                    <input onChange={(e)=>{
                        setFormData(prev=>({
                            ...prev,
                            giaTriDonHangToiThieu:e.target.value
                        }))
                    }} value={formData.giaTriDonHangToiThieu} type="number" placeholder="Ví dụ: 15,000,000" 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"/>
                    <p className="text-xs text-gray-400 mt-1 italic font-light">* Áp dụng cho các dòng điện thoại cao cấp</p>
                    {
                        err.giaTriDonHangToiThieu && <p className="text-sm text-red-500 mt-1">{err.giaTriDonHangToiThieu}</p>
                    }
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Áp dụng cho Hãng</label>
                    <select onChange={(e)=>{
                        setFormData(prev=>({
                            ...prev,
                            apDungChoHang:e.target.value,
                        }))
                    }} value={formData.apDungChoHang} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        <option>Tất cả các hãng</option>
                        {loading ? (
                                <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
                        ) : (
                            danhSachNhaCungCap.map((ncc) => (
                                <option key={ncc.IDTHUONGHIEU} value={ncc.IDTHUONGHIEU}>{ncc.TENTHUONGHIEU}</option>
                            ))
                        )}
                    </select>
                    {
                        err.apDungChoHang && <p className="text-sm text-red-500 mt-1">{err.apDungChoHang}</p>
                    }
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tổng lượt sử dụng</label>
                        <input onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                tongLuotSuDung:e.target.value
                            }))
                        }} value={formData.tongLuotSuDung} type="number" placeholder="100" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"/>
                            {
                                err.tongLuotSuDung && <p className="text-sm text-red-500 mt-1">{err.tongLuotSuDung}</p>
                            }
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Lượt dùng/Khách</label>
                        <input onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                luotDungTheoKhach:e.target.value
                            }))
                        }} value={formData.luotDungTheoKhach} type="number" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"/>
                            {
                                err.luotDungTheoKhach && <p className="text-sm text-red-500 mt-1">{err.luotDungTheoKhach}</p>
                            }
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày bắt đầu</label>
                        <input onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                ngayBatDau:e.target.value
                            }))
                        }} value={formData.ngayBatDau} type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
                        {
                            err.ngayBatDau && <p className="text-sm text-red-500 mt-1">{err.ngayBatDau}</p>
                        }
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày kết thúc</label>
                        <input onChange={(e)=>{
                            setFormData(prev=>({
                                ...prev,
                                ngayKetThuc:e.target.value
                            }))
                        }} value={formData.ngayKetThuc} type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
                        {
                            err.ngayKetThuc && <p className="text-sm text-red-500 mt-1">{err.ngayKetThuc}</p>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition">
                Hủy bỏ
            </button>
            <button onClick={Them_DL} className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                Lưu mã giảm giá
            </button>
        </div>
    </section>
        </>
    )
};
export default ThemMa;