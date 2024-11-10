'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from "../components/Profile/Profile";
import { useSelector } from 'react-redux'
type Props = {}

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActive] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`Hồ sơ của ${user?.name}`}
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
        <Profile user={user} />
      </Protected>
    </div>
  )
}

export default page