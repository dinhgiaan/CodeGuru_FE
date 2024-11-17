import React from 'react'
import { style } from '../styles/style'

type Props = {}

const About = (props: Props) => {
    return (
        <div className="text-black dark:text-white">
            <br />
            <h1 className={`${style.title} 800px:!text-[45px]`}>
                Khám phá <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">CodeGuru</span>
            </h1>
            <br />
            <div className="w-[95%] 800px:w-[85%] m-auto leading-[1.8]">
                <p className="text-[18px] font-Poppins">
                    Trong kỷ nguyên công nghệ hiện đại, việc sở hữu kỹ năng lập trình không chỉ mang đến cơ hội nghề nghiệp rộng mở,
                    mà còn là chìa khóa để bạn chinh phục những thử thách mới và định hình tương lai của chính mình.
                    <strong>CodeGuru</strong> tự hào là nền tảng học lập trình hàng đầu, nơi tập hợp các khóa học chất lượng cao được thiết kế bởi đội ngũ chuyên gia giàu kinh nghiệm,
                    nhằm mang đến một hành trình học tập không chỉ hiệu quả mà còn đầy cảm hứng và sáng tạo.
                </p>
                <br />
                <p className="text-[18px] font-Poppins">
                    Tại <strong>CodeGuru</strong>, chúng tôi tin rằng mỗi người học đều là một cá nhân duy nhất với nhu cầu và mục tiêu riêng biệt.
                    Vì vậy, chúng tôi xây dựng các khóa học theo lộ trình linh hoạt, phù hợp cho cả người mới bắt đầu và những lập trình viên dày dạn kinh nghiệm.
                    Từ các bài giảng chi tiết đến các bài tập thực hành thực tế, bạn sẽ luôn nhận được sự hỗ trợ tận tình từ đội ngũ giảng viên và cộng đồng lập trình viên sôi nổi,
                    giúp bạn nhanh chóng nắm vững kiến thức và áp dụng thành công vào công việc thực tiễn.
                </p>
                <br />
                <p className="text-[18px] font-Poppins">
                    Tham gia <strong>CodeGuru</strong>, bạn không chỉ học lập trình mà còn trở thành một phần của cộng đồng đam mê công nghệ,
                    nơi bạn có thể kết nối, học hỏi và chia sẻ kinh nghiệm với hàng ngàn lập trình viên khác.
                    Đây không chỉ là nền tảng học tập, mà còn là ngôi nhà chung của những người yêu thích sáng tạo, đổi mới, và khát khao phát triển.
                </p>
                <br />
                <p className="text-[18px] font-Poppins">
                    Hãy để <strong>CodeGuru</strong> đồng hành cùng bạn trên con đường khai phá tiềm năng bản thân và xây dựng sự nghiệp đáng mơ ước trong lĩnh vực công nghệ.
                    Đừng chần chừ, bởi thành công bắt đầu từ quyết định hôm nay!
                </p>
                <br />
                <span className="text-[22px] font-semibold">Đinh Gia Ân,</span>
                <h5 className="text-[18px] font-Poppins">
                    Người sáng lập và CEO của CodeGuru
                </h5>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}
export default About
