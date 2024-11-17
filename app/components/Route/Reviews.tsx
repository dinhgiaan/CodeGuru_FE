import { comment } from 'postcss'
import React from 'react'
import Image from "next/image";
import { style } from '@/app/styles/style';
import ReviewCard from "../Review/ReviewCard"
type Props = {}
export const reviews =[
    {
        name:"Alex Nguyen",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Học sinh | Trường ĐH Bách Khoa",
        comment:
        "Giảng viên rất tận tâm và tài liệu học rất bổ ích! Nội dung khóa học được tổ chức rất hợp lý và dễ hiểu, giúp tôi tiếp thu kiến thức một cách nhanh chóng. Tôi cảm thấy mình đã tiến bộ rất nhiều trong suốt khóa học này và hy vọng sẽ áp dụng được những gì học được vào thực tế công việc sau này."
    },
    {
        name: "Emily Tran",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Sinh viên | Trường ĐH Kinh Tế",
        comment: "Giảng viên rất tận tâm và tài liệu học rất bổ ích! Nội dung khóa học được tổ chức rất hợp lý và dễ hiểu, giúp tôi tiếp thu kiến thức một cách nhanh chóng. Tôi cảm thấy mình đã tiến bộ rất nhiều trong suốt khóa học này và hy vọng sẽ áp dụng được những gì học được vào thực tế công việc sau này."
    },
    {
        name: "David Hoang",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "Kỹ sư phần mềm | Công ty ABC",
        comment: "Giảng viên rất tận tâm và tài liệu học rất bổ ích! Nội dung khóa học được tổ chức rất hợp lý và dễ hiểu, giúp tôi tiếp thu kiến thức một cách nhanh chóng. Tôi cảm thấy mình đã tiến bộ rất nhiều trong suốt khóa học này và hy vọng sẽ áp dụng được những gì học được vào thực tế công việc sau này."
    },
    {
        name: "Linda Le",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Nhân viên Marketing | Công ty XYZ",
        comment: "Giảng viên rất tận tâm và tài liệu học rất bổ ích! Nội dung khóa học được tổ chức rất hợp lý và dễ hiểu, giúp tôi tiếp thu kiến thức một cách nhanh chóng. Tôi cảm thấy mình đã tiến bộ rất nhiều trong suốt khóa học này và hy vọng sẽ áp dụng được những gì học được vào thực tế công việc sau này."
    },
    {
        name: "Tommy Vu",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Freelancer | Thiết kế đồ họa",
        comment: "Giảng viên rất tận tâm và tài liệu học rất bổ ích! Nội dung khóa học được tổ chức rất hợp lý và dễ hiểu, giúp tôi tiếp thu kiến thức một cách nhanh chóng. Tôi cảm thấy mình đã tiến bộ rất nhiều trong suốt khóa học này và hy vọng sẽ áp dụng được những gì học được vào thực tế công việc sau này."
    },
    {
        name: "Anna Nguyen",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Sinh viên | Trường ĐH Công Nghệ",
        comment: "Giảng viên rất tận tâm và tài liệu học rất bổ ích! Nội dung khóa học được tổ chức rất hợp lý và dễ hiểu, giúp tôi tiếp thu kiến thức một cách nhanh chóng. Tôi cảm thấy mình đã tiến bộ rất nhiều trong suốt khóa học này và hy vọng sẽ áp dụng được những gì học được vào thực tế công việc sau này."
    }
]

const Reviews = (props: Props) => {
  return (

    <div className="w-[90%] 800px:w-[85%] m-auto">
        <div className="w-full 800px:flex items-center">
            <div className="800px:w-[50%] w-full">
                <Image
                src={require("../../../public/assets/banner-img-1.png")}
                alt="business"
                width={500}
                height={500}
                />
            </div>
            <div className="800px:w-[50%] w-full">
            <h3 className={`${style.title} 800px:!text-[40px] `}>
    Học sinh của chúng tôi là <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">sức mạnh của chúng tôi</span>{" "}
    <br/> Hãy cùng nghe họ chia sẻ về chúng tôi
</h3>
                <br/>
                <p className={style.label}>
                Đây là phần mô tả chi tiết về những phản hồi của học sinh. 
                Chúng tôi rất tự hào về những thành tích và sự trưởng thành của học sinh qua mỗi ngày
                </p>
                
            </div>
            
            
        </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-12 border-0">
  {reviews &&
    reviews.map((i, index) => (
      <ReviewCard item={i} key={index} className="w-full h-auto" />
    ))}
</div>
    </div>
    
  )
}

export default Reviews