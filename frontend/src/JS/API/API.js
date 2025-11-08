// 🧭 Hàm xác định đường dẫn (giống backend)
function DiaChi(code) {
  switch (code) {
    case 1: return 'http://localhost:3001/api/users/login';
    default: return 'http://localhost:5000/unknown';
  }
}

export async function CallAPI(dulieu = null, yeucau) {
  const DuongDan = DiaChi(yeucau.DiaChi);

  const bodyData = {
    data: dulieu || {}
  };

  let options = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData)
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
  }
}

