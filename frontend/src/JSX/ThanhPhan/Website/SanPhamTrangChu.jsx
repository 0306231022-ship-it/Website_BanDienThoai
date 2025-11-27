
const SanPhamTrangChu = () => {
    return (
        <>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div class="col-span-1 md:col-span-2 relative h-96 bg-cover bg-center rounded-lg shadow-xl overflow-hidden" 
             Style="background-image: url('./IMG_0819.JPG');">
            
            <div class="absolute inset-0 bg-gray-900 opacity-60"></div>
            
            <div class="absolute inset-0 flex items-end p-6 text-white z-10">
                <h2 class="text-3xl font-bold">iPhone X</h2>
                <div class="absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl text-white cursor-pointer opacity-70 hover:opacity-100 transition duration-200">
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="absolute bottom-4 left-6 flex space-x-6 text-sm font-semibold">
                    <a href="#" class="flex items-center hover:text-yellow-300 transition duration-200"><i class="fas fa-info-circle mr-1"></i> CÁCH XEM CẤU HÌNH</a>
                    <a href="#" class="flex items-center hover:text-yellow-300 transition duration-200"><i class="fas fa-tools mr-1"></i> THỦ THUẬT</a>
                </div>
            </div>
        </div>
        
        <div class="col-span-1 flex flex-col gap-4">
            <div class="flex-1 relative bg-cover bg-center rounded-lg shadow-md overflow-hidden" 
                 Style="background-image: url('placeholder_for_accessory_image.jpg'); height: 50%; min-height: 190px;">
                <div class="absolute inset-0 bg-gray-900 opacity-70"></div>
            </div>
            
            <div class="flex-1 relative bg-cover bg-center rounded-lg shadow-md overflow-hidden" 
                 Style="background-image: url('placeholder_for_jabra_image.jpg'); height: 50%; min-height: 190px;">
                <div class="absolute inset-0 bg-gray-900 opacity-70"></div>
                <div class="absolute bottom-4 right-4 text-white text-sm font-semibold">
                    <i class="fas fa-headset mr-1"></i> HỖ TRỢ
                </div>
            </div>
        </div>
    </div>

    <hr class="my-8 border-gray-300"/>

    <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-800"><i class="fas fa-gift mr-2 text-red-700"></i> KHUYẾN MÃI & QUÀ TẶNG</h3>
        <a href="#" class="text-sm text-red-700 hover:text-red-900 font-semibold transition duration-200">Xem tất cả <i class="fas fa-arrow-right ml-1"></i></a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div class="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden" 
             Style="background-image: url('placeholder_for_promo_1.jpg');">
            <div class="absolute inset-0 bg-gray-900 opacity-60"></div>
        </div>

        <div class="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden" 
             Style="background-image: url('placeholder_for_promo_2.jpg');">
            <div class="absolute inset-0 bg-gray-900 opacity-60"></div>
            <div class="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                SKT Tech
            </div>
        </div>

        <div class="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden" 
              style={{ backgroundImage: "url('placeholder_for_promo_3.jpg')" }}
>
            <div class="absolute inset-0 bg-gray-900 opacity-80"></div>
            <div class="absolute bottom-4 right-4 text-white text-3xl font-extrabold opacity-40">
                SUPPORT
            </div>
        </div>
    </div>

        </>
      
    );
};

export default SanPhamTrangChu;