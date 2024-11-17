import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        name: "Nguyễn Văn An",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        profession: "Học viên | CodeGuru",
        comment: "Các khóa học tại CodeGuru thật sự rất chất lượng. Giảng viên tận tâm, nội dung dễ hiểu và phù hợp cho cả người mới bắt đầu.",
        rating: 5
    },
    {
        name: "Trần Minh Thư",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        profession: "Frontend Developer | FPT Software",
        comment: "Nhờ khóa học ReactJS tại CodeGuru, tôi đã nâng cao kỹ năng lập trình của mình và có được công việc như mong đợi.",
        rating: 5
    },
    {
        name: "Phạm Quốc Bảo",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        profession: "Học viên | Đại học Bách Khoa",
        comment: "Lộ trình học được xây dựng rất bài bản. CodeGuru thực sự là nơi tuyệt vời để bắt đầu hành trình lập trình của bạn.",
        rating: 5
    },
    {
        name: "Lê Thu Hằng",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        profession: "Backend Developer | VNG Corporation",
        comment: "Khóa học Node.js tại CodeGuru rất thực tế và hữu ích. Tôi đã áp dụng kiến thức ngay vào dự án công việc của mình.",
        rating: 5
    },
    {
        name: "Hoàng Duy Khang",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        profession: "Học viên | CodeGuru",
        comment: "Không chỉ học được kiến thức lập trình, tôi còn được tham gia vào cộng đồng các lập trình viên rất năng động.",
        rating: 5
    },
    {
        name: "Đặng Thảo Vy",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        profession: "UI/UX Designer | Freelance",
        comment: "Khóa học thiết kế giao diện tại CodeGuru đã giúp tôi cải thiện kỹ năng UI/UX và mở rộng cơ hội làm việc.",
        rating: 5
    }
];

const Feedback = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="bg-gradient-to-br from-[#0a0a0a] via-[#090909] to-[#0f0f0f] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block">
                        Feedback từ học viên
                        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#32759e] to-transparent"></div>
                    </h2>
                    <p className="text-lg text-gray-300">
                        Khám phá trải nghiệm học tập từ cộng đồng CodeGuru
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'scale-105' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 h-full relative overflow-hidden group">
                                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <Quote size={24} className="text-yellow-400" />
                                </div>

                                <div className="flex items-center mb-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400">
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
                                            <Star size={12} className="text-indigo-900" />
                                        </div>
                                    </div>

                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                                        <p className="text-sm text-gray-300">{review.profession}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className="inline-block text-yellow-400 mr-1"
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed relative">
                                    {review.comment}
                                </p>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400/0 via-yellow-400/50 to-yellow-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feedback;