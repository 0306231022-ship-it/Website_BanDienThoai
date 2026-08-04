import React, { useEffect, useState } from 'react';
import * as api from '../JS/API/API';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const kiemtra = await api.CallAPI(undefined, { url: '/NguoiDung/kiemtra?TrangThai=1', PhuongThuc: 2 });
                alert(JSON.stringify(kiemtra));
                if (kiemtra && kiemtra.ThanhCong) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, []);
    if (isLoggedIn === null) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 font-medium">Đang xác thực tài khoản...</p>
            </div>
        );
    }
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;