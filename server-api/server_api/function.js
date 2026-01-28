import crypto from 'crypto';
export const TaoID = (bien) => {
    const prefix = bien.toString().slice(0, 2);
    const timePart = Date.now().toString().slice(-4);
    const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
    return `${prefix}-${timePart}-${randomPart}`;
};

export function mapFilesByProduct(files) {
    if (!Array.isArray(files)) return [];

    const result = [];
   
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