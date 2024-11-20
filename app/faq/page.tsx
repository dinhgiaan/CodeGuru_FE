'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import FAQ from "../components/FAQ/FAQ"
import Footer from '../components/Footer'
type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActive] = useState(4);
    const [route, setRoute] = useState("Login");

    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <Heading
                    title="FAQ của CodeGuru"
                    description='CodeGuru là trang web cung cấp các khóa học đa dạng'
                    keywords='Programming, MERN, Redux, LMS'
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    route={route}
                    setRoute={setRoute}
                />
                <br/>
                <FAQ />
                <Footer />
            </div>
        </>
    )
}

export default page