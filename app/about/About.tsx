import React from 'react';
import { Users, Rocket, Brain, Code, GraduationCap } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Code className="w-8 h-8 text-pink-500" />,
            title: "Khóa học chất lượng",
            description: "Được thiết kế bởi các chuyên gia hàng đầu trong ngành"
        },
        {
            icon: <Users className="w-8 h-8 text-purple-500" />,
            title: "Cộng đồng sôi nổi",
            description: "Kết nối và học hỏi cùng hàng nghìn lập trình viên khác"
        },
        {
            icon: <Brain className="w-8 h-8 text-blue-500" />,
            title: "Học tập linh hoạt",
            description: "Lộ trình phù hợp cho mọi trình độ"
        },
        {
            icon: <GraduationCap className="w-8 h-8 text-green-500" />,
            title: "Thực tiễn",
            description: "Tập trung vào các dự án và bài tập thực tế"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-Roboto">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-4">
                        Về chúng tôi
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Khám phá{" "}
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                            CodeGuru
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Nền tảng học lập trình hàng đầu, nơi đam mê gặp gỡ cơ hội
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="md:flex md:gap-12">
                    <div className="md:w-2/3">
                        <div className="space-y-8">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                Trong kỷ nguyên công nghệ hiện đại, việc sở hữu kỹ năng lập trình không chỉ mang đến cơ hội nghề nghiệp rộng mở,
                                mà còn là chìa khóa để bạn chinh phục những thử thách mới và định hình tương lai của chính mình.
                            </p>

                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                Tại <strong className="text-purple-600 dark:text-purple-400">CodeGuru</strong>,
                                chúng tôi tin rằng mỗi người học đều là một cá nhân duy nhất với nhu cầu và mục tiêu riêng biệt.
                                Vì vậy, chúng tôi xây dựng các khóa học theo lộ trình linh hoạt, phù hợp cho cả người mới bắt đầu
                                và những lập trình viên dày dạn kinh nghiệm.
                            </p>

                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                Tham gia <strong className="text-purple-600 dark:text-purple-400">CodeGuru</strong>,
                                bạn không chỉ học lập trình mà còn trở thành một phần của cộng đồng đam mê công nghệ,
                                nơi bạn có thể kết nối, học hỏi và chia sẻ kinh nghiệm với hàng ngàn lập trình viên khác.
                            </p>
                        </div>
                    </div>

                    {/* CEO Message */}
                    <div className="md:w-1/3 mt-8 md:mt-0">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white">
                            <div className="space-y-6">
                                <div className="text-2xl font-bold">CEO Message</div>
                                <p className="text-lg">
                                    "Hãy để CodeGuru đồng hành cùng bạn trên con đường khai phá tiềm năng bản thân
                                    và xây dựng sự nghiệp đáng mơ ước trong lĩnh vực công nghệ."
                                </p>
                                <div className="pt-4 border-t border-white/20">
                                    <div className="font-semibold text-xl">Đinh Gia Ân</div>
                                    <div className="text-sm opacity-80">Người sáng lập và CEO của CodeGuru</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;