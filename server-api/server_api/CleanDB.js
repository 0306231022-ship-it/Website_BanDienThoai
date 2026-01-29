import cron from 'node-cron';
import PhieuNhapModal from './models/PhieuNhapMoDel.js';
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

console.log('Cron Job đã được kích hoạt...');