import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lay_TTCaNhan } from '../hook/ThongTinHienThi_Website';

const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState({ isLoading: true, isAllowed: false });

    useEffect(() => {
        let isMounted = true;
        const checkAuth = async () => {
            try {
                const res = await Lay_TTCaNhan(1);
                if (!isMounted) return;
                const rawData = Array.isArray(res?.DuLieu) ? res?.DuLieu[0] : (res?.DuLieu ?? res);
                const loaind = Number(rawData?.LOAIND ?? rawData?.loaind);
                const isSuccess = Boolean(res?.ThanhCong || res?.thanhCong || res?.success);
                const isAdmin = isSuccess && loaind === 1;
                setStatus({ isLoading: false, isAllowed: isAdmin });
            } catch (err) {
                console.error("Lỗi xác thực:", err);
                if (isMounted) setStatus({ isLoading: false, isAllowed: false });
            }
        };

        checkAuth();
        return () => { isMounted = false; };
    }, []);

    if (status.isLoading) return <div style={{ padding: 20 }}>Đang xác thực Admin...</div>;
    if (!status.isAllowed) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;