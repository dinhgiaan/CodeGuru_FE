import React from 'react'
import { style } from '../styles/style'
import { Spa } from '@mui/icons-material'

type Props = {}

const About = (props: Props) => {
    return (
        <div className="text-black dark:text-white">
            <br />
            <h1 className={`${style.title} 800px:!text-[45px]`}>
                Giới thiệu về <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"> CodeGuru</span>
            </h1>
            <br />
            <div className="w-[95%] 800px:w-[85%] m-auto">
                <p className="text-[18px] font-Poppins">
                    Bạn đang tìm cách nâng cao kỹ năng lập trình của mình? 
                    Hãy đến với CodeGuru – nền tảng học lập trình hàng đầu, nơi cung cấp các khóa học chất lượng cao với mức giá phải chăng, 
                    giúp bạn chinh phục đỉnh cao trong ngành lập trình. Với đội ngũ giảng viên giàu kinh nghiệm và tài nguyên phong phú, 
                    CodeGuru cam kết mang đến cho người học một hành trình học tập đầy hứng khởi và hiệu quả.
                <br/>
                <br/>
                Chúng tôi tin rằng học lập trình không chỉ là việc nắm vững ngôn ngữ hay công cụ mà còn là sự chuẩn bị để đạt được những mục tiêu và phát triển sự nghiệp trong ngành công nghệ. 
                Tại CodeGuru, mọi khóa học đều được thiết kế cẩn thận để phù hợp với cả người mới bắt đầu và những người đã có kinh nghiệm. 
                Cùng với cộng đồng lập trình viên sôi nổi, bạn sẽ luôn có sự hỗ trợ và nguồn động lực để tiến xa hơn.
                <br/>
                <br/>
                Tại codeGuru, chúng tôi hiểu rằng con đường học tập lập trình có thể đầy thách thức. 
                Vì thế, mọi khóa học đều được thiết kế chi tiết, dễ hiểu và đi kèm với các bài tập thực hành thực tế, giúp bạn nhanh chóng nắm vững kiến thức và áp dụng vào công việc. 
                Dù bạn là người mới bắt đầu hay đã có nền tảng vững chắc, codeGuru đều có lộ trình phù hợp với nhu cầu và mục tiêu của bạn.
                <br/>
                <br/>
                Ngoài các khóa học, chúng tôi còn xây dựng một cộng đồng lập trình viên sôi nổi, nơi bạn có thể học hỏi, chia sẻ kiến thức, và nhận được sự hỗ trợ từ các thành viên khác. 
                CodeGuru không chỉ là nơi để học, mà còn là ngôi nhà chung cho những ai đam mê công nghệ và mong muốn phát triển bản thân.
                <br/>
                <br/>
                Hãy tham gia CodeGuru ngay hôm nay để bắt đầu hành trình của bạn trong ngành lập trình và khai phá tiềm năng của bản thân mà không cần lo lắng về chi phí. Chúng tôi ở đây để đồng hành cùng bạn trên con đường chinh phục những thử thách và vươn tới thành công!
                </p>
                <br/>
                <span className="text-[22px]">Alex Nguyen</span>
                <h5 className="text-[18px] font-Poppins">
                    Founder and CEO of CodeGuru
                </h5>
                <br/>
                <br/>
                <br/>
            </div>

        </div>
    )
}
export default About