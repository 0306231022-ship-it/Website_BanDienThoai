import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../../JS/API/API';
function Footer() {
    //demo backend
    useEffect(() => {
        // Test API khi component Footer được gắn vào DOM
        const testAPI = async () => {
            const yeucau = {
                DiaChi: 1
            };
            const response = await API.CallAPI(undefined, yeucau);
            console.log('Kết quả từ API:', response);
        };
        testAPI();  

    });
    return (
       <footer class="bg-dark-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <i class="fas fa-mobile-alt text-white"></i>
                        </div>
                        <span class="text-xl font-bold">TechMobile</span>
                    </div>
                    <p class="text-dark-300">
                        Đi đầu trong công nghệ di động với các sản phẩm AI, bền vững và đột phá.
                    </p>
                    <div class="flex space-x-4">
                        <Link to="" class="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                        <i class="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="" class="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                        <i class="fab fa-twitter"></i>
                        </Link>
                        <Link to="" class="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                        <i class="fab fa-instagram"></i>
                        </Link>
                    </div>
                </div>
                <div class="space-y-4">
                    <h3 class="text-lg font-bold">Sản Phẩm</h3>
                    <ul class="space-y-2 text-dark-300">
                        <li><Link to="" class="hover:text-white transition-colors">AI Series</Link></li>
                    <li><Link to="" class="hover:text-white transition-colors">Foldable</Link></li>
                    <li><Link to="" class="hover:text-white transition-colors">Eco Series</Link></li>
                    <li><Link to="" class="hover:text-white transition-colors">Phụ Kiện</Link></li>
                </ul>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-bold">Hỗ Trợ</h3>
                <ul class="space-y-2 text-dark-300">
                    <li><Link to="" class="hover:text-white transition-colors">Trung Tâm Hỗ Trợ</Link></li>
                <li><Link to="" class="hover:text-white transition-colors">Bảo Hành</Link></li>
                <li><Link to="" class="hover:text-white transition-colors">Hướng Dẫn Mua Hàng</Link></li>
                <li><Link to="" class="hover:text-white transition-colors">Liên Hệ</Link></li>
            </ul>
        </div>
        <div class="space-y-4">
            <h3 class="text-lg font-bold">Liên Hệ</h3>
            <div class="space-y-2 text-dark-300">
                <div class="flex items-center">
                    <i class="fas fa-map-marker-alt mr-3"></i>
                <span>123 Nguyễn Văn Linh, Quận 7, TP.HCM</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-phone mr-3"></i>
            <span>1900 1234</span>
        </div>
        <div class="flex items-center">
            <i class="fas fa-envelope mr-3"></i>
            <span>info@techmobile.vn</span>
        </div>
    </div>
</div>
            </div>
            <div class="border-t border-dark-800 mt-12 pt-8 text-center text-dark-300">
                <p>&copy; 2025 TechMobile. Tất cả quyền được bảo lưu.</p>
            </div>
        </div>
    </footer>

    );
}

export default Footer;
