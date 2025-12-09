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
export function objectToFormData(obj, formData = new FormData(), parentKey = '') {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) { 
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];
      if (value instanceof File || value instanceof Blob) {
        formData.append(propName, value, value.name);
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        objectToFormData(value, formData, propName);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${propName}[]`, item);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(propName, value);
      }
     
    }
  }
  return formData;
}
//hàm kiểm ta fromdata rỗng 
export function isFormDataEmpty(formData) {
  for (const pair of formData.entries()) {
    return false; 
  }
  return true; 
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


