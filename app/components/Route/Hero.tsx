import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa";

type Props = {};

const Hero: FC<Props> = (props) => {
    return (
        <div className="w-full flex items-center">
            <div className="relative w-full h-[50vh] sm:h-[600px] lg:h-[700px] hero_animation">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between pt-[70px] lg:pt-0 z-10 relative">
                    {/* Bên trái: Hình ảnh */}
                    <div className="relative w-full min-h-screen lg:w-[40%] flex items-center justify-start">
                        <div className="absolute -top-[10] right-20 w-5/6 h-3/4 rounded-full bg-[#e8f3f8] dark:bg-[#48c2ee] z-0 overflow-hidden"></div>
                        <Image
                            src={require("../../../public/assets/banner-img-1.png")}
                            alt=""
                            className="object-contain w-[90%] lg:max-w-[90%] xl:max-w-[85%] h-auto z-10 left-12 relative"
                        />
                    </div>

                    {/* Bên phải: Nội dung */}
                    <div className="flex flex-col items-center text-center lg:text-left lg:w-[50%] lg:pr-[40px] lg:mr-[20px] mt-[150px] lg:mt-0">
                        <h2 className="dark:text-[#f7f7f7] text-[#000000c7] text-[30px] px-3 w-full lg:text-[40px] font-[600] font-Josefin py-2 lg:leading-[60px]">
                            Cải thiện trải nghiệm học tập trực tuyến của bạn tốt hơn ngay lập tức
                        </h2>
                        <p className="dark:text-[#f7f7f7] text-[#000000ac] font-Josefin font-[600] text-[18px] lg:w-[78%] xl:w-[65%] mt-[2%]">
                            Chúng tôi có hơn 10 khóa học trực tuyến và hơn 1000 học viên đăng ký trực tuyến. Tìm các khóa học mong muốn của bạn từ họ.
                        </p>
                        <div className="w-full h-[50px] bg-transparent relative mt-4">
                            <input
                                type="search"
                                placeholder="Tìm khóa học..."
                                className="bg-transparent border dark:border-none bg-[#def5fd] dark:bg-[#575757] rounded-[5px] p-2 w-full h-full outline-none text-[#070707] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                            />
                            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                                <div className="text-white">
                                    <BiSearch size={30} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <Image
                                src={require("../../../public/assets/SonDangF8.png")}
                                alt=""
                                className="rounded-full w-12 h-12 border-2 border-black dark:border-white object-cover bg-gray-400"
                            />
                            <Image
                                src={require("../../../public/assets/HoiDanIT.jpg")}
                                alt=""
                                className="rounded-full w-12 h-12 border-2 border-black dark:border-white object-cover bg-gray-400 -ml-4"
                            />
                            <Image
                                src={require("../../../public/assets/TrungQuanDev.jpeg")}
                                alt=""
                                className="rounded-full w-12 h-12 border-2 border-black dark:border-white object-cover bg-gray-400 -ml-4"
                            />
                            <p className="font-Josefin dark:text-[#f7f7f7] text-[#000000b3] pl-5 text-[18px] font-[600] flex items-center">
                                1000+ học viên đã tin tưởng vào <span className="dark:text-[#93e9bb] text-[#070707] ml-2">CodeGuru</span>.{" "}
                                <span className="flex items-center ml-2">
                                    <FaHandPointRight className="mr-2 mb-1" />{" "}
                                    <Link
                                        href="/courses"
                                        className="dark:text-[#efbfbf] text-blue-500"
                                    >
                                        Xem các khóa học
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
