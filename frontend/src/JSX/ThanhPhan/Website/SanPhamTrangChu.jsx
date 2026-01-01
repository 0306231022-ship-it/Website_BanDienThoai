import { Link } from "react-router-dom";
import * as API from '../../../JS/API/API';
import { useState, useEffect } from "react";

const SanPhamTrangChu = () => {
    const [ThuongHieu, setThuongHieu] = useState([]);
    const [page, setpage] = useState(1);
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true);
        const LayDL = async () => {
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/website/laydsTH?page=${page}` });
                setThuongHieu(ketqua.thuongHieu);
                setloading(false)
            } catch (error) {
                console.error('Đã có lỗi xảy ra:' + error)
            } finally {
                setloading(false);
            }
        };
        LayDL();
    }, [page])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="col-span-1 md:col-span-2 relative h-96 bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
                    style={{ backgroundImage: "url('./IMG_0819.JPG')" }}>

                    <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

                    <div className="absolute inset-0 flex items-end p-6 text-white z-10">
                        <h2 className="text-3xl font-bold">iPhone X</h2>
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl text-white cursor-pointer opacity-70 hover:opacity-100 transition duration-200">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                        <div className="absolute bottom-4 left-6 flex space-x-6 text-sm font-semibold">
                            <a href="#" className="flex items-center hover:text-yellow-300 transition duration-200"><i className="fas fa-info-circle mr-1"></i> CÁCH XEM CẤU HÌNH</a>
                            <a href="#" className="flex items-center hover:text-yellow-300 transition duration-200"><i className="fas fa-tools mr-1"></i> THỦ THUẬT</a>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex-1 relative bg-cover bg-center rounded-lg shadow-md overflow-hidden"
                        style={{ backgroundImage: "url('placeholder_for_accessory_image.jpg')", height: "50%", minHeight: "190px" }}>
                        <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
                    </div>

                    <div className="flex-1 relative bg-cover bg-center rounded-lg shadow-md overflow-hidden"
                        style={{ backgroundImage: "url('placeholder_for_jabra_image.jpg')", height: "50%", minHeight: "190px" }}>
                        <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
                        <div className="absolute bottom-4 right-4 text-white text-sm font-semibold">
                            <i className="fas fa-headset mr-1"></i> HỖ TRỢ
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800"><i className="fas fa-gift mr-2 text-red-700"></i> KHUYẾN MÃI & QUÀ TẶNG</h3>
                <a href="#" className="text-sm text-red-700 hover:text-red-900 font-semibold transition duration-200">Xem tất cả <i className="fas fa-arrow-right ml-1"></i></a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundImage: "url('placeholder_for_promo_1.jpg')" }}>
                    <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                </div>

                <div className="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundImage: "url('placeholder_for_promo_2.jpg')" }}>
                    <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                        SKT Tech
                    </div>
                </div>

                <div className="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundImage: "url('placeholder_for_promo_3.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
                    <div className="absolute bottom-4 right-4 text-white text-3xl font-extrabold opacity-40">
                        SUPPORT
                    </div>
                </div>
            </div>
            <hr className="my-8 border-gray-300" />
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Thương hiệu nổi bật</h2>
                        <Link to='' className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                            Xem tất cả &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {
                            loading ? (
                                /* --- PHẦN ĐÃ SỬA --- */
                                /* Thêm class 'col-span-full' để div này chiếm hết chiều rộng lưới */
                                <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                                    <div className="relative">
                                        <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                                        <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                                    </div>
                                    <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
                                </div>
                                /* --- HẾT PHẦN ĐÃ SỬA --- */
                            ) : (
                                ThuongHieu && ThuongHieu.map((item, index) => (
                                    <Link to={`${item.TENTHUONGHIEU}`} key={index} className="group flex items-center justify-center bg-white border border-gray-200 rounded-xl p-4 h-24 transition-all duration-300 hover:shadow-lg hover:border-red-700 hover:-translate-y-1">
                                        <img className="h-20 w-auto object-contain group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src={`http://localhost:3001/${item.LOGO}`} alt={item.TENTHUONGHIEU} />
                                    </Link>
                                ))
                            )
                        }

                    </div>
                </div>
            </section>

        </>

    );
};

export default SanPhamTrangChu;