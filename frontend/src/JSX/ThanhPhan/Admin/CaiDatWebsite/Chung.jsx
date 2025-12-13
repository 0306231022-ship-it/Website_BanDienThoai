function Chung(){
    return(
        <>
        
                <h3 className="text-xl font-bold text-gray-800 mt-10 mb-6">Cài đặt được sử dụng nhiều nhất</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Mapping qua các item card */}
                    {[
                        {
                            color: "bg-blue-50 text-blue-600",
                            title: "Chặn",
                            desc: "Quản lý danh sách những người bạn đã chặn."
                        },
                        {
                            color: "bg-green-50 text-green-600",
                            title: "Nhật ký hoạt động",
                            desc: "Xem và quản lý hoạt động của bạn."
                        },
                        {
                            color: "bg-yellow-50 text-yellow-600",
                            title: "Chế độ tối",
                            desc: "Bật hoặc tắt chế độ nền tối."
                        }
                    ].map((item, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100"
                        >
                            <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center ${item.color}`}>
                                {/* Icon PlaceHolder */}
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        d="M18.364 18.364A9 9..." /> 
                                </svg>
                            </div>

                            <h4 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-500 leading-normal">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Bạn có thể tìm kiếm gì?</h3>
                    <p className="text-gray-600">Các mục cài đặt khác sẽ được hiển thị tại đây...</p>
                </div>
        </>
    )
};
export default Chung