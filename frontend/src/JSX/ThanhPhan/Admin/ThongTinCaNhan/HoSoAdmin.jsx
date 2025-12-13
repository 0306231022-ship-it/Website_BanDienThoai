import { Link } from "react-router-dom";

function HoSo() {
    return (
        <>
            <div className="p-6">
                <header className="bg-white p-6 rounded-lg">
                       <h2 className="text-2xl font-bold mb-1">Trang cá nhân và thông tin cá nhân</h2>
                       <p className="text-gray-600 mb-6">
                            Xem lại trang cá nhân và thông tin cá nhân bạn đã thêm vào Trung tâm tài khoản này. 
                            Thêm trang cá nhân khác bằng cách thêm tài khoản. 
                            <Link to="" className="text-blue-600 hover:underline font-medium">Tìm hiểu thêm</Link>
                        </p>
                </header>
                <main className="bg-white p-6 rounded-lg mt-4 ">
                    <h3 className="text-lg font-semibold mb-2">Trang cá nhân</h3>
                    <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out group -mx-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                                <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Nguyễn Ngọc Hiếu</p>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.09 3.73 9.35 8.63 10.05v-7.39H7.9v-2.66h2.73v-2.02c0-2.7 1.6-4.18 4.07-4.18 1.15 0 2.14.08 2.42.12v2.81h-1.66c-1.32 0-1.57.63-1.57 1.55v1.94h3.12l-.5 3.06h-2.62v7.39C18.27 21.35 22 17.09 22 12c0-5.52-4.48-10-10-10z"/>
                                    </svg>
                                    Facebook
                                </p>
                            </div>
                        </div>
                        
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </main>

                <hr className="border-gray-300 my-6"/>

                <main className="bg-white p-6 rounded-lg mt-4">
                    <h3 className="text-lg font-semibold mb-3">Thông tin cá nhân</h3>
                    <button className="flex justify-between items-center w-full py-3 px-1 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out group -mx-1">
                        <div>
                            <p className=" text-left font-medium text-gray-800 group-hover:text-blue-600">Thông tin liên hệ</p>
                            <p className="text-sm text-gray-500 mt-1 text-left"> dc01.nnh.2048ae@gmail.com, +84398004970</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    <button className="flex justify-between items-center w-full py-3 px-1 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out group -mx-1">
                        <div>
                            <p className=" text-left font-medium text-gray-800 group-hover:text-blue-600">Ngày sinh</p>
                            <p className="text-sm text-gray-500 mt-1 text-left">07/06/2005</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </main>

                 <hr className="border-gray-300 my-6"/>

                   <main className="bg-white p-6 rounded-lg mt-4">
                    <h3 className="text-lg font-semibold mb-3">Địa chỉ liên hệ</h3>

            
                    <button className="flex justify-between items-center w-full py-3 px-1 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out group -mx-1">
                        <div>
                            <p className=" text-left font-medium text-gray-800 group-hover:text-blue-600">Địa chỉ</p>
                            <p className="text-sm text-gray-500 mt-1 text-left"> dc01.nnh.2048ae@gmail.com, +84398004970</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    <button className="flex justify-between items-center w-full py-3 px-1 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out group -mx-1">
                        <div>
                            <p className=" text-left font-medium text-gray-800 group-hover:text-blue-600">Ngày sinh</p>
                            <p className="text-sm text-gray-500 mt-1 text-left">07/06/2005</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </main>

            </div>
        </>
    );
};
export default HoSo;