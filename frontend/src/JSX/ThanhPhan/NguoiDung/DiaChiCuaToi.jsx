function DiaChiCuaToi() {
    return (
        <>
            <div class="container mx-auto px-4">
            
           
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
       
                <section class="lg:col-span-3">
                    
                    <div class="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-2">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                            <h2 class="text-2xl font-bold text-dark-900">Địa Chỉ Của Tôi</h2>
                            <button class="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white px-5 py-3 rounded-lg font-medium transition-colors transform hover:scale-105">
                                <i class="fas fa-plus mr-2"></i>Thêm Địa Chỉ Mới
                            </button>
                        </div>

                        <div class="space-y-6">

                            <div class="border border-dark-100 rounded-2xl p-6">
                                <div class="flex flex-col md:flex-row justify-between gap-4">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-3">
                                            <h3 class="text-lg font-bold text-dark-900">Nguyễn Văn A</h3>
                                            <span class="inline-block bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-medium">Mặc định</span>
                                        </div>
                                        <p class="text-dark-600 mb-1">
                                            <i class="fas fa-phone mr-2 w-4"></i>
                                            (+84) 901 234 567
                                        </p>
                                        <p class="text-dark-600">
                                            <i class="fas fa-map-marker-alt mr-2 w-4"></i>
                                            123 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh
                                        </p>
                                    </div>
                                    <div class="flex flex-row md:flex-col md:items-end justify-start md:justify-center gap-2 md:gap-3 flex-shrink-0 mt-2 md:mt-0">
                                        <button class="text-primary-500 hover:text-primary-600 font-medium transition-colors text-left">Chỉnh sửa</button>
                                        <button class="text-red-500 hover:text-red-600 font-medium transition-colors text-left">Xóa</button>
                                    </div>
                                </div>
                            </div>

                            <div class="border border-dark-100 rounded-2xl p-6">
                                <div class="flex flex-col md:flex-row justify-between gap-4">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-3">
                                            <h3 class="text-lg font-bold text-dark-900">Nguyễn Văn A (Văn Phòng)</h3>
                                            </div>
                                        <p class="text-dark-600 mb-1">
                                            <i class="fas fa-phone mr-2 w-4"></i>
                                            (+84) 901 234 567
                                        </p>
                                        <p class="text-dark-600">
                                            <i class="fas fa-map-marker-alt mr-2 w-4"></i>
                                            456 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                                        </p>
                                    </div>
                                    <div class="flex flex-row md:flex-col md:items-end justify-start md:justify-center gap-2 md:gap-3 flex-shrink-0 mt-2 md:mt-0">
                                        <button class="text-dark-600 hover:text-primary-500 font-medium transition-colors text-left">Đặt làm mặc định</button>
                                        <button class="text-primary-500 hover:text-primary-600 font-medium transition-colors text-left">Chỉnh sửa</button>
                                        <button class="text-red-500 hover:text-red-600 font-medium transition-colors text-left">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    );
};
export default DiaChiCuaToi;