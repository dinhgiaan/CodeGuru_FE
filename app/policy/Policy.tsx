import React from 'react'
import { style } from '../styles/style'

type Props = {}

const Policy = (props: Props) => {
    return (
        <div className="text-black dark:text-white font-Roboto">
            <br />
            <h1 className={`${style.title} 800px:!text-[45px]`}>
                Chính sách tại <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">CodeGuru</span>
            </h1>
            <br />
            <div className="w-[95%] 800px:w-[85%] m-auto leading-[1.8]">
                <p className="text-[18px] font-Poppins">
                    Tại <strong>CodeGuru</strong>, chúng tôi cam kết đặt trải nghiệm và sự hài lòng của học viên lên hàng đầu.
                    Các chính sách của chúng tôi được xây dựng nhằm đảm bảo quyền lợi tối đa, đồng thời mang lại hành trình học tập chuyên nghiệp và dễ dàng cho mọi người.
                </p>
                <br />
                <ul className="list-disc pl-5 text-[18px] font-Roboto">
                    <li><strong>Chính sách hoàn tiền:</strong> Học viên có thể yêu cầu hoàn tiền 100% trong vòng 7 ngày đầu nếu khóa học không đáp ứng kỳ vọng, không cần giải thích.</li>
                    <li><strong>Hỗ trợ học tập 24/7:</strong> Đội ngũ giảng viên và chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn qua các kênh trực tuyến như email, diễn đàn, và trò chuyện trực tiếp.</li>
                    <li><strong>Cập nhật liên tục:</strong> Chúng tôi không ngừng cải tiến và cập nhật nội dung khóa học để phù hợp với các xu hướng công nghệ mới nhất, đảm bảo bạn luôn đi trước trong lĩnh vực.</li>
                    <li><strong>Bảo mật dữ liệu:</strong> Thông tin cá nhân và dữ liệu của bạn được bảo vệ bằng các công nghệ mã hóa tiên tiến nhất, đảm bảo sự riêng tư và an toàn tuyệt đối.</li>
                </ul>
                <br />
                <p className="text-[18px] font-Poppins">
                    Với phương châm “Học để thành công”, <strong>CodeGuru</strong> luôn nỗ lực mang đến những giá trị vượt ngoài mong đợi.
                    Chúng tôi không chỉ là nền tảng học lập trình, mà còn là người bạn đồng hành trên chặng đường chinh phục tri thức và sự nghiệp của bạn.
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
export default Policy
