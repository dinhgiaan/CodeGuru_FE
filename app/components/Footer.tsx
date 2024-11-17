'use client';
import React from 'react';
import Link from 'next/link';
import {
    FaFacebookF,
    FaGithub,
    FaGitlab,
    FaLinkedinIn,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-slate-100 to-white text-black dark:from-gray-900 dark:to-black dark:text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                                CodeGuru
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            CodeGuru là nền tảng học lập trình hàng đầu tại Việt Nam,
                            cung cấp các khóa học chất lượng cao và được thiết kế bởi
                            nhóm 10.
                        </p>
                        <div className="flex space-x-4 text-xl">
                            <a href="https://web.facebook.com/dgiaan04" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-400 transition-colors duration-300">
                                <FaFacebookF />
                            </a>
                            <a href="https://github.com/dinhgiaandev" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-400 transition-colors duration-300">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/%C4%91inh-gia-%C3%A2n-5424a4300/" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-400 transition-colors duration-300">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://gitlab.com/dinhgiaandev" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-400 transition-colors duration-300">
                                <FaGitlab />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-yellow-400">Khám phá</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/course" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center">
                                    <span className="mr-2">›</span> Khóa học
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center">
                                    <span className="mr-2">›</span> Về chúng tôi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-yellow-400">Hỗ trợ</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center">
                                    <span className="mr-2">›</span> FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/policy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center">
                                    <span className="mr-2">›</span> Chính sách
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-yellow-400">Liên hệ</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-400">
                                <FaMapMarkerAlt className="mr-3 text-yellow-400" />
                                <span>806 Quốc lộ 22, Ấp Mỹ Hòa 3, Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh.</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <FaPhone className="mr-3 text-yellow-400" />
                                <span>+84 856 562 424</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <FaEnvelope className="mr-3 text-yellow-400" />
                                <span>support@codeguru.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} CodeGuru.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300">
                                Quyền riêng tư
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;