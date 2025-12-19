export async function CallAPI(dulieu = null, yeucau) {
    let URL = 'http://localhost:3001/api';
    const DuongDan = URL + yeucau.url;
    if (yeucau.fileArray) {
        if (dulieu === null) {
            dulieu = new FormData();
        }
        yeucau.fileArray.forEach((file, index) => {
            dulieu.append("files", file);
        });
    }
    let options = {
        method: yeucau.PhuongThuc === 1 ? "POST" : "GET",
        credentials: "include",
        headers: {}
    };
    if (yeucau.token) {
        options.headers["Authorization"] = `Bearer ${yeucau.token}`;
    }
    if (options.method === "POST") {
        options.body = dulieu;
    }
    try {
        const response = await fetch(DuongDan, options);
        if (!response.ok) {
            const errorText = await response.text();
            //Chưa xử lí lỗi khi return
            return {
                Status: false,
                message: `Lỗi HTTP ${response.status} từ Server: ${errorText.substring(0, 50)}...`
            };
        }
        const ketqua = await response.json();
        return ketqua;
    } catch (error) {
        return {
            Status: true,
            message: "Không thể kết nối đến hệ thống, Vui lòng thử lại sau!"
        };
    }
}