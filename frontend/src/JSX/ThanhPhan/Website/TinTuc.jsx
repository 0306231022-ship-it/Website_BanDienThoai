import React from 'react';

// Dữ liệu mẫu (mock data)
const featuredArticleData = {
    category: "AI",
    categoryIcon: "bi bi-robot",
    title: "Cuộc Cách Mạng Chip AI: Vì Sao Chúng Ta Cần Sức Mạnh Tính Toán Lớn Hơn?",
    summary: "Thị trường chip AI đang nóng hơn bao giờ hết với sự xuất hiện của các kiến trúc mới nhằm đáp ứng nhu cầu xử lý dữ liệu khổng lồ cho các mô hình ngôn ngữ lớn (LLMs). Bài viết này sẽ phân tích các xu hướng chính và tác động của nó đến tương lai công nghệ...",
    time: "2 giờ trước - 5 phút đọc",
    imageUrl: "https://placehold.co/768x432/0d6efd/ffffff?text=AI+Chip+Revolution",
    link: "#"
};

const latestNewsData = [
    { category: "SMARTPHONE", categoryColor: "text-blue-600", title: "Đánh giá chi tiết mẫu flagship mới nhất: Hiệu năng vượt trội hay chỉ là chiêu trò marketing?", date: "15/10/2025", imageUrl: "https://placehold.co/400x225/11998e/ffffff?text=Smartphone+Mới", link: "#" },
    { category: "GAMING", categoryColor: "text-red-600", title: "Thế hệ Console tiếp theo được tiết lộ: Đồ họa 8K, Ray Tracing nâng cao", date: "14/10/2025", imageUrl: "https://placehold.co/400x225/904e95/ffffff?text=Console+Mới", link: "#" },
    { category: "LAPTOP", categoryColor: "text-green-600", title: "5 mẫu Laptop mỏng nhẹ đáng mua nhất cuối năm 2025", date: "13/10/2025", imageUrl: "https://placehold.co/400x225/4776e6/ffffff?text=Laptop+Mỏng+Nhẹ", link: "#" },
    { category: "BẢO MẬT", categoryColor: "text-yellow-600", title: "Lỗ hổng bảo mật mới nhất trên trình duyệt phổ biến, người dùng cần làm gì?", date: "12/10/2025", imageUrl: "https://placehold.co/400x225/f7797d/ffffff?text=Bảo+Mật+Dữ+Liệu", link: "#" },
];



