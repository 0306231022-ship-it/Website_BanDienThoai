import React, { createContext, useContext, useState } from "react";
import * as fun from '../FUNCTONS/function';
const APIContext = createContext();
export function APIProvider({ children }) {
  const [loading, setLoading]=useState(true);
  let URL='http://localhost:3001/api';
  async function CallAPI(token = null, dulieu = null, yeucau) {
    const DuongDan = URL + yeucau.url;
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
      return {
        status: false,
        message: 'Lỗi khi truyền dữ liệu lên server!'
      };
    }finally{
      setLoading(false);
    }
  }
  async function CallAPI_file(DuLieu = null, file, yeucau) {
    const DuongDan = URL + yeucau.url;
    const DataForm = new FormData();
    fun.appendFormData(DataForm, { Dulieu: DuLieu });
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