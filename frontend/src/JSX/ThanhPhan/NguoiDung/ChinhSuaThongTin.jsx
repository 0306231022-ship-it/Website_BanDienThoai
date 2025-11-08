function ChinhSuaThongTin() {
    return (
        <>
            <div class="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-2">
                        <h2 class="text-2xl font-bold text-dark-900 mb-6">Thông Tin Cá Nhân</h2>
                        <form action="#" method="POST" class="space-y-6">
                            <div class="flex items-center gap-4">
                                <img src="https://picsum.photos/200/200?random=10" alt="Avatar" class="w-20 h-20 rounded-full object-cover"/>
                                <div>
                                    <button type="button" class="bg-dark-800 text-white px-4 py-2 rounded-lg hover:bg-dark-900 transition-colors text-sm font-medium">
                                        Thay đổi ảnh
                                    </button>
                                    <p class="text-xs text-dark-600 mt-2">JPG, GIF hoặc PNG. Tối đa 5MB.</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div>
                                    <label for="full_name" class="block text-sm font-medium text-dark-600">Họ và Tên</label>
                                    <input type="text" id="full_name" value="Nguyễn Văn A" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-dark-600">Email</label>
                                    <input type="email" id="email" value="nguyenvana@email.com" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500" disabled/>
                                </div>
                                <div>
                                    <label for="phone" class="block text-sm font-medium text-dark-600">Số Điện Thoại</label>
                                    <input type="tel" id="phone" value="0901234567" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                                <div>
                                    <label for="dob" class="block text-sm font-medium text-dark-600">Ngày Sinh</label>
                                    <input type="date" id="dob" value="1990-01-01" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                            </div>
                            <div class="flex justify-end gap-4 pt-4">
                                <button type="button" class="bg-dark-100 hover:bg-dark-200 text-dark-800 px-6 py-3 rounded-lg font-medium transition-colors">
                                    Hủy
                                </button>
                                <button type="submit" class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-3">
                        <h2 class_name="text-2xl font-bold text-dark-900 mb-6">Đổi Mật Khẩu</h2>
                        <form action="#" method="POST" class="space-y-6 max-w-lg">
                            <div>
                                <label for="current_password" class="block text-sm font-medium text-dark-600">Mật khẩu hiện tại</label>
                                <input type="password" id="current_password" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                            </div>
                            <div>
                                <label for="new_password" class="block text-sm font-medium text-dark-600">Mật khẩu mới</label>
                                <input type="password" id="new_password" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                            </div>
                            <div>
                                <label for="confirm_password" class="block text-sm font-medium text-dark-600">Xác nhận mật khẩu mới</label>
                                <input type="password" id="confirm_password" class="w-full mt-1 px-4 py-3 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                            </div>
                            <div class="flex justify-end pt-4">
                                <button type="submit" class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                                    Cập Nhật Mật Khẩu
                                </button>
                            </div>
                        </form>
                    </div>
        </>
    );
};
export default ChinhSuaThongTin;
