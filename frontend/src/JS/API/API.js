import React, { createContext, useContext, useState } from "react";
const APIContext = createContext();
export function APIProvider({ children }) {
  const [loading, setLoading]=useState(true);
  function DiaChi(code) {
    switch (code) {
      case 1: return 'http://localhost:3001/api/users/login';
      case 2: return 'http://localhost:3001/api/admin/kiemtra';
      case 3: return 'http://localhost:3001/api/admin/DangNhap';
      case 4: return 'http://localhost:3001/api/admin/DangXuat';
      case 5: return 'http://localhost:3001/api/admin/ThongTinWebsite';
      case 6: return 'http://localhost:3001/api/admin/updateWebsite';
      default:return 'http://localhost:5000/unknown';
    }
  }
  async function CallAPI(token = null, dulieu = null, yeucau) {
    const DuongDan = DiaChi(yeucau?.DiaChi || 0);
    const bodyData = {
      data: dulieu || {}
    };
    let options = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const response = await fetch(DuongDan, options);
      const ketqua = await response.json();
      return ketqua;
    } catch (error) {
      console.error("Lỗi khi gọi CallAPI:", error); // Thêm log để dễ debug
      return {
        status: false,
        message: 'Lỗi khi truyền dữ liệu lên server!'
      };
    }finally{
      setLoading(false);
    }
  }
  async function CallAPI_file(DuLieu = null, file, yeucau) {
    const DuongDan = DiaChi(yeucau?.DiaChi || 0);
    const DataForm = new FormData();
    DataForm.append("Dulieu", JSON.stringify(DuLieu || {}));
    file.forEach((f) => {
      DataForm.append("images", f);
    });
    let options = {
      method: 'POST',
      credentials: 'include',
      body: DataForm
    };
    try {
      const response = await fetch(DuongDan, options);
      const ketqua = await response.json();
      return ketqua;
    } catch (error) {
      console.error("Lỗi khi gọi CallAPI_file:", error); // Thêm log để dễ debug
      return {
        status: false,
        message: 'Lỗi khi truyền dữ liệu lên server!'
      };
    }finally{
      setLoading(false);
    }
  }
  return (
    <APIContext.Provider value={{ CallAPI, CallAPI_file, loading }}>
      {children}
    </APIContext.Provider>
  );
}
export function useAPIContext() {
  return useContext(APIContext);
}


