 export function KiemTraRong(obj) {
    // Nếu không phải object hoặc là null → coi như không hợp lệ
    if (typeof obj !== "object" || obj === null) return false;

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];

        // Nếu value là object → kiểm tra đệ quy
        if (typeof value === "object" && value !== null) {
            if (!KiemTraRong(value)) return false; // Nếu con object có giá trị rỗng → dừng ngay
        } 
        // Nếu value là chuỗi hoặc mảng rỗng → trả false
        else if (
            value === "" || 
            value === null || 
            value === undefined
        ) {
            return false;
        }
    }

    return true; // Không có giá trị nào rỗng
}

export function resetGiaTri(obj) {
    // Nếu không phải object hoặc null thì bỏ qua
    if (typeof obj !== "object" || obj === null) return;

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];

        // Nếu là object lồng bên trong → reset đệ quy
        if (typeof value === "object" && value !== null) {
            resetGiaTri(value);
        } 
        // Nếu là mảng → reset từng phần tử
        else if (Array.isArray(value)) {
            obj[key] = []; 
        }
        // Còn lại là kiểu dữ liệu đơn giản → gán rỗng
        else {
            obj[key] = "";
        }
    }
}

