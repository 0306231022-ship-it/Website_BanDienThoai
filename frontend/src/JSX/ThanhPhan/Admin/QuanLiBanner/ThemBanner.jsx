import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { useFlashSaleContext } from "../../../../CONTEXT/QuanLi_FlashSale";
import { useState } from 'react'; 
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';

function ThemBanner() {
    const { OpenMoDal } = useModalContext();
    const { setSanPham, SanPham } = useFlashSaleContext();
    const [thongTinChung, setThongTinChung] = useState({
        TenChienDich: '',
        TrangThai: 'active',
        MauNen: '',
        BatDau: '',
        KetThuc: ''
    });
    const [errValidate, setErrValidate] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setThongTinChung(prev => ({ ...prev, [name]: value }));
    };
    const handleUpdateSP = (id, field, value) => {
        setSanPham(prev => prev.map(sp => 
            sp.IDSANPHAM === id ? { ...sp, [field]: value } : sp
        ));
    };

    const XoaSP = async (id) => {
        const ketqua = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (!ketqua) return;
        setSanPham(prev => prev.filter(sp => sp.IDSANPHAM !== id));
        ThongBao.ThongBao_ThanhCong('Đã xóa!');
    }

    const LuuChienDich = async () => {
        const DanhSachSanPham = SanPham.map(sp => ({
            IDSANPHAM: sp.IDSANPHAM,
            GIAFLASHSALE: sp.GIAFLASHSALE,
            SOLUONG_MOBAN: sp.SOLUONG_MOBAN,
            DABAN_AO: sp.DABAN_AO
        }));
        const dataGuiDi = {
            ...thongTinChung,
            DanhSachSanPham: DanhSachSanPham
        };
        const formData = new FormData();
        for (const [key, value] of Object.entries(dataGuiDi)) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    for (const [subKey, subValue] of Object.entries(item)) {
                        formData.append(`${key}[${index}][${subKey}]`, subValue);
                    }
                });
            } else {
                formData.append(key, value);
            }
        }
        const kiemtra = fun.KiemTraRong(thongTinChung);
        if (!kiemtra.Status) {
            ThongBao.ThongBao_Loi('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        const kiemtra2 = fun.isFormDataEmpty(formData);
        if (kiemtra2) {
            ThongBao.ThongBao_Loi('Vui lòng thêm ít nhất một sản phẩm vào Flash Sale!');
            return;
        }
        try {
            const res = await API.CallAPI(formData, { PhuongThuc: 1, url: '/admin/them_flashsale' });
            if(res.Validate){
                const errors = {};
                res.errors.forEach(err => {
                    const key = err.path.includes('.') 
                        ? err.path.split('.').slice(1).join('.') 
                        : err.path;
                    errors[key] = err.msg;
                });
                setErrValidate(errors);
            } else if(res.ThanhCong){
                ThongBao.ThongBao_ThanhCong('Thêm chiến dịch Flash Sale thành công!');
                setErrValidate({});
                setThongTinChung({
                    TenChienDich: '',
                    TrangThai: 'active',
                    MauNen: '',
                    BatDau: '',
                    KetThuc: ''
                });
                setSanPham([]);
            } else {
                ThongBao.ThongBao_Loi(res.message || 'Thêm chiến dịch Flash Sale thất bại!');
            }
        } catch (error) {
            ThongBao.ThongBao_Loi('Đã xảy ra lỗi khi thêm chiến dịch Flash Sale!');
            console.error('Lỗi khi gọi API:', error);
            setErrValidate({});
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <main className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <div className="p-6">
                    {/* THÔNG TIN CHUNG */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold border-b pb-3 mb-4">Thông tin chung</h2>
                         {
                        Object.keys(errValidate).length > 0 && (
                            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
                                <h3 className="font-semibold mb-2">Có lỗi xảy ra:</h3>
                                <ul className="list-disc list-inside">
                                    {Object.entries(errValidate).map(([key, msg]) => (
                                        <li key={key}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên chiến dịch</label>
                                <input
                                    name="TenChienDich"
                                    value={thongTinChung.TenChienDich}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                <select
                                    name="TrangThai"
                                    value={thongTinChung.TrangThai}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="active">Đang Bật (Active)</option>
                                    <option value="inactive">Đã Tắt (Inactive)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Màu nền</label>
                                <input
                                    name="MauNen"
                                    value={thongTinChung.MauNen}
                                    onChange={handleInputChange}
                                    type="color"
                                    className="w-full h-[42px] border border-gray-300 rounded-md p-1 cursor-pointer"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bắt đầu lúc</label>
                                <input
                                    name="BatDau"
                                    value={thongTinChung.BatDau}
                                    onChange={handleInputChange}
                                    type="datetime-local"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kết thúc lúc</label>
                                <input
                                    name="KetThuc"
                                    value={thongTinChung.KetThuc}
                                    onChange={handleInputChange}
                                    type="datetime-local"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* DANH SÁCH SẢN PHẨM */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-lg font-semibold">Sản phẩm khuyến mãi ({SanPham.length})</h2>
                            <button onClick={() => OpenMoDal(undefined, { TenTrang: 'ThemSanPham', TieuDe: 'Thêm sản phẩm vào Flash Sale' })} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                                + Thêm Sản Phẩm
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Sản phẩm</th>
                                        <th className="px-4 py-3 font-medium">Giá Gốc</th>
                                        <th className="px-4 py-3 font-medium">Giá Flash Sale</th>
                                        <th className="px-4 py-3 font-medium w-24">Mở bán</th>
                                        <th className="px-4 py-3 font-medium w-24">Đã bán (Ảo)</th>
                                        <th className="px-4 py-3 font-medium text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {SanPham.length === 0 ? (
                                        <tr><td colSpan="6" className="px-4 py-6 text-center text-gray-500">Chưa có sản phẩm.</td></tr>
                                    ) : (
                                        SanPham.map((sp) => (
                                            <tr key={sp.IDSANPHAM} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3 flex items-center gap-3">
                                                    <img src={`http://localhost:3001/${sp.HINHANH}`} alt="" className="w-10 h-10 object-cover rounded" />
                                                    <span className="font-medium text-gray-800 line-clamp-1">{sp.TENSANPHAM}</span>
                                                </td>
                                                <td className="px-4 py-3 line-through text-gray-400">{fun.formatCurrency(sp.GIABAN)}</td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={sp.GIAFLASHSALE || ''}
                                                        onChange={(e) => handleUpdateSP(sp.IDSANPHAM, 'GIAFLASHSALE', e.target.value)}
                                                        className="w-full border border-gray-300 rounded px-2 py-1 text-red-600 font-bold outline-none focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={sp.SOLUONG_MOBAN || 0}
                                                        onChange={(e) => handleUpdateSP(sp.IDSANPHAM, 'SOLUONG_MOBAN', e.target.value)}
                                                        className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={sp.DABAN_AO || 0}
                                                        onChange={(e) => handleUpdateSP(sp.IDSANPHAM, 'DABAN_AO', e.target.value)}
                                                        className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <button onClick={() => XoaSP(sp.IDSANPHAM)} className="text-red-500 hover:text-red-700 font-medium">Xóa</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium mr-3">Hủy</button>
                        <button 
                            onClick={LuuChienDich}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md font-medium shadow-md transition"
                        >
                            Lưu Chiến Dịch
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ThemBanner;