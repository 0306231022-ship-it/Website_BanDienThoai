import cron from 'node-cron';
import PhieuNhapModal from './models/PhieuNhapMoDel.js';
import DonHangModel from './models/DonHang.js';

cron.schedule('0 0 0 * * *', async () => {
    console.log('--- Bắt đầu tiến trình tự động 12h đêm ---');
    //0 0 0 * * * 12h đêm mỗi ngày'
    // 5s 1 lần : '*/5 * * * * *'
    try {
        const XoaThungRac= await PhieuNhapModal.XoaPhieuNhap_ThungRac();
        if (XoaThungRac.ThanhCong)
            console.log('Xóa phiếu nhập trong thùng rác thành công!');
        else
            console.log('Xóa phiếu nhập trong thùng rác thất bại!');

    } catch (error) {
        console.error('Lỗi khi thực hiện tác vụ tự động:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh" 
});
// Thay đổi '**/10' thành '*/10'
cron.schedule('*0 */15 * * * *', async () => {
    console.log(`--- [${new Date().toLocaleTimeString()}] Đang kiểm tra đơn hàng hết hạn ---`);
    try {
        const result = await DonHangModel.XoaDonHang_Tam_HetHan();
        
        if (result && result.ThanhCong) {
            // Chỉ log khi thực sự có hành động xóa để tránh rác màn hình console
            console.log('Kết quả: Hoàn tất kiểm tra.');
        }
    } catch (error) {
        console.error('Lỗi thực thi tác vụ 10 giây:', error.message);
    }
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh" 
});

console.log('Cron Job đã được kích hoạt...');
// Chuyển trạng thái mã giảm giá đã hết hạn
// Chuyển trạng thái banner đã hết hạn
