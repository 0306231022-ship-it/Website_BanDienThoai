 export function KiemTraRong(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            if (!KiemTraRong(value)) return false; 
        } 
        else if (
            value === "" || 
            value === null || 
            value === undefined
        ) {
            return false;
        }
    }

    return true; 
}

export function resetGiaTri(obj) {
    if (typeof obj !== "object" || obj === null) return;
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            resetGiaTri(value);
        } 
        else if (Array.isArray(value)) {
            obj[key] = []; 
        }
        else {
            obj[key] = "";
        }
    }
}
// Hàm chuyển đổi object thành FormData, bao gồm cả object lồng nhau
export function appendFormData(formData, data, parentKey = "") {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const fieldKey = parentKey ? `${parentKey}[${key}]` : key;
      if (typeof data[key] === "object" && data[key] !== null) {
        appendFormData(formData, data[key], fieldKey);
      } else {
        formData.append(fieldKey, data[key]);
      }
    }
  }
}
// Hàm kiểm tra định dạng số điện thoại Việt Nam
export const validatePhone = (value) => {
    const regex = /^(0|\+84)(\d{9,10})$/;
    if (!regex.test(value)) {
      return false;
    } else {
      return true;
    }
  };
// Hàm kiểm tra định dạng email
export const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!regex.test(value)) {
      return false;
    } else {
      return true;
    } 
  };
//hàm kiểm tra image
export const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']; 
    if (!allowedTypes.includes(file.type)) {
      return false;
    } else {
      return true;
    }
  };


