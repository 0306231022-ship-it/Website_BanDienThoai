import React, { createContext, useContext, useState } from "react";
const APIContext = createContext();
export function APIProvider({ children }) {
    const [loading, setLoading] = useState(false);
    let URL = 'http://localhost:3001/api';
    /**
     * Hàm duy nhất xử lý gọi API, hỗ trợ cả dữ liệu form và upload file.
     * @param {object | null} dulieu là 1 obj sau đó hàm sẽ chuyển về FROMDATA thông qua appendFormData
     * @param {object} yeucau - Đối tượng chứa thông tin yêu cầu (chứa thuộc tính 'url' , 'token' , 'fileArray' , 'PhuongThuc').
     * @returns {object} Kết quả trả về từ API hoặc đối tượng lỗi.
     */
    async function CallAPI( dulieu = null, yeucau) {
        setLoading(true);
        const DuongDan = URL + yeucau.url;
        let options = {
            method: yeucau.PhuongThuc===1 ? 'POST' : 'GET',
            credentials: 'include',
            headers: {}
        };
        if (yeucau.token) {
            options.headers['Authorization'] = `Bearer ${yeucau.token}`;
        }
        options.body = dulieu;
         try {
            const response = await fetch(DuongDan, options)
            if (!response.ok) {
                const errorText = await response.text();
                return {
                    status: false,
                    message: `Lỗi HTTP ${response.status} từ Server: ${errorText.substring(0, 50)}...`
                };
            }
            const ketqua = await response.json();
            return ketqua;
        } catch (error) {
            console.error('Lỗi fetch hoặc parsing JSON:', error);
            return {
                status: false,
                message: 'Lỗi khi truyền dữ liệu lên server hoặc lỗi mạng!'
            };
        } finally {
            setLoading(false);
        }
    }
    return (
        <APIContext.Provider value={{ CallAPI, loading }}>
            {children}
        </APIContext.Provider>
    );
}
export function useAPIContext() {
    return useContext(APIContext);
}