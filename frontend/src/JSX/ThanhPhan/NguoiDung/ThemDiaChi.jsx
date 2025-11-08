import {Link} from "react-router-dom";
function ThemDiaChi() {
    return(
        <>
            <section className="lg:col-span-3">
                    
                    <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-2">
                        <div className="flex items-center gap-4 mb-6">
                            <Link to="/nguoi-dung/dia-chi-cua-toi" className="text-dark-600 hover:text-primary-500 transition-colors">
                                <i className="fas fa-arrow-left fa-lg"></i> quay lại
                            </Link>
                        </div>

                        <form action="#" method="POST" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="full_name" className="block text-sm font-medium text-dark-600">Họ và Tên</label>
                                    <input type="text" id="full_name" placeholder="Nguyễn Văn A" className="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                                <div>
                                    <label for="phone" className="block text-sm font-medium text-dark-600">Số Điện Thoại</label>
                                    <input type="tel" id="phone" placeholder="0901234567" className="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                            </div>
                            
                            <div>
                                <label for="street_address" className="block text-sm font-medium text-dark-600">Địa chỉ chi tiết</label>
                                <input type="text" id="street_address" placeholder="Số nhà, tên tòa nhà, tên đường..." className="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label for="city" className="block text-sm font-medium text-dark-600">Tỉnh/Thành Phố</label>
                                    <select id="city" className="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                                        <option value="">Chọn Tỉnh/Thành</option>
                                        <option value="hcm">TP. Hồ Chí Minh</option>
                                        <option value="hn">Hà Nội</option>
                                        <option value="dn">Đà Nẵng</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="district" className="block text-sm font-medium text-dark-600">Quận/Huyện</label>
                                    <select id="district" className="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                                        <option value="">Chọn Quận/Huyện</option>
                                        <option value="q1">Quận 1</option>
                                        <option value="q7">Quận 7</option>
                                        <option value="qbt">Quận Bình Thạnh</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="ward" className="block text-sm font-medium text-dark-600">Phường/Xã</label>
                                    <select id="ward" className="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                                        <option value="">Chọn Phường/Xã</option>
                                        <option value="pbn">Phường Bến Nghé</option>
                                        <option value="ptp">Phường Tân Phong</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark-600 mb-2">Loại địa chỉ</label>
                                <div className="flex gap-4">
                                    <label for="type_home" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dark-100 cursor-pointer">
                                        <input type="radio" id="type_home" name="address_type" className="focus:ring-primary-500 text-primary-500" checked/>
                                        <span>Nhà riêng</span>
                                    </label>
                                    <label for="type_office" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dark-100 cursor-pointer">
                                        <input type="radio" id="type_office" name="address_type" className="focus:ring-primary-500 text-primary-500"/>
                                        <span>Văn phòng</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label for="set_default" className="flex items-center gap-2 text-dark-600 cursor-pointer">
                                    <input type="checkbox" id="set_default" className="rounded border-dark-300 focus:ring-primary-500 text-primary-500"/>
                                    <span className="font-medium">Đặt làm địa chỉ mặc định</span>
                                </label>
                            </div>
                            
                            <div className="flex justify-end gap-4 pt-4 border-t border-dark-100 mt-8">
                                <a href="user-addresses.html" className="bg-dark-100 hover:bg-dark-200 text-dark-800 px-6 py-3 rounded-lg font-medium transition-colors">
                                    Hủy
                                </a>
                                <button type="submit"  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                                    Lưu Địa Chỉ
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

        </>
    );
};
export default ThemDiaChi;