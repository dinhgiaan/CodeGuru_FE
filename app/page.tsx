'use client'
import React, { FC, useState } from 'react'
import Heading from './utils/Heading';
import Header from "./components/Header";
import Hero from './components/Route/Hero'
import Courses from "./components/Route/Courses"
import Footer from './components/Footer';
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"

interface Props {
     className: string,
}

const Page: FC<Props> = (props) => {
     const [open, setOpen] = useState(false);
     const [activeItem, setActive] = useState(0);
     const [route, setRoute] = useState("Login");
     return (
          <>
               <div>
                    <Heading
                         title='CodeGuru'
                         description='CodeGuru là trang web cung cấp các khóa học đa dạng'
                         keywords='Programming, MERN, Redux, LMS'
                    />
                    <Header
                         open={open}
                         setOpen={setOpen}
                         activeItem={activeItem}
                         setRoute={setRoute}
                         route={route}
                    />
                    <Hero />
                    <Courses />
                    <Reviews />
                    <FAQ/>
                    <Footer />
               </div>
          </>
     )
}

export default Page