import Link from 'next/link';
import React from 'react'


export const navItemsData = [
    {
        name: 'Trang chủ',
        url: "/",
    },
    {
        name: "Khóa học",
        url: "/courses",
    },
    {
        name: "Về chúng tôi",
        url: "/about",
    },
    {
        name: "Chính sách",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            {/* Phần dành cho desktop */}
            {!isMobile && (
                <div className="hidden 800px:flex">
                    {
                        navItemsData && navItemsData.map((item, index) => (
                            <Link href={`${item.url}`} key={index} passHref>
                                <span className={`${activeItem === index
                                    ? "dark:text-[#37a39a] text-[crimson]"
                                    : "dark:text-white text-black"
                                    } text-[19px] px-6 font-Josefin font[400]`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            )}

            {/* Phần dành cho di động */}
            {isMobile && (
                <div className="800px:hidden mt-5">
                    <div className='w-full text-center py-6'>
                        <Link href={"/"} passHref>
                            <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                CodeGuru
                            </span>
                        </Link>
                    </div>
                    <div className="w-full text-center py-6">
                        {
                            navItemsData && navItemsData.map((item, index) => (
                                <Link href={item.url} key={index} passHref>
                                    <span
                                        className={`${activeItem === index
                                            ? "dark:text-[#37a39a] text-[crimson]"
                                            : "dark:text-white text-black"
                                            } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            )}
        </>
    );
}
export default NavItems