// 2. FEATURED ARTICLE Component
const FeaturedArticle = ({ article }) => (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <a href={article.link}>
            <img className="w-full h-auto object-cover md:h-96 transition duration-300 hover:opacity-90" 
                 src={article.imageUrl} 
                 alt={`Ảnh minh họa bài viết ${article.category}`}
            />
        </a>
        <div className="p-6 md:p-8">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <i className={`${article.categoryIcon}`}></i> {article.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-snug hover:text-blue-600 transition duration-150">
                <a href={article.link}>{article.title}</a>
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
            <div className="flex items-center text-sm text-gray-500">
                <i className="bi bi-clock-history mr-2"></i>
                <span>{article.time}</span>
            </div>
        </div>
    </article>
);

// 3. NEWS CARD Component
const NewsCard = ({ article }) => (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group">
        <a href={article.link}>
            <img className="w-full h-40 object-cover transition duration-300 group-hover:scale-[1.05]" 
                 src={article.imageUrl} 
                 alt={article.title}
            />
        </a>
        <div className="p-4 flex flex-col flex-grow">
            {/* Sử dụng categoryColor từ dữ liệu mẫu */}
            <span className={`text-xs ${article.categoryColor} font-semibold mb-1`}>{article.category}</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition duration-150 flex-grow">
                <a href={article.link}>{article.title}</a>
            </h3>
            <div className="mt-auto flex items-center text-xs text-gray-500">
                <i className="bi bi-calendar-event mr-1"></i>
                <span>{article.date}</span>
            </div>
        </div>
    </article>
);


// 4. MAIN NEWS PAGE Component
function NewsPage() {
    
    // Giả định màu 'primary' là blue-600, 'text-dark' là gray-800
    // và 'bg-light' là gray-50/100
    
    return (
        <div className="bg-gray-100 font-sans min-h-screen"> 
            
 

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* TITLE & BREADCRUMB */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Tin Tức Công Nghệ Mới Nhất</h1>
                    <nav className="text-sm text-gray-500">
                        <a href="index.html" className="hover:text-blue-600">Trang chủ</a> / 
                        <span className="font-medium text-gray-800">Tin tức</span>
                    </nav>
                </div>

                {/* MAIN LAYOUT: CONTENT + SIDEBAR */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* COLUMN 1: MAIN NEWS CONTENT (2/3 width on large screens) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* FEATURED ARTICLE */}
                        <FeaturedArticle article={featuredArticleData} />

                        {/* LATEST ARTICLES GRID (Tin tức mới) */}
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mt-10">Tin Mới Cập Nhật</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {latestNewsData.map((article, index) => (
                                <NewsCard key={index} article={article} />
                            ))}
                        </div>
                        
                        {/* PAGINATION */}
                        <div className="flex justify-center items-center pt-4">
                            <button className="px-3 py-1 mx-1 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-50" disabled>
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <span className="px-3 py-1 mx-1 rounded-lg bg-blue-600 text-white font-bold">1</span>
                            <button className="px-3 py-1 mx-1 rounded-lg text-gray-700 hover:bg-gray-200">2</button>
                            <button className="px-3 py-1 mx-1 rounded-lg text-gray-700 hover:bg-gray-200">3</button>
                            <button className="px-3 py-1 mx-1 rounded-lg text-gray-700 hover:bg-gray-200">
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>

                    </div> {/* End Main Content Column */}

                    {/* COLUMN 2: SIDEBAR (1/3 width on large screens) */}
                    <aside className="lg:col-span-1 space-y-8">
                        
                        {/* POPULAR ARTICLES (Bài viết nổi bật trong tuần) */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                                <i className="bi bi-star-fill text-yellow-500 mr-2"></i> Bài Viết Phổ Biến
                            </h3>
                            <ul className="space-y-4">
                                <li className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                    <a href="#" className="block hover:text-blue-600 transition duration-150">
                                        <p className="font-semibold text-sm line-clamp-2">Tai nghe không dây mới của XYZ: Đáng tiền không?</p>
                                        <span className="text-xs text-gray-500 mt-1">2.5k lượt xem</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                    <a href="#" className="block hover:text-blue-600 transition duration-150">
                                        <p className="font-semibold text-sm line-clamp-2">Mẹo tối ưu hóa pin cho iPhone 15 Pro Max</p>
                                        <span className="text-xs text-gray-500 mt-1">1.8k lượt xem</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                    <a href="#" className="block hover:text-blue-600 transition duration-150">
                                        <p className="font-semibold text-sm line-clamp-2">Lộ diện thông số kỹ thuật của CPU Intel thế hệ 15</p>
                                        <span className="text-xs text-gray-500 mt-1">1.2k lượt xem</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* CATEGORIES (Danh mục) */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                                <i className="bi bi-folder-fill text-gray-400 mr-2"></i> Danh Mục
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <a href="#" className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-150 text-sm font-medium px-4 py-2 rounded-full">
                                    Smartphone (15)
                                </a>
                                <a href="#" className="bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-800 transition duration-150 text-sm font-medium px-4 py-2 rounded-full">
                                    Laptop (8)
                                </a>
                                <a href="#" className="bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-800 transition duration-150 text-sm font-medium px-4 py-2 rounded-full">
                                    AI & Phần mềm (22)
                                </a>
                                <a href="#" className="bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-800 transition duration-150 text-sm font-medium px-4 py-2 rounded-full">
                                    Đánh giá (10)
                                </a>
                                <a href="#" className="bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-gray-800 transition duration-150 text-sm font-medium px-4 py-2 rounded-full">
                                    Gaming (5)
                                </a>
                            </div>
                        </div>

                    </aside> {/* End Sidebar Column */}

                </div> {/* End Main Layout Grid */}
            </main>
            
        </div>
    );
}

export default NewsPage;