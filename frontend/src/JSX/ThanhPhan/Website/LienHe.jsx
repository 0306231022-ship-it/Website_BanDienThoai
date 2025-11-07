function LienHe() {
    return (
        <>
            <div className="w-full min-h-screen  items-center  to-indigo-300 ">
                <div className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden transition duration-500 hover:shadow-3xl">
                    
                    {/* Phần tiêu đề */}
                    <div className="p-8 bg-indigo-600 text-white">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Liên Hệ</h1>
                        <p className="text-indigo-200 text-lg">
                            Chúng tôi rất vui khi nhận được phản hồi, câu hỏi hoặc yêu cầu hợp tác từ bạn.
                        </p>
                    </div>

                    {/* Nội dung */}
                    <div className="flex flex-col lg:flex-row p-8 gap-10">
                        
                        {/* Form liên hệ */}
                        <div className="lg:w-2/3">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                                Gửi Tin Nhắn Cho Chúng Tôi
                            </h2>
                            
                            <form id="contactForm" className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Tên của bạn
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Ví dụ: Nguyễn Văn A"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Địa chỉ Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="vidu@email.com"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                        Chủ đề
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        placeholder="Ví dụ: Hợp tác kinh doanh"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Nội dung tin nhắn
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        placeholder="Nhập nội dung chi tiết..."
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg transition duration-300"
                                >
                                    Gửi Liên Hệ
                                </button>
                            </form>
                        </div>
                        
                        {/* Thông tin liên hệ */}
                        <div className="lg:w-1/3 p-6 bg-indigo-50 rounded-lg shadow-inner">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-indigo-200 pb-2">
                                Thông Tin Liên Lạc
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.727A8 8 0 016.343 16.727a8 8 0 0111.314 0zM12 21a9 9 0 100-18 9 9 0 000 18zM12 12h.01" />
                                    </svg>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-700">Văn phòng chính</p>
                                        <p>Số 123, Đường Công Nghệ, Quận Sáng Tạo, TP. Hồ Chí Minh.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-700">Email Hỗ Trợ</p>
                                        <a href="mailto:hotro@congtyvidu.com" className="text-indigo-600 hover:text-indigo-800">
                                            hotro@congtyvidu.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-700">Điện Thoại</p>
                                        <a href="tel:+84901234567" className="text-indigo-600 hover:text-indigo-800">
                                            (+84) 90 123 4567
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LienHe;
