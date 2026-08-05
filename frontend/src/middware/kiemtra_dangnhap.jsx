import React, { useEffect, useState } from 'react';
import * as api from '../JS/API/API';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const kiemtra = await api.CallAPI(undefined, { url: '/NguoiDung/kiemtra', PhuongThuc: 2 });
                if (kiemtra && kiemtra.ThanhCong) {
                    setIsLoggedIn(true);
                    setIsAdmin(kiemtra.DuLieu.LOAIND === 1);
                } else {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
                setIsLoggedIn(false);
                setIsAdmin(false);
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
    if (!isLoggedIn || !isAdmin) {
        return <Navigate to="/" replace />;
    }
    if (isLoggedIn && isAdmin) {
        return <Navigate to="/admin" replace />;
    }
    return children;
};

export default ProtectedRoutes;