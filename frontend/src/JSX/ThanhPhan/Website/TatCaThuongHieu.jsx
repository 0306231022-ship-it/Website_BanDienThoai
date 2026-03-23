import { Link } from 'react-router-dom'; 
import * as API from '../../../JS/API/API';
import { useState, useEffect } from 'react';

function TatCaThuongHieu() {
    const [loading, setLoading] = useState(false);
    const [thuongHieu, setThuongHieu] = useState([]);

    useEffect(() => {
        const fetchDL = async () => {
            setLoading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { 
                    PhuongThuc: 2, 
                    url: `/website/laydsTH?page=1&limit=0` 
                });
                
                // Đảm bảo có dữ liệu trước khi set state
                if (ketqua && ketqua.thuongHieu) {
                    setThuongHieu(ketqua.thuongHieu);
                }
            } catch (error) {
                console.error('Lỗi tải thương hiệu:', error);
            } finally { 
                setLoading(false); 
            }
        };
        fetchDL();
    }, []);

    return (
        <section className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link 
                    to="/" 
                    className="group inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95 mb-8"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Quay lại
                </Link>
                <div className="mb-10 flex flex-col items-center sm:items-start">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                        Thương hiệu đối tác
                    </h2>
                    <div className="h-1.5 w-24 bg-blue-600 mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {loading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <div key={`skeleton-${index}`} className="col-span-1 h-28 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-4">
                                <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
                            </div>
                        ))
                    ) : thuongHieu.length > 0 ? (
                        thuongHieu.map((item, index) => (
                            <Link 
                                to={`/san-pham/${item.IDTHUONGHIEU}/${item.TENTHUONGHIEU}`} key={index}
                                className="group col-span-1 flex items-center justify-center h-28 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                            >
                                <img 
                                    className="max-h-full w-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                                    src={`http://localhost:3001/${item.LOGO}`} 
                                    alt={item.TEN_THUONGHIEU || "Logo Thương Hiệu"} 
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Chưa có thương hiệu nào</h3>
                            <p className="mt-2 text-sm text-gray-500 text-center">
                                Hệ thống đang cập nhật các thương hiệu đối tác mới. Vui lòng quay lại sau nhé.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default TatCaThuongHieu;