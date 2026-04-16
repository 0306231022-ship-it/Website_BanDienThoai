import React from 'react';
import { useNavigate } from 'react-router-dom';

function HoaDon() {
    const navigate = useNavigate();

    return (
        <>
            {/* Thanh công cụ: Chứa nút Quay lại và nút In */}
            <div className="max-w-[210mm] mx-auto mb-4 flex justify-between items-center no-print px-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-gray-600 hover:text-blue-600 font-bold transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Quay lại
                </button>

                <button 
                    onClick={() => window.print()} 
                    className="bg-blue-600 text-white px-5 py-2 rounded font-bold hover:bg-blue-700 transition shadow-md flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    In hóa đơn (A4)
                </button>
            </div>

            {/* Bắt đầu Tờ Hóa Đơn */}
            <div className="max-w-[210mm] min-h-[280mm] mx-auto bg-white p-10 print-shadow-none shadow-xl border border-gray-200">
                
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">GEMINI STORE</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Hóa đơn giá trị gia tăng (VAT)</p>
                        <div className="mt-4 text-sm space-y-1">
                            <p><strong>Địa chỉ:</strong> 99 Tô Hiến Thành, Quận 10, TP.HCM</p>
                            <p><strong>Hotline:</strong> 1900 1234 - <strong>MST:</strong> 0312345678</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-800">SỐ ĐƠN: #88293</h2>
                        <p className="text-sm text-gray-600">Ngày xuất: 16/04/2026</p>
                        <div className="mt-4 inline-block border-2 border-green-600 px-3 py-1 text-green-600 font-bold text-xs rounded uppercase">
                            Đã thanh toán
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 my-8 pb-6 border-b border-gray-100">
                    <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase mb-2">Thông tin người mua</h3>
                        <p className="font-bold text-gray-800">Nguyễn Văn A</p>
                        <p className="text-sm text-gray-600">SĐT: 090 123 4567</p>
                        <p className="text-sm text-gray-600 leading-snug mt-1">Địa chỉ: 123 Đường ABC, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh</p>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase mb-2">Hình thức thanh toán</h3>
                        <p className="text-sm text-gray-800 font-medium">Chuyển khoản Ngân hàng (Vietcombank)</p>
                        <p className="text-sm text-gray-500 mt-1 italic">Ghi chú: Giao hàng giờ hành chính</p>
                    </div>
                </div>

                <div className="min-h-[400px]">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-50 uppercase text-[10px] font-bold tracking-wider text-gray-600">
                                <th className="px-4 py-3 border">STT</th>
                                <th className="px-4 py-3 border">Tên hàng hóa, dịch vụ</th>
                                <th className="px-4 py-3 border text-center">SL</th>
                                <th className="px-4 py-3 border text-right">Đơn giá</th>
                                <th className="px-4 py-3 border text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr>
                                <td className="px-4 py-3 border text-center">1</td>
                                <td className="px-4 py-3 border">
                                    <p className="font-bold text-gray-800">iPhone 15 Pro Max 256GB</p>
                                    <p className="text-[10px] text-gray-400">Blue Titanium - BH 12 tháng</p>
                                </td>
                                <td className="px-4 py-3 border text-center">01</td>
                                <td className="px-4 py-3 border text-right">30.000.000đ</td>
                                <td className="px-4 py-3 border text-right font-bold">30.000.000đ</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 border text-center">2</td>
                                <td className="px-4 py-3 border font-bold text-gray-800">Ốp lưng Silicone MagSafe</td>
                                <td className="px-4 py-3 border text-center">02</td>
                                <td className="px-4 py-3 border text-right">500.000đ</td>
                                <td className="px-4 py-3 border text-right font-bold">1.000.000đ</td>
                            </tr>
                            <tr><td className="px-4 py-6 border" colSpan="5"></td></tr>
                        </tbody>
                    </table>
                </div>

                <div className=" flex justify-end">
                    <div className="w-1/2 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Cộng tiền hàng:</span>
                            <span className="font-medium text-gray-800">31.000.000đ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Thuế suất GTGT (10%):</span>
                            <span className="font-medium text-gray-800">3.100.000đ</span>
                        </div>
                        <div className="flex justify-between text-sm border-b pb-2">
                            <span className="text-gray-500">Phí vận chuyển:</span>
                            <span className="text-green-600 font-medium">0đ</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-base font-black text-gray-900 uppercase">Tổng tiền thanh toán:</span>
                            <span className="text-xl font-black text-blue-700 tracking-tighter">34.100.000đ</span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic text-right mt-1">Bằng chữ: Ba mươi tư triệu một trăm nghìn đồng./.</p>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-2 text-center text-sm">
                    <div>
                        <p className="font-bold uppercase">Người mua hàng</p>
                        <p className="text-[10px] text-gray-400 italic">(Ký, ghi rõ họ tên)</p>
                    </div>
                    <div>
                        <p className="font-bold uppercase">Người bán hàng</p>
                        <div className="my-2 flex justify-center">
                             <div className="border border-red-400 p-1 text-[8px] text-red-500 uppercase font-black rotate-[-5deg]">
                                Đã xác thực bởi Gemini Store CA
                             </div>
                        </div>
                        <p className="font-bold">Hệ thống Gemini Store</p>
                    </div>
                </div>

                <div className="mt-20 border-t border-gray-100 pt-4 text-center">
                    <p className="text-[10px] text-gray-400">Cảm ơn Quý khách đã mua hàng! Vui lòng giữ hóa đơn để bảo hành sản phẩm.</p>
                    <p className="text-[9px] text-gray-300 mt-1 tracking-widest uppercase">www.geministore.vn</p>
                </div>
            </div>
        </>
    );
}

export default HoaDon;