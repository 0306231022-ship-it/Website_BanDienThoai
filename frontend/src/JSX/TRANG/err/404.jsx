import '../../../CSS/404.css';
function Trang404() {
    return (
        <>
    <header className='bg-gray-50 min-h-screen flex items-center justify-center relative overflow-hidden font-sans'>
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
    <div class="relative z-10 container mx-auto px-4">
        <div class="max-w-lg mx-auto text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/50">
            <div class="mb-6 relative">
                <svg class="w-40 h-40 mx-auto text-indigo-600 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              
                <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 select-none">
                    404
                </h1>
            </div>

        
            <h2 class="text-3xl font-bold text-gray-800 mb-4">
                Oops! Trang không tồn tại
            </h2>
            <p class="text-gray-600 mb-8 text-lg leading-relaxed">
                Có vẻ như trang bạn đang tìm kiếm đã bị di chuyển, xóa bỏ hoặc chưa từng tồn tại. Hãy quay lại nơi an toàn nhé!
            </p>
            <div class="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
                Mã lỗi: 404 Not Found
            </div>
        </div>
    </div>
    </header>
        </>

    );
};
export default Trang404;