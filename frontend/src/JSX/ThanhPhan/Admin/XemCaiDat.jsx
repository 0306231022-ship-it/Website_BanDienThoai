import { Link } from "react-router-dom";
import { useAppContext } from "../../../CONTEXT/TrangChuAdmin";
import { useState } from "react";
import TenWebsite from "./CaiDatWebsite/TenWebsite";

function XemThongTinWebsite() {
    const { TTwebsite } = useAppContext();
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section id="section-view-settings" className="section" aria-label="Thông tin website">
                <div className="flex items-center justify-between mb-8 mt-6 border-b pb-3 border-gray-200">
                    <h2 className="text-3xl font-extrabold text-gray-900">⚙️ Thông Tin Website</h2>
                </div>

              
                <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 space-y-10">

                    {/* =============== 1. Thông tin chung ================= */}
                    <div>
                        <h3 className="text-xl font-bold text-blue-700 pb-3 border-b border-gray-200">
                            1. Thông tin Chung
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">

                            {/* ==== Tên Website ==== */}
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="text-left group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition"
                            >
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition"></i>
                                    Tên Website
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {TTwebsite.TenWebsite}
                                </p>
                            </button>

                            {/* ==== Email ==== */}
                            <div className="group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition">
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-300 opacity-0 group-hover:opacity-100 transition"></i>
                                    Email Liên hệ
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {TTwebsite.Email}
                                </p>
                            </div>

                            {/* ==== Địa chỉ ==== */}
                            <div className="md:col-span-2 group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition">
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-300 opacity-0 group-hover:opacity-100 transition"></i>
                                    Địa chỉ trụ sở chính
                                </p>

                                <p className="text-lg font-semibold text-gray-900 whitespace-pre-line">
                                    {TTwebsite.DiaChi}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* =============== 2. Liên kết mạng xã hội ================= */}
                    <div>
                        <h3 className="text-xl font-bold text-blue-700 pb-3 border-b border-gray-200">
                            2. Liên Kết Mạng Xã Hội
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">

                            {/* Facebook */}
                            <div className="group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition">
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-300 opacity-0 group-hover:opacity-100"></i>
                                    <i className="fab fa-facebook text-blue-600"></i>
                                    Facebook
                                </p>
                                <Link
                                    to={TTwebsite.LinkFacebook}
                                    target="_blank"
                                    className="text-blue-600 font-semibold hover:underline break-all"
                                >
                                    {TTwebsite.LinkFacebook}
                                </Link>
                            </div>

                            {/* Instagram */}
                            <div className="group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition">
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-300 opacity-0 group-hover:opacity-100"></i>
                                    <i className="fab fa-instagram text-pink-600"></i>
                                    Instagram
                                </p>
                                <Link
                                    to={TTwebsite.LinkInstagram}
                                    target="_blank"
                                    className="text-pink-600 font-semibold hover:underline break-all"
                                >
                                    {TTwebsite.LinkInstagram}
                                </Link>
                            </div>

                            {/* Hotline/Zalo */}
                            <div className="group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition">
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-300 opacity-0 group-hover:opacity-100"></i>
                                    <i className="fas fa-phone text-green-600"></i>
                                    Hotline / Zalo
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {TTwebsite.Zalo}
                                </p>
                            </div>

                            {/* Logo */}
                            <div className="group bg-gray-50 p-4 rounded-lg border hover:border-blue-300 transition">
                                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                                    <i className="fas fa-pen text-gray-300 opacity-0 group-hover:opacity-100"></i>
                                    <i className="fas fa-image text-gray-500"></i>
                                    Logo Website
                                </p>

                                <img
                                    alt="123"
                                    src={`http://localhost:3001${TTwebsite.LoGo}`}
                                    className="w-32 h-32 object-contain rounded-lg border shadow"
                                />
                            </div>

                        </div>
                    </div>

                    {/* ================= ghi chú ================= */}
                    <div className="mt-3 p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-2">Ghi chú</h4>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                            {TTwebsite.MoTaWebstite}
                        </p>
                    </div>

                </div>
            </section>

            {/* ===================== MODAL ===================== */}
            {
                modalOpen && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
                        <div className="bg-white p-7 rounded-xl shadow-2xl w-[90%] max-w-lg relative animate-fadeIn border">

                            {/* Nút X */}
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                            >
                                <i className="fas fa-times"></i>
                            </button>

                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Chỉnh sửa Tên Website
                            </h3>

                            <TenWebsite />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default XemThongTinWebsite;

