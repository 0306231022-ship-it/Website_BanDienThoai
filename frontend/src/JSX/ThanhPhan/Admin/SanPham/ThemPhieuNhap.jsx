import {Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as API from '../../../../JS/API/API';
function ThemPhieuNhap(){
    const [NhaCungCap,setNhaCungCap]=useState([])
    const [err,seterr] = useState('')
    useEffect(()=>{
        const LayDL=async ()=>{
             try {
                const ketQua= await API.CallAPI(undefined,{url:'/admin/laynhacchoatdong', PhuongThuc:2});
                if(ketQua.Satus){
                    seterr(ketQua.message);
                    return;
                };
                if(ketQua.ThanhCong){
                    setNhaCungCap(ketQua.DuLieu);
                    return;
                }
            } catch (error) {
                seterr('Đã có lỗi xảy ra! Vui lòng thực hiện sau.');
                return;
            }
        }
        LayDL();
    },[])
    useEffect(()=>{
        const LayDl=async()=>{
            const ketqua=
        }
    })
    return (
        <>
                   <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700 uppercase">
                <i className="fa-solid fa-boxes-packing mr-2"></i> Phiếu Nhập Kho
            </h1>
            <div>
                <Link to='/admin/PhieuNhapHang' className="bg-teal-600 hover:bg-gray-600 text-white px-4 py-2 rounded shadow transition">
                    <i className="fa-solid fa-arrow-left"></i> Quay lại
                </Link>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-blue-600">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">1. Thông tin chung</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhà cung cấp (Supplier)</label>
                    <div>
    {NhaCungCap && NhaCungCap.length > 0 ? (
        /* TRƯỜNG HỢP 1: CÓ DỮ LIỆU -> HIỆN SELECT */
        <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2">
            <option value="">-- Chọn nhà cung cấp --</option>
            {NhaCungCap.map((item, index) => (
                <option key={index} value={item.IDNCC}>
                    {item.TENNCC || item.TƯNNCC} {/* Sửa lại tên trường cho đúng API của bạn */}
                </option>
            ))}
        </select>
    ) : (
        /* TRƯỜNG HỢP 2: KHÔNG CÓ DỮ LIỆU -> HIỆN DIV THÔNG BÁO ĐẸP */
        <div className="group flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-white group-hover:text-blue-500 transition-colors">
                <i className="fa-solid fa-shop-slash text-xl text-gray-400"></i>
            </div>

            <div className="flex-1">
                <p className="text-gray-500 italic font-medium group-hover:text-blue-600">
                    Chưa có nhà cung cấp nào
                </p>
                <p className="text-xs text-gray-400 mt-1">Bấm để chọn hoặc thêm mới</p>
            </div>

            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-blue-400"></i>
        </div>
    )}
</div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhân viên nhập</label>
                    <input type="text" value="Nguyễn Văn A (ID: USR001)" readonly className="w-full bg-gray-100 border-gray-300 rounded-md p-2 text-gray-500 cursor-not-allowed border"/>
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú phiếu nhập</label>
                <textarea rows="2" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2" placeholder="Ví dụ: Nhập hàng đợt 1 tháng 10, hàng khuyến mãi kèm theo..."></textarea>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-green-600">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex justify-between items-center">
                <span>2. Nhập chi tiết điện thoại</span>
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Điền thông tin và bấm "Thêm vào danh sách"</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                <div className="md:col-span-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                        <input type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500" placeholder="VD: iPhone 14 Pro Max 256GB"/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hãng (Brand)</label>
                            <select className="mt-1 w-full border border-gray-300 rounded-md p-2">
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Oppo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dòng máy</label>
                            <input type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" placeholder="VD: 14 Series"/>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">Giá nhập (VNĐ)</label>
                            <input type="number" className="mt-1 w-full border border-gray-300 rounded-md p-2 font-semibold text-blue-600" placeholder="0"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giá bán dự kiến (VNĐ)</label>
                            <input type="number" className="mt-1 w-full border border-gray-300 rounded-md p-2 text-green-600" placeholder="0"/>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                    <label className="block text-sm font-medium text-gray-700 border-b w-max border-gray-300">Thông số kỹ thuật</label>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500">Hệ điều hành</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1.5 text-sm" placeholder="iOS / Android"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Màn hình</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1.5 text-sm" placeholder="6.7 inch OLED"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">RAM</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1.5 text-sm" placeholder="6 GB"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Bộ nhớ trong</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1.5 text-sm" placeholder="128 GB"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Pin</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1.5 text-sm" placeholder="4323 mAh"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Màu sắc</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-1.5 text-sm" placeholder="Deep Purple"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-2">Mô tả sản phẩm</label>
                        <textarea rows="3" className="w-full border border-gray-300 rounded-md p-2 text-sm" placeholder="Đặc điểm nổi bật..."></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 cursor-pointer">
                            <div className="space-y-1 text-center">
                                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400"></i>
                                <div className="flex text-sm text-gray-600">
                                    <span className="font-medium text-green-600 hover:text-green-500">Tải ảnh lên</span>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG tối đa 5MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3 bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col">
                    <h3 className="font-bold text-blue-800 mb-3"><i className="fa-solid fa-barcode mr-1"></i> Quản lý Kho & IMEI</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Số lượng nhập</label>
                        <input type="number" value="1" min="1" className="mt-1 w-full border-2 border-blue-300 rounded-md p-2 text-center text-xl font-bold text-blue-700 focus:border-blue-500"/>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Danh sách IMEI 
                            <span className="text-xs font-normal text-red-500">(Mỗi dòng 1 mã)</span>
                        </label>
                        <textarea className="imei-scroll flex-1 w-full border border-gray-300 rounded-md p-2 font-mono text-sm bg-white focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Quét mã vạch hoặc nhập tay...&#10;893000123...&#10;893000124..."></textarea>
                        <div className="text-right text-xs text-gray-500 mt-1">Đã nhập: <span className="font-bold text-blue-600">0</span> / <span className="font-bold">1</span></div>
                    </div>

                    <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded shadow flex items-center justify-center gap-2 transition">
                        <i className="fa-solid fa-plus-circle"></i> Thêm vào phiếu
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-700">3. Danh sách hàng chờ nhập</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Tổng SP: 2</span>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">STT</th>
                            <th scope="col" className="px-6 py-3">Sản phẩm</th>
                            <th scope="col" className="px-6 py-3">Thông số</th>
                            <th scope="col" className="px-6 py-3 text-center">SL</th>
                            <th scope="col" className="px-6 py-3">Giá nhập</th>
                            <th scope="col" className="px-6 py-3">Thành tiền</th>
                            <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                iPhone 13 Pro Max
                                <div className="text-xs text-gray-500 mt-1">IMEI: <span className="italic text-blue-500 cursor-pointer hover:underline" title="Xem danh sách">Đã nhập 5 mã</span></div>
                            </td>
                            <td className="px-6 py-4">
                                256GB / Gold<br/>
                                <span className="text-xs">iOS, 6GB RAM</span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold">5</td>
                            <td className="px-6 py-4">20,000,000 ₫</td>
                            <td className="px-6 py-4 font-bold text-gray-900">100,000,000 ₫</td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-blue-600 hover:text-blue-900 mr-2"><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className="text-red-600 hover:text-red-900"><i className="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                Samsung S23 Ultra
                                <div className="text-xs text-gray-500 mt-1">IMEI: <span className="italic text-blue-500 cursor-pointer hover:underline">Đã nhập 2 mã</span></div>
                            </td>
                            <td className="px-6 py-4">
                                512GB / Black<br/>
                                <span className="text-xs">Android, 12GB RAM</span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold">2</td>
                            <td className="px-6 py-4">25,000,000 ₫</td>
                            <td className="px-6 py-4 font-bold text-gray-900">50,000,000 ₫</td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-blue-600 hover:text-blue-900 mr-2"><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className="text-red-600 hover:text-red-900"><i className="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-t border-gray-200 sticky bottom-0 z-10">
            <div className="flex flex-col md:flex-row justify-end items-end gap-6">
                
                <div className="w-full md:w-1/3 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tổng tiền hàng:</span>
                        <span className="font-bold">150,000,000 ₫</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Đã thanh toán:</label>
                        <input type="number" className="w-40 border border-gray-300 rounded p-1 text-right focus:ring-blue-500" value="50000000"/>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-red-600 border-t pt-2">
                        <span>Còn nợ NCC:</span>
                        <span>100,000,000 ₫</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded shadow transition">
                        Lưu nháp
                    </button>
                    <button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded shadow transition flex items-center">
                        <i className="fa-solid fa-check mr-2"></i> HOÀN TẤT NHẬP KHO
                    </button>
                </div>
            </div>
        </div>

    </div>
        </>
    )
};
export default ThemPhieuNhap