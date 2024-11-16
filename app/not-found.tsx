'use client'
import Link from "next/link";
import React from "react";
import { Home, ArrowLeft, RefreshCcw } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full text-center space-y-8">
                {/* 404 Image và Animation */}
                <div className="relative">
                    <img
                        src="/assets/not-found.png"
                        alt="404 Illustration"
                        className="mx-auto rounded-lg shadow-xl animate-float"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-9xl font-bold text-green-600 opacity-90 animate-pulse">
                            404
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                        Trang không được tìm thấy
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Xin lỗi, trang bạn đang tìm kiếm có thể đã bị di chuyển hoặc không còn tồn tại.
                        Hãy thử truy cập trang chủ hoặc tìm kiếm nội dung khác.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Home size={20} />
                        Trở về trang chủ
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-full font-semibold border-2 border-green-600 hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft size={20} />
                        Quay lại
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <RefreshCcw size={20} />
                        Tải lại trang
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default NotFound;