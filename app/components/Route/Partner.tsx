import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'

const Partner = () => {
    return (
        <div className='w-[80%] h-auto my-32 ml-[180px] text-white text-center'>
            <div className='text-[40px] pb-2 font-Josefin flex justify-center items-center'>
                <div className='w-10 h-[0.9px] bg-green-700 mr-5' />
                <span className='bg-gradient-to-r from-[#00EAFF] to-[#b1b2df] text-transparent bg-clip-text'>Các đối tác đồng hành</span>
                <div className='w-10 h-[0.9px] bg-green-700 ml-5' />
            </div>
            <div>
                <Marquee className='bg-slate-200 rounded-md py-3 px-5' speed={85} autoFill>
                    <Image
                        src={require("../../../public/assets/dinhgiaandev-logo.png")}
                        width={100}
                        height={50}
                        objectFit="contain"
                        className="mx-6"
                        alt="Dinhgiaandev logo"
                    />
                    <Image
                        src={require("../../../public/assets/hoidanit-logo.png")}
                        width={100}
                        height={50}
                        objectFit="contain"
                        className="mx-6"
                        alt="Hoidanit logo"
                    />
                    <Image
                        src={require("../../../public/assets/f8-logo.png")}
                        width={100}
                        height={50}
                        objectFit="contain"
                        className="mx-6"
                        alt="F8 logo"
                    />
                    <Image
                        src={require("../../../public/assets/trungquandev-logo.png")}
                        width={100}
                        height={50}
                        objectFit="contain"
                        className="ml-6 mr-72"
                        alt="Trungquandev logo"
                    />
                </Marquee>
            </div>
        </div>
    )
}
export default Partner