import { Link } from "react-router-dom";
function ChinhSua(){
    return(
        <>
                <div className="container mx-auto max-w-3xl">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
                    <i className="fas fa-edit mr-3 text-indigo-500"></i> Chỉnh Sửa Hồ Sơ Cá Nhân
                </h1>

                <div className="bg-white shadow-2xl rounded-xl p-8">
                    
                    <form action="#" method="POST">
                        
                        <div className="mb-8 pb-6 border-b border-gray-200 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                            <div className="flex-shrink-0">
                                <img 
                                    className="w-24 h-24 rounded-full object-cover ring-2 ring-offset-2 ring-indigo-500 shadow-md" 
                                    src="https://picsum.photos/150?random=1" 
                                    alt="Avatar quản trị viên"
                                />
                            </div>
                            <div>
                                <button type="button" className="mt-4 bg-primary-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 transition duration-150">
                                    <i className="fas fa-camera mr-2"></i> Đổi Ảnh Đại Diện
                                </button>
                                <p className="text-sm text-gray-500 mt-2">Chức vụ: <span className="font-medium text-indigo-700">Quản trị viên cấp cao</span> (Không thể thay đổi)</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            
                            <div>
                                <label for="name" className="block text-sm font-medium text-gray-700 mb-1">Tên Admin</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value="Admin TechMobile" 
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                                />
                            </div>

                            <div>
                                <label for="dob" className="block text-sm font-medium text-gray-700 mb-1">Ngày Sinh</label>
                                <input 
                                    type="date" 
                                    id="dob" 
                                    name="dob" 
                                    value="1990-08-25" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                                />
                                <p className="mt-1 text-xs text-gray-500">Định dạng: Ngày/Tháng/Năm (Ví dụ: 25/08/1990)</p>
                            </div>

                            <div>
                                <label for="email" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value="admin@techmobile.com" 
                                    required 
                                    readonly
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-gray-50 text-gray-600 cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-gray-500">Email này dùng để đăng nhập và không thể thay đổi tại đây.</p>
                            </div>

                            <div>
                                <label for="phone" className="block text-sm font-medium text-gray-700 mb-1">Số Điện Thoại</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value="0901 234 567" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                                />
                            </div>

                            <div>
                                <label for="address" className="block text-sm font-medium text-gray-700 mb-1">Địa Chỉ</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    name="address" 
                                    value="TP. Hồ Chí Minh, Việt Nam" 
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                                />
                            </div>

                            <hr className="my-6"/>
                            
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                                <h4 className="text-lg font-semibold text-indigo-700 mb-3"><i className="fas fa-lock mr-2"></i> Thay đổi Mật khẩu</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label for="current-password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu Hiện tại</label>
                                        <input type="password" id="current-password" name="current-password" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"/>
                                    </div>
                                    <div>
                                        <label for="new-password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu Mới</label>
                                        <input type="password" id="new-password" name="new-password" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"/>
                                    </div>
                                    <div>
                                        <label for="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Xác nhận Mật khẩu Mới</label>
                                        <input type="password" id="confirm-password" name="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <Link 
                               to="/admin/hoso" 
                                className="px-6 py-3 bg-red-600 action-button text-white rounded-lg shadow-md hover:bg-red-700"
                               
                            >
                                <i className="fas fa-times-circle mr-2"></i> Hủy Bỏ
                            </Link>
                            <button 
                                className="px-6 py-3 bg-green-600 action-button text-white rounded-lg shadow-md hover:bg-green-700"
                            >
                                <i className="fas fa-save mr-2"></i> Lưu Thay Đổi
                            </button>
                        </div>
                    </form>
                </div>
                </div>
        </>
    )
};
export default ChinhSua;