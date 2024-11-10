'use client'
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="dark:bg-[#c3c3c3] bg-white py-6 max-h-80">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex space-x-4 mb-4">
                    <Link href="/course" className="hover:text-yellow-400">Khóa học</Link>
                    <Link href="/about-us" className="hover:text-gray-400">Về chúng tôi</Link>
                    <Link href="/privacy" className="hover:text-gray-400">Chính sách</Link>
                    <Link href="/faq" className="hover:text-gray-400">FAQ</Link>
                </div>
                <div className="flex space-x-4 mb-4">
                    <Link href="https://web.facebook.com/dgiaan04" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaFacebookF />
                    </Link>
                    <a href="https://github.com/dinhgiaandev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/%C4%91inh-gia-%C3%A2n-5424a4300/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FaLinkedinIn />
                    </a>
                </div>
                <p className="mt-4 text-sm">© {new Date().getFullYear()} CodeGuru. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;