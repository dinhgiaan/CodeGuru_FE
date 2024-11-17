import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa";

type Props = {};

const Hero: FC<Props> = (props) => {
    return (
        <div className="w-full flex items-center">
            <div className="relative w-full h-[50vh] sm:h-[600px] lg:h-[700px] bg-gradient-to-r from-[#a6e5e1] to-[#cbd6f1] dark:bg-gradient-to-r dark:from-[#100e0f] dark:to-[#121313]">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between pt-[70px] lg:pt-0 z-10 relative">
                    <div className="relative w-full min-h-screen lg:w-[40%] flex items-center justify-start">
                        <Image
                            src={require("../../../public/assets/banner.png")}
                            alt=""
                            className="object-contain w-[90%] lg:max-w-[90%] xl:max-w-[90%] h-auto z-10 left-12 relative"
                        />
                    </div>

                    <div className="flex flex-col items-center text-center lg:text-left lg:w-[50%] lg:pr-[40px] lg:mr-[20px] mt-[150px] lg:mt-0">
                        <h2 className="dark:text-[#f7f7f7] text-[#000000c7] text-[30px] px-3 w-full lg:text-[40px] font-[600] font-Josefin py-2 lg:leading-[60px]">
                            Định hình tương lai công nghệ của bạn với trải nghiệm học tập số hóa đột phá
                        </h2>
                        <p className="dark:text-[#f7f7f7] text-[#000000ac] font-Josefin font-[600] text-[18px] lg:w-[78%] xl:w-[65%] mt-[2%]">
                            CodeGuru - Nền tảng đào tạo lập trình hàng đầu với 15+ khóa học chuyên sâu được thiết kế bởi các chuyên gia công nghệ. Khám phá công nghệ mới, xây dựng portfolio ấn tượng và phát triển sự nghiệp trong kỷ nguyên số cùng cộng đồng 1,000+ developers tại CodeGuru.
                        </p>
                        <div className="w-full h-[50px] bg-transparent relative mt-4">
                            <input
                                type="search"
                                placeholder="Khám phá khóa học phù hợp với bạn..."
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
                                Tham gia cùng 1000+ developers đang phát triển cùng <span className="dark:text-[#93e9bb] text-[#070707] ml-2">CodeGuru</span>{" "}
                                <span className="flex items-center ml-2">
                                    <FaHandPointRight className="mr-2 mb-1" />{" "}
                                    <Link
                                        href="/courses"
                                        className="dark:text-[#efbfbf] text-blue-500"
                                    >
                                        Khám phá ngay
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