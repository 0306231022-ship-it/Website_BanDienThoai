import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Bước 1: Nội dung hóa đơn đầy đủ chi tiết ---
const PrintableContent = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="bg-white p-8 sm:p-10">
            {/* Header hóa đơn */}
            <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                        Hóa Đơn <span className="text-blue-600">Nhập Kho</span>
                    </h1>
                    <div className="mt-4 space-y-1">
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">Mã phiếu:</span> #PO-2024001
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">Ngày nhập:</span> 24/05/2024
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-bold text-gray-800">MOBILE STORE PRO</h2>
                    <p className="text-sm text-gray-500">123 Đường Láng, Đống Đa, Hà Nội</p>
                    <p className="text-sm text-gray-500">Hotline: 0988.XXX.XXX</p>
                </div>
            </div>

            {/* Thông tin 2 bên: Nhà cung cấp & Nhân viên */}
            <div className="grid grid-cols-2 gap-8 my-10">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <h3 className="text-blue-600 uppercase text-xs font-bold mb-2 tracking-widest">Nhà Cung Cấp</h3>
                    <p className="font-bold text-gray-900 text-lg">Công ty TNHH Apple Vietnam</p>
                    <p className="text-sm text-gray-600 mt-1">📍 Khu công nghệ cao, TP. HCM</p>
                    <p className="text-sm text-gray-600">🆔 MST: 0102345678</p>
                </div>
                <div className="p-5 text-right">
                    <h3 className="text-gray-400 uppercase text-xs font-bold mb-2 tracking-widest">Nhân Viên Tiếp Nhận</h3>
                    <p className="font-bold text-gray-800 text-lg">Nguyễn Văn A</p>
                    <p className="text-sm text-gray-500">Bộ phận: Kho vận</p>
                    <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        ● Đã nhập kho
                    </span>
                </div>
            </div>

            {/* Bảng danh sách sản phẩm */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-4 px-4 text-xs font-bold uppercase">Sản Phẩm</th>
                            <th className="py-4 px-4 text-xs font-bold uppercase">IMEI/Serial</th>
                            <th className="py-4 px-4 text-xs font-bold uppercase text-center">SL</th>
                            <th className="py-4 px-4 text-xs font-bold uppercase text-right">Thành Tiền</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="py-4 px-4">
                                <p className="font-bold text-gray-800">iPhone 15 Pro Max 256GB</p>
                                <span className="text-xs text-blue-500">Màu: Titan Tự Nhiên</span>
                            </td>
                            <td className="py-4 px-4 text-xs font-mono text-gray-500">3582910XXXXXXX</td>
                            <td className="py-4 px-4 text-center font-bold">10</td>
                            <td className="py-4 px-4 text-right font-bold text-gray-900">285.000.000đ</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-4">
                                <p className="font-bold text-gray-800">Samsung Galaxy S24 Ultra</p>
                                <span className="text-xs text-blue-500">Màu: Đen Kim Cương</span>
                            </td>
                            <td className="py-4 px-4 text-xs font-mono text-gray-500">3511820XXXXXXX</td>
                            <td className="py-4 px-4 text-center font-bold">05</td>
                            <td className="py-4 px-4 text-right font-bold text-gray-900">120.000.000đ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Tổng cộng */}
            <div className="mt-8 flex justify-end">
                <div className="w-80 bg-gray-900 p-6 rounded-xl text-white shadow-xl">
                    <div className="flex justify-between text-sm opacity-70 mb-2">
                        <span>Tổng tiền hàng:</span>
                        <span>405.000.000đ</span>
                    </div>
                    <div className="flex justify-between text-sm opacity-70 mb-3">
                        <span>Thuế VAT (10%):</span>
                        <span>40.500.000đ</span>
                    </div>
                    <div className="flex justify-between text-xl font-black border-t border-white/20 pt-3">
                        <span>Tổng cộng:</span>
                        <span className="text-yellow-400">445.500.000đ</span>
                    </div>
                </div>
            </div>

            {/* Phần chữ ký */}
            <div className="mt-16 grid grid-cols-3 gap-4 text-center border-t border-dashed border-gray-200 pt-10">
                <div>
                    <p className="text-sm font-bold text-gray-800 uppercase">Người lập phiếu</p>
                    <div className="h-20"></div>
                    <p className="text-xs text-gray-400 italic">(Ký, họ tên)</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800 uppercase">Người giao hàng</p>
                    <div className="h-20"></div>
                    <p className="text-xs text-gray-400 italic">(Ký, họ tên)</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800 uppercase">Thủ kho</p>
                    <div className="h-20"></div>
                    <p className="text-xs text-gray-400 italic">(Ký, họ tên)</p>
                </div>
            </div>
        </div>
    );
});

// --- Bước 2: Component chính ---
const HoaDonNhapKho = () => {
    const componentRef = useRef();

    const handleDownloadPDF = async () => {
        const element = componentRef.current;
        if (!element) return;

        // Chụp ảnh chất lượng cao (scale 2 hoặc 3 để không bị vỡ chữ khi zoom PDF)
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Hoa_Don_Nhap_Kho_${new Date().getTime()}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
            {/* Khung hiển thị preview trên Web */}
            <div className="max-w-4xl w-full shadow-2xl rounded-2xl overflow-hidden bg-white mb-10">
                <PrintableContent ref={componentRef} />
            </div>

            {/* Nút bấm tải về */}
            <button 
                onClick={handleDownloadPDF} 
                className="flex items-center px-12 py-4 font-black text-lg text-white bg-blue-600 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all active:scale-95 group"
            >
                <svg className="w-6 h-6 mr-3 group-hover:bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                TẢI FILE PDF NGAY
            </button>
            <p className="mt-4 text-gray-400 text-sm italic">File sẽ được tải tự động sau khi xử lý xong (khoảng 1-2 giây).</p>
        </div>
    );
};

export default HoaDonNhapKho;