import React, { useState } from 'react';

// 1. Cấu hình giao diện cho từng ngân hàng (Theme Config)
// Bạn chỉ cần thêm ngân hàng mới vào đây là xong, không cần sửa logic code
const BANK_THEMES = {
  VCB: {
    name: "Vietcombank",
    shortName: "VCB",
    gradient: "from-green-900 to-emerald-600",
    glowColor: "bg-lime-400/20",
    textColor: "text-emerald-100"
  },
  MB: {
    name: "MB Bank",
    shortName: "MB",
    gradient: "from-blue-900 to-indigo-600",
    glowColor: "bg-blue-400/20",
    textColor: "text-blue-100"
  },
  TCB: {
    name: "Techcombank",
    shortName: "TCB",
    gradient: "from-gray-900 to-red-900",
    glowColor: "bg-red-500/20",
    textColor: "text-red-100"
  },
  ACB: {
    name: "ACB Bank",
    shortName: "ACB",
    gradient: "from-blue-700 to-cyan-500",
    glowColor: "bg-cyan-300/20",
    textColor: "text-cyan-50"
  },
  AGR: {
    name: "Agribank",
    shortName: "AGRIBANK",
    // Gradient từ Đỏ rượu vang sang Cam đất
    gradient: "from-red-900 via-red-800 to-amber-700", 
    glowColor: "bg-yellow-400/20", // Ánh sáng vàng kim
    textColor: "text-amber-50"     // Chữ màu trắng ngà/vàng nhạt
  },
  // Mặc định nếu không tìm thấy mã ngân hàng
  DEFAULT: {
    name: "Bank",
    shortName: "BANK",
    gradient: "from-slate-800 to-slate-600",
    glowColor: "bg-white/10",
    textColor: "text-slate-200"
  }
};

const BankCard = ({ 
  bankCode = "DEFAULT", // Mã ngân hàng: VCB, MB, TCB...
  accountNumber, 
  accountName, 
  brand = "visa" // visa, mastercard, napas
}) => {
  const [copied, setCopied] = useState(false);

  // Lấy theme dựa trên bankCode, nếu không có thì lấy DEFAULT
  const theme = BANK_THEMES[bankCode] || BANK_THEMES.DEFAULT;

  // Hàm xử lý copy số tài khoản
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber.replace(/\s/g, '')); // Xóa khoảng trắng khi copy
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Icon thương hiệu thẻ
  const getBrandIcon = () => {
    switch (brand.toLowerCase()) {
      case 'mastercard': return "fa-brands fa-cc-mastercard";
      case 'napas': return "fa-solid fa-credit-card"; // Hoặc dùng ảnh logo Napas
      default: return "fa-brands fa-cc-visa";
    }
  };

  return (
    <div className={`relative flex flex-col justify-between h-48 w-full max-w-[360px] p-6 text-white rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${theme.gradient} transition-transform hover:scale-[1.02] duration-300`}>
      
      {/* --- Hiệu ứng nền (Decor) --- */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className={`absolute -bottom-5 -left-5 w-32 h-32 rounded-full blur-2xl pointer-events-none ${theme.glowColor}`}></div>

      {/* --- Header: Logo Ngân hàng --- */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          {/* Logo Box */}
          <div className="w-12 h-7 border border-white/30 rounded flex items-center justify-center font-bold text-[10px] tracking-tighter italic backdrop-blur-sm">
            {theme.shortName}
          </div>
          <span className="text-sm font-bold uppercase tracking-wider drop-shadow-md">
            {theme.name}
          </span>
        </div>
        <i className="fa-solid fa-wifi rotate-90 opacity-60"></i>
      </div>

      {/* --- Body: Số tài khoản --- */}
      <div className="relative z-10 my-2">
        <p className={`text-[10px] uppercase mb-1 font-medium ${theme.textColor}`}>Số tài khoản</p>
        
        <div 
          onClick={handleCopy}
          className="flex items-center gap-3 group cursor-pointer w-fit"
          title="Nhấn để sao chép"
        >
          <p className="font-mono text-xl font-bold tracking-widest drop-shadow-md group-hover:text-white/90 transition-colors">
            {accountNumber}
          </p>
          
          {/* Nút copy với hiệu ứng phản hồi */}
          <div className="relative">
            {copied ? (
              <i className="fa-solid fa-check text-green-400 text-sm animate-bounce"></i>
            ) : (
              <i className={`fa-regular fa-copy text-sm opacity-0 group-hover:opacity-100 transition-opacity ${theme.textColor}`}></i>
            )}
            {copied && <span className="absolute left-6 top-[-5px] text-[10px] bg-black/70 px-2 py-1 rounded text-white whitespace-nowrap">Đã copy</span>}
          </div>
        </div>
      </div>

      {/* --- Footer: Chủ tài khoản & Brand --- */}
      <div className="relative z-10 mt-2 pt-4 border-t border-white/20 flex justify-between items-end">
        <div>
          <p className={`text-[10px] uppercase font-medium ${theme.textColor}`}>Chủ tài khoản</p>
          <p className="font-bold tracking-wide text-sm mt-0.5 uppercase truncate max-w-[200px]">
            {accountName}
          </p>
        </div>
        <div className="text-3xl opacity-90 drop-shadow-lg">
          <i className={getBrandIcon()}></i>
        </div>
      </div>
    </div>
  );
};

export default BankCard;