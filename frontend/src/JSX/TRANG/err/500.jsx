import React from 'react';
import { useNavigate } from 'react-router-dom';
const ServerErrorPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-40 h-40 text-red-500 mx-auto opacity-90"
        >
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          <line x1="12" y1="2" x2="12" y2="12" />
          <path d="m17.657 16.657-4.243 4.243a2 2 0 0 1-2.828 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
          <path d="M12 12v.01" />
          <circle cx="12" cy="12" r="1" />
          <path d="M4.93 19.07 2.1 21.9" />
          <path d="M19.07 4.93 21.9 2.1" />
        </svg>
      </div>
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4 tracking-tighter">500</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
        Hệ thống đang gặp sự cố
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-base md:text-lg">
        Rất xin lỗi, máy chủ của chúng tôi đang tạm thời mất kết nối hoặc đang bảo trì. 
        Vui lòng thử lại sau ít phút.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
    
        <button  onClick={handleGoHome}
                 className="px-6 py-3 rounded-lg bg-white text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Về trang chủ
        </button>
      </div>
      <p className="mt-12 text-sm text-gray-400">
        Mã lỗi: 500 Internal Server Error
      </p>
    </div>
  );
};

export default ServerErrorPage;