import React from 'react';
import { Shield, Clock, RefreshCw, Headphones, CheckCircle } from 'lucide-react';

const Policy = () => {
    const policies = [
        {
            icon: <Shield className="w-8 h-8 text-purple-500" />,
            title: "Chính sách hoàn tiền",
            description: "Hoàn tiền 100% trong vòng 7 ngày đầu nếu khóa học không đáp ứng kỳ vọng, không cần giải thích.",
            details: "Chúng tôi tin tưởng vào chất lượng khóa học của mình và muốn bạn cảm thấy tự tin khi đầu tư vào việc học."
        },
        {
            icon: <Headphones className="w-8 h-8 text-pink-500" />,
            title: "Hỗ trợ học tập 24/7",
            description: "Đội ngũ giảng viên và chuyên gia luôn sẵn sàng hỗ trợ qua email, diễn đàn, và trò chuyện trực tiếp.",
            details: "Không để bạn đơn độc trên hành trình học tập, chúng tôi luôn ở đây để giải đáp mọi thắc mắc."
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-blue-500" />,
            title: "Cập nhật liên tục",
            description: "Nội dung khóa học được cập nhật thường xuyên theo xu hướng công nghệ mới nhất.",
            details: "Đảm bảo kiến thức bạn học được luôn phù hợp với nhu cầu thực tế của thị trường."
        },
        {
            icon: <Shield className="w-8 h-8 text-green-500" />,
            title: "Bảo mật dữ liệu",
            description: "Thông tin cá nhân được bảo vệ bằng công nghệ mã hóa tiên tiến nhất.",
            details: "Cam kết bảo vệ quyền riêng tư và an toàn thông tin của học viên là ưu tiên hàng đầu."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-Roboto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-4">
                        Chính sách
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Chính sách tại{" "}
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                            CodeGuru
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Cam kết đặt trải nghiệm và sự hài lòng của học viên lên hàng đầu
                    </p>
                </div>

                {/* Main Content */}
                <div className="space-y-12">
                    {/* Policy Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {policies.map((policy, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        {policy.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-3">{policy.description}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{policy.details}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Information */}
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold mb-4">Cam kết của chúng tôi</h2>
                            <p className="text-lg mb-6">
                                Với phương châm "Học để thành công", <strong>CodeGuru</strong> luôn nỗ lực mang đến những giá trị vượt ngoài mong đợi.
                                Chúng tôi không chỉ là nền tảng học lập trình, mà còn là người bạn đồng hành trên chặng đường chinh phục tri thức và sự nghiệp của bạn.
                            </p>
                        </div>
                    </div>

                    {/* Benefits List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['Truy cập trọn đời', 'Chứng chỉ có giá trị', 'Học theo lộ trình', 'Bài tập thực tế'].map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policy;