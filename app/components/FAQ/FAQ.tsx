import React, { useEffect, useState } from 'react';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ = () => {
    const { data } = useGetHeroDataQuery("FAQ");
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            // Cập nhật danh sách câu hỏi và reset trạng thái
            setQuestions(data.layout.faq);
            setActiveQuestion(null); // Reset câu hỏi đang mở khi có dữ liệu mới
        }
    }, [data]);

    const toggleQuestion = (id: string) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className='text-center'>
                    <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mb-4">
                        FAQ
                    </span>
                </div>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative inline-block">
                        Câu hỏi thường gặp
                        <span className="absolute w-full h-1 bottom-[-15] left-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></span>
                    </h1>
                </div>
                {/* FAQ List */}
                <div className="space-y-4">
                    {questions.map((q, index) => (
                        <div
                            key={q._id}
                            className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
                         shadow-sm hover:shadow-md transition-all duration-200
                         ${activeQuestion === q._id ? 'ring-2 ring-purple-500' : ''}`}
                        >
                            <button
                                onClick={() => toggleQuestion(q._id)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between"
                            >
                                <span className="flex items-center">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm mr-4">
                                        {index + 1}
                                    </span>
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                        {q.question}
                                    </h3>
                                </span>
                                {activeQuestion === q._id ? (
                                    <ChevronUp className="w-5 h-5 text-purple-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {activeQuestion === q._id && (
                                <div className="px-6 pb-4">
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {q.answer}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>	
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;