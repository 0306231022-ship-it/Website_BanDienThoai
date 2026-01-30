import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import * as API from '../../../../JS/API/API';
import { useAppContext } from '../../../../CONTEXT/TrangChuAdmin';

const HoaDonNhapKho = () => {
    const { id } = useParams();
    const { TTwebsite } = useAppContext();
    const componentRef = useRef();
    const [DuLieu_hoadon, setDuLieu] = useState({});
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const laydl = async () => {
            setloading(true);
            try {
                const laydata = await API.CallAPI(undefined, { 
                    url: `/admin/dulieu_hoadon_nhapkho?id=${id}`, 
                    PhuongThuc: 2 
                });
                if (laydata.ThanhCong) {
                    setDuLieu({
                        ...laydata.DuLieu,
                        idphieunhap: id,
                        ThongTinWebsite: TTwebsite
                    });
                }
            } catch (error) {
                console.error('Lỗi xảy ra: ' + error);
            } finally {
                setloading(false);
            }
        };
        laydl();
    }, [id, TTwebsite]);

    // --- LOGIC TÍNH TOÁN TIỀN ---
    const thueVAT = 0.1; // 10% cho hợp lý thực tế
    const tongTienHang = DuLieu_hoadon.SANPHAM?.reduce((total, item) => total + (item.SOLUONG * item.GIANHAP), 0) || 0;
    const tienThue = tongTienHang * thueVAT;
    const tongThanhToan = tongTienHang + tienThue;

    const handleDownloadPDF = async () => {
        const element = componentRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 3, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`PhieuNhap_${id}.pdf`);
    };

    const formatVND = (so) => new Intl.NumberFormat('vi-VN').format(Math.round(so || 0)) + ' ₫';

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-200 py-10 px-4 flex flex-col items-center font-sans">
            
            <div className="max-w-4xl w-full shadow-2xl bg-white relative overflow-hidden rounded-sm">
                <div ref={componentRef} className="p-12 relative text-slate-800">
                    
                    {/* Header: Thương hiệu & Tiêu đề */}
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-blue-700 tracking-tighter mb-1 uppercase">
                                {DuLieu_hoadon.ThongTinWebsite?.TenWebsite || "MOBILE STORE"}
                            </h2>
                            <div className="text-[11px] text-slate-500 space-y-1 uppercase font-semibold">
                                <p>{DuLieu_hoadon.ThongTinWebsite?.DiaChi}</p>
                                <p>Hotline: {DuLieu_hoadon.ThongTinWebsite?.Zalo}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h1 className="text-4xl font-black text-slate-900 uppercase">Phiếu Nhập Kho</h1>
                            <p className="font-mono text-sm mt-1 text-slate-500">Mã chứng từ: <span className="text-blue-600 font-bold">#{DuLieu_hoadon.idphieunhap}</span></p>
                            <p className="text-xs text-slate-400 italic">Ngày nhập: {new Date(DuLieu_hoadon.PhieuNhap).toLocaleDateString("vi-VN")}</p>
                        </div>
                    </div>

                    <div className="flex gap-10 mb-10 py-6 border-y border-slate-100">
                        <div className="flex-1">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Đơn vị cung cấp</h4>
                            <p className="text-md font-bold uppercase">{DuLieu_hoadon?.ThongTinNCC.Ten}</p>
                            <p className="text-xs text-slate-500 mt-1 italic">{DuLieu_hoadon?.ThongTinNCC?.DiaChi}</p>
                            <p className="text-xs text-slate-500">MST: {DuLieu_hoadon?.ThongTinNCC?.mst}</p>
                        </div>
                        <div className="flex-1 border-l border-slate-100 pl-10">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nhân viên tiếp nhận</h4>
                            <p className="text-md font-bold uppercase">{DuLieu_hoadon?.NguoiNhap?.HoTen}</p>
                            <p className="text-xs text-slate-500 mt-1 italic">Bộ phận: Kho vận & Kỹ thuật</p>
                            <p className="text-xs text-green-600 font-bold uppercase mt-1 italic">● Đã kiểm định chất lượng</p>
                        </div>
                    </div>

                    {/* Table Sản phẩm */}
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="py-3 px-4 text-left text-[11px] uppercase tracking-wider">STT</th>
                                <th className="py-3 px-4 text-left text-[11px] uppercase tracking-wider">Mô tả hàng hóa</th>
                                <th className="py-3 px-4 text-center text-[11px] uppercase tracking-wider">Số lượng</th>
                                <th className="py-3 px-4 text-right text-[11px] uppercase tracking-wider">Đơn giá</th>
                                <th className="py-3 px-4 text-right text-[11px] uppercase tracking-wider">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 border-b border-slate-900">
                            {DuLieu_hoadon.SANPHAM?.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-4 px-4 text-sm text-slate-400">{index + 1}</td>
                                    <td className="py-4 px-4">
                                        <p className="font-bold text-sm uppercase">{item.TENSANPHAM}</p>
                                        <p className="text-[10px] text-blue-500 font-bold tracking-tighter italic">IMEI: {item.MA_IMEI || 'Đang cập nhật'}</p>
                                    </td>
                                    <td className="py-4 px-4 text-center font-bold text-sm">{item.SOLUONG}</td>
                                    <td className="py-4 px-4 text-right text-sm">{formatVND(item.GIANHAP)}</td>
                                    <td className="py-4 px-4 text-right font-bold text-sm">{formatVND(item.SOLUONG * item.GIANHAP)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Footer tính tiền */}
                    <div className="flex justify-end">
                        <div className="w-72 space-y-3">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Cộng tiền hàng:</span>
                                <span className="font-medium">{formatVND(tongTienHang)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Thuế GTGT (VAT 10%):</span>
                                <span className="font-medium">{formatVND(tienThue)}</span>
                            </div>
                            <div className="flex justify-between py-3 px-4 bg-slate-900 text-white rounded-lg shadow-lg">
                                <span className="font-bold uppercase text-xs">Tổng thanh toán:</span>
                                <span className="text-lg font-black text-yellow-400">{formatVND(tongThanhToan)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Chữ ký */}
                    <div className="mt-20 grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-20 italic">
                            <p className="text-xs font-bold uppercase not-italic">Đại diện bên nhận</p>
                            <p className="text-sm font-bold not-italic underline">{DuLieu_hoadon?.NguoiNhap?.HoTen}</p>
                        </div>
                        <div className="space-y-20 italic">
                            <p className="text-xs font-bold uppercase not-italic">Người giao hàng</p>
                            <p className="text-xs text-slate-300">(Ký và ghi rõ họ tên)</p>
                        </div>
                        <div className="space-y-20 italic">
                            <p className="text-xs font-bold uppercase not-italic">Kế toán trưởng</p>
                            <p className="text-xs text-slate-300">(Ký và ghi rõ họ tên)</p>
                        </div>
                    </div>

                    <div className="mt-16 text-center border-t border-slate-100 pt-6">
                        <p className="text-[10px] text-slate-400 tracking-[3px] uppercase italic">Hóa đơn điện tử chuyển đổi từ phiếu nhập kho hệ thống</p>
                    </div>
                </div>
            </div>

            {/* Nút thao tác */}
            <div className="mt-8 flex gap-4">
                <button onClick={() => window.history.back()} className="px-8 py-3 bg-white text-slate-600 font-bold rounded-lg border border-slate-300 hover:bg-slate-50 transition-all shadow-md">QUAY LẠI</button>
                <button onClick={handleDownloadPDF} className="flex items-center px-10 py-3 font-black text-white bg-blue-700 rounded-lg shadow-xl hover:bg-blue-800 transition-all hover:-translate-y-1">
                    <i className="fa-solid fa-file-pdf mr-2"></i> XUẤT HÓA ĐƠN PDF
                </button>
            </div>
        </div>
    );
};

export default HoaDonNhapKho;