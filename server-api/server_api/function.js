export const TaoID = (bien) => {
const now = new Date();
    
    // Lấy thời gian hiện tại đến tận mili giây
    const timestamp = now.getTime(); // Ví dụ: 1738294857201
    
    // Tạo số ngẫu nhiên lớn (từ 100,000 đến 999,999)
    const randomPart = Math.floor(100000 + Math.random() * 900000);

    return `${bien}-${timestamp}-${randomPart}`;
};

export function mapFilesByProduct(files) {
    if (!Array.isArray(files)) return [];

    const result = [];
    // Đưa regex ra ngoài để tối ưu hiệu suất
    const INDEX_REGEX = /HinhAnh\[(\d+)\]/;

    for (const file of files) {
        // Kiểm tra file và fieldname tồn tại để tránh crash
        if (!file?.fieldname) continue;

        const match = file.fieldname.match(INDEX_REGEX);
        if (!match) continue;

        const index = parseInt(match[1], 10);

        if (!result[index]) {
            result[index] = [];
        }
        result[index].push(file);
    }

    // Tùy chọn: Loại bỏ các khoảng trống (empty items) nếu bạn muốn kết quả liên tục
    return result.filter(item => item !== undefined);
}