//Hàm tạo id cho bảng
export const TaoID=(bien)=>{
     const today = new Date();
     const month = today.getMonth() + 1;
     const ID = `${bien}-${today.getFullYear().toString().slice(-2)}${month < 10 ? '0' + month : month}-${Math.floor(1000 + Math.random() * 9000)}`;
     return ID;
}
export function mapFilesByProduct(files) {
    const result = [];

    for (const file of files) {
        const match = file.fieldname.match(/HinhAnh\[(\d+)\]/);
        if (!match) continue;

        const index = parseInt(match[1]);

        if (!result[index]) result[index] = [];
        result[index].push(file);
    }

    return result;
}