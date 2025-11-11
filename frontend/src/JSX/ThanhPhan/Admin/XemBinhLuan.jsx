function Xem() {
    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                        <i className="fas fa-comment-dots text-blue-600"></i>
                        <span>Chi Tiết Bình Luận</span>
                    </h2>

                    {/* Nút quay lại */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-sm"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Quay lại danh sách
                    </button>
                </div>

                {/* Thông tin bình luận */}
                <section className="pb-6 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                        <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full status-approved">
                            Đã Duyệt
                        </span>
                        <p className="text-lg font-medium text-gray-800 mt-1">
                            Bình luận từ:{' '}
                            <span className="font-bold text-indigo-600">
                                Khách Hàng Thân Thiết
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Sản phẩm:{' '}
                            <span className="font-medium text-gray-700">
                                Máy Pha Cà Phê Tự Động
                            </span>
                        </p>
                    </div>

                    <div className="mt-3 md:mt-0 text-yellow-500 text-xl flex space-x-0.5">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt text-gray-300"></i>
                    </div>
                </section>

                {/* Nội dung bình luận */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        Nội Dung Khách Hàng
                    </h2>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 whitespace-pre-line shadow-sm">
                        Tôi rất hài lòng với chiếc máy này. Tuy nhiên, âm thanh khi xay hạt hơi to
                        một chút, nhưng chất lượng cà phê thì tuyệt vời! Tôi đề xuất 4/5 sao.
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        ID Bình Luận: <span className="font-mono">example_comment_123</span>
                    </p>
                </section>

                {/* Các hành động */}
                <section className="flex flex-wrap gap-4 mb-8 border-b pb-6 border-gray-100">
                    <button
                        className="action-button bg-gray-400 text-white disabled:cursor-not-allowed"
                        disabled
                    >
                        <i className="fas fa-check-circle mr-2"></i> Đã Duyệt
                    </button>

                    <button className="action-button bg-blue-500 text-white hover:bg-blue-600">
                        <i className="fas fa-reply mr-2"></i> Trả Lời Khách Hàng
                    </button>

                    <button className="action-button bg-red-500 text-white hover:bg-red-600">
                        <i className="fas fa-trash-alt mr-2"></i> Xóa
                    </button>
                </section>

                {/* Phản hồi quản trị viên */}
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        Phản Hồi Của Quản Trị Viên
                    </h2>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-700 shadow-sm">
                        <p className="whitespace-pre-line">
                            Cảm ơn quý khách đã phản hồi. Chúng tôi đã ghi nhận ý kiến về tiếng ồn
                            và sẽ cải thiện trong các phiên bản tiếp theo. Rất mong quý khách tiếp
                            tục ủng hộ sản phẩm của chúng tôi!
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Phản hồi bởi:{' '}
                            <span className="font-medium text-gray-800">Quản Trị Viên A</span>
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Xem;
