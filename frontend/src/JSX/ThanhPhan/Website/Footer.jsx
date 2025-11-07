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
          <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
    
            <div>
                <h4 className="text-xl font-bold mb-4 text-secondary">PhoneStore</h4>
                <p className="text-sm text-gray-400">Chuyên cung cấp các sản phẩm điện thoại di động chính hãng, giá tốt nhất thị trường.</p>
            </div>

           
            <div>
                <h4 className="text-lg font-semibold mb-4">Sản phẩm</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="" className="hover:text-white transition duration-200">Điện thoại Mới</Link></li>
                    <li><Link to="" className="hover:text-white transition duration-200">Phụ kiện</Link></li>
                    <li><Link to="" className="hover:text-white transition duration-200">Máy đã qua sử dụng</Link></li>
                    <li><Link to="" className="hover:text-white transition duration-200">Máy tính bảng</Link></li>
                </ul>
            </div>

           
            <div>
                <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="" className="hover:text-white transition duration-200">Chính sách bảo hành</Link></li>
                    <li><Link to="" className="hover:text-white transition duration-200">Câu hỏi thường gặp (FAQ)</Link></li>
                    <li><Link to="" className="hover:text-white transition duration-200">Liên hệ hỗ trợ</Link></li>
                    <li><Link to="" className="hover:text-white transition duration-200">Chính sách đổi trả</Link></li>
                </ul>
            </div>

        
            <div>
                <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
                <p className="text-sm text-gray-400 mb-2">Địa chỉ: 123 Đường Công Nghệ, Quận 1, TP. HCM</p>
                <p className="text-sm text-gray-400 mb-2">Điện thoại: (028) 1234 5678</p>
                <p className="text-sm text-gray-400">Email: support@phonestore.vn</p>
               
                <div class="flex space-x-4 mt-4">
                    <Link to="" className="hover:text-secondary transition duration-300">Facebook</Link>
                    <Link to="" className="hover:text-secondary transition duration-300">Instagram</Link>
                    <Link to="" className="hover:text-secondary transition duration-300">Zalo</Link>
                </div>
            </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">&copy; 2025 PhoneStore. Tất cả quyền được bảo lưu.</p>
        </div>
    </footer>
    );
}

export default Footer;
