import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Lay_TTCaNhan } from '../hook/ThongTinHienThi_Website';

const ProtectedRoutes = () => {
    const [status, setStatus] = useState({ isLoading: true, isAdmin: false });

    useEffect(() => {
        let isMounted = true;
        const checkAuth = async () => {
            try {
                const res = await Lay_TTCaNhan(1);
                if (!isMounted) return;

                const loaind = res?.DuLieu?.LOAIND ?? res?.LOAIND;
                const isAdmin = res?.ThanhCong && loaind === 1;

                setStatus({ isLoading: false, isAdmin: isAdmin });
            } catch (err) {
                if (isMounted) setStatus({ isLoading: false, isAdmin: false });
            }
        };
        checkAuth();
        return () => { isMounted = false; };
    }, []);

    if (status.isLoading) return <div className="flex items-center justify-center h-screen"><p className="text-gray-500 font-medium">Đang tải trang...</p></div>;
    if (status.isAdmin) return <Navigate to="/admin" replace />;
    return <Outlet />;
};

export default ProtectedRoutes;