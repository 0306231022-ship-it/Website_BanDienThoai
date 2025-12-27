export async function CallAPI(dulieu = null, yeucau) {
    const URL = 'http://localhost:3001/api';
    const DuongDan = URL + yeucau.url;
    let options = {};
    if (yeucau.fileArray) {
        if (dulieu === null) {
            dulieu = new FormData();
        }
        yeucau.fileArray.forEach(file => {
            dulieu.append("files", file);
        });
    }
    if (yeucau.PhuongThuc === 1) {
        options = {
            method: "POST",
            credentials: "include",
            headers: {},
            body: dulieu
        };
    }
    if (yeucau.PhuongThuc === 2) {
        options = {
            method: "GET",
            credentials: "include" 
        };
    }
    if (yeucau.token) {
        options.headers = {
            ...(options.headers || {}),
            Authorization: `Bearer ${yeucau.token}`
        };
    }

    try {
        const response = await fetch(DuongDan, options);
        if (!response.ok) {
            const errorText = await response.text();
            return {
                Status: true,
                message: `Lỗi HTTP ${response.status}: ${errorText.substring(0, 50)}...`
            };
        }

        return await response.json();
    } catch (error) {
        return {
            Status: true,
            message: "Không thể kết nối đến hệ thống, vui lòng thử lại sau!"
        };
    }
}
