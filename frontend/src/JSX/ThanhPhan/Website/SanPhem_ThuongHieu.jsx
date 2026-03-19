import { useParams } from "react-router-dom";
import { useEffect ,useState } from "react";
function SanPhamThuongHieu() {
        const { id, name } = useParams();
    return (
        <div class="bg-gray-50 min-h-screen font-sans text-slate-900">
    <div class="bg-white border-b border-gray-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-8">
            <div class="w-32 h-32 bg-white rounded-3xl border border-gray-100 shadow-xl flex items-center justify-center p-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Brand Logo" class="h-full w-full object-contain"/>
            </div>
            <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl font-black tracking-tighter uppercase mb-2">Apple Ecosystem</h1>
                <p class="text-slate-500 max-w-2xl leading-relaxed italic">
                    Khám phá những sản phẩm công nghệ tiên tiến nhất từ Apple. Từ iPhone, MacBook đến các phụ kiện cao cấp, tất cả đều được thiết kế để mang lại trải nghiệm hoàn hảo.
                </p>
                <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <span class="bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">128 Sản phẩm</span>
                    <span class="bg-green-100 px-4 py-1.5 rounded-full text-xs font-bold text-green-600 uppercase tracking-widest">Đang có ưu đãi</span>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">
        <div class="flex flex-col lg:flex-row gap-8">
            
            <aside class="w-full lg:w-64 space-y-8 shrink-0">
                <div>
                    <h3 class="text-sm font-black uppercase tracking-widest mb-4 border-l-4 border-red-600 pl-3">Danh mục</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="flex justify-between items-center text-sm font-medium text-slate-600 hover:text-red-600 transition-all">iPhone <span class="bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">42</span></a></li>
                        <li><a href="#" class="flex justify-between items-center text-sm font-medium text-slate-600 hover:text-red-600 transition-all">MacBook <span class="bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">18</span></a></li>
                        <li><a href="#" class="flex justify-between items-center text-sm font-medium text-slate-600 hover:text-red-600 transition-all">iPad <span class="bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">12</span></a></li>
                        <li><a href="#" class="flex justify-between items-center text-sm font-medium text-slate-600 hover:text-red-600 transition-all">Phụ kiện <span class="bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">56</span></a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-sm font-black uppercase tracking-widest mb-4 border-l-4 border-red-600 pl-3">Khoảng giá</h3>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"/>
                            <span class="text-sm text-slate-600 group-hover:text-red-600 transition-colors">Dưới 10 Triệu</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"/>
                            <span class="text-sm text-slate-600 group-hover:text-red-600 transition-colors">10 - 20 Triệu</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"/>
                            <span class="text-sm text-slate-600 group-hover:text-red-600 transition-colors">Trên 20 Triệu</span>
                        </label>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white relative overflow-hidden">
                    <div class="relative z-10">
                        <p class="text-[10px] font-bold text-red-500 uppercase mb-2">Hot Deal</p>
                        <h4 class="text-lg font-black leading-tight mb-4">iPhone 15 Pro Max <br/> Giảm 2 Triệu</h4>
                        <button class="bg-white text-slate-900 text-[10px] font-black px-4 py-2 rounded-full uppercase">Mua ngay</button>
                    </div>
                    <div class="absolute -right-4 -bottom-4 opacity-20 w-24 h-24 bg-white rounded-full"></div>
                </div>
            </aside>

            <main class="flex-1">
                <div class="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 gap-4">
                    <p class="text-sm text-slate-500">Hiển thị <span class="font-bold text-slate-900">1 - 12</span> của 128 sản phẩm</p>
                    <div class="flex items-center gap-4">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sắp xếp:</span>
                        <select class="text-sm font-bold bg-slate-50 border-none rounded-xl focus:ring-0 cursor-pointer">
                            <option>Mới nhất</option>
                            <option>Giá thấp đến cao</option>
                            <option>Giá cao đến thấp</option>
                            <option>Bán chạy nhất</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="group bg-white rounded-[2rem] border border-gray-100 p-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
                        <div class="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg">-15%</div>
                        <div class="aspect-square bg-slate-50 rounded-[1.5rem] mb-4 flex items-center justify-center p-6 overflow-hidden group-hover:bg-white transition-colors">
                            <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708" 
                                 class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"/>
                        </div>
                        <div class="px-2">
                            <h3 class="text-sm font-bold text-slate-800 truncate uppercase mb-2 group-hover:text-red-600 transition-colors">iPhone 15 Pro Max 256GB</h3>
                            <div class="flex items-baseline gap-2 mb-4">
                                <span class="text-lg font-black text-red-600">29.990.000đ</span>
                                <span class="text-[10px] text-slate-400 line-through">34.990.000đ</span>
                            </div>
                            <button class="w-full bg-slate-900 text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-slate-100">Xem chi tiết</button>
                        </div>
                    </div>

                    <div class="group bg-white rounded-[2rem] border border-gray-100 p-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
                        <div class="aspect-square bg-slate-50 rounded-[1.5rem] mb-4 flex items-center justify-center p-6 overflow-hidden group-hover:bg-white transition-colors">
                            <img src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665" 
                                 class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"/>
                        </div>
                        <div class="px-2">
                            <h3 class="text-sm font-bold text-slate-800 truncate uppercase mb-2 group-hover:text-red-600 transition-colors">MacBook Air M2 13"</h3>
                            <div class="flex items-baseline gap-2 mb-4">
                                <span class="text-lg font-black text-slate-900">24.500.000đ</span>
                            </div>
                            <button class="w-full bg-slate-900 text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95">Xem chi tiết</button>
                        </div>
                    </div>

                    </div>

                <div class="mt-12 flex justify-center gap-2">
                    <button class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-sm text-slate-400 hover:border-red-600 hover:text-red-600 transition-all">&larr;</button>
                    <button class="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-red-200">1</button>
                    <button class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-sm text-slate-600 hover:border-red-600 transition-all">2</button>
                    <button class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-sm text-slate-600 hover:border-red-600 transition-all">3</button>
                    <button class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-sm text-slate-400 hover:border-red-600 hover:text-red-600 transition-all">&rarr;</button>
                </div>
            </main>
        </div>
    </div>
</div>
    )
};
export default SanPhamThuongHieu;
