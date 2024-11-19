import { style } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyInReviewMutation, useAddReviewInCourseMutation, useGetCoursesDetailsQuery } from '@/redux/features/course/courseAPI';
import Image from 'next/image';
import { format } from 'timeago.js';

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { course } from '@/app/styles/course';
import Rating from '@/app/utils/Rating';
import { Reply } from 'lucide-react';
import { comment } from 'postcss';

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any
    refetch: any;
}

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [answer, setAnswer] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [isReviewReply, setIsReviewReply] = useState(false);
    const [reply, setReply] = useState(``)
    const [reviewId, setReviewId] = useState("");
    const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation({});
    const [addAnswerInQuestion, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] = useAddAnswerInQuestionMutation();
    const { data: courseData, refetch: courseRefetch } = useGetCoursesDetailsQuery(id, { refetchOnMountOrArgChange: true });
    const [addReviewInCourese, { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewCreationLoading }] = useAddReviewInCourseMutation();
    const course = courseData?.course;
    const [addReplyInReview, { isSuccess: replySuccess, error: replyError, isLoading: replyCreationLoading }] = useAddReplyInReviewMutation();
    const isReviewExists = course?.reviews?.find((item: any) => item.user._id === user._id);

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Câu hỏi không được để trống");
        } else {
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id })
        }

    }
    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch();
            toast.success("Câu hỏi được thêm thành công!")
        }
        if (answerSuccess) {
            setAnswer("")
            refetch();
            toast.success("Trả lời được thêm thành công!")
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (answerError) {
            if ("data" in answerError) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (reviewSuccess) {
            setReview("")
            setRating(1);
            refetch();
            toast.success("Đánh giá được thêm thành công!");
        }
        if (reviewError) {
            if ("data" in reviewError) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (replySuccess) {
            setReply('');
            courseRefetch();
            toast.success("Phản hồi đánh giá thành công");
        }
        if (replyError) {
            if ("data" in replyError) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);

            }
        }
    }, [isSuccess, error, answerSuccess, answerError, reviewSuccess, reviewError, replySuccess, replyError])
    const handleAnswerSubmit = () => {
        addAnswerInQuestion({ answer, courseId: id, contentId: data[activeVideo]._id, questionId: questionId })
    }
    const handleReviewSubmit = async () => {
        if (review.length === 0) {
            toast.error("Đánh giá không được để trống!");
        } else {
            addReviewInCourese({ review, rating, courseId: id });
        }
    }
    const handleReviewReplySubmit = () => {
        if (!replyCreationLoading) {
            if (reply === "") {
                toast.error("Đánh giá không được để trống!")
            } else {
                addReplyInReview({ comment: reply, courseId: id, reviewId })
            }
        }
    }

    return (
        <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />
            <div className='w-full flex items-center justify-between my-3'>
                <div className={`${style.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft className='mr-2' />
                    Bài học trước
                </div>
                <div className={`${style.button} w-[unset] w-[80px] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >
                    Bài học tiếp theo
                    <AiOutlineArrowRight className='ml-2' />
                </div>
            </div>
            <h1 className='pt-2 text-[25px] font-[600] dark:text-white text-black'>{data[activeVideo].title}</h1>
            <br />
            <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
                {["Tổng quan", "Tài nguyên", "Q & A", "Đánh giá"].map((item, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-400" : "dark:text-white  text-black"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {item}
                    </h5>
                ))}
            </div>
            <br />
            {
                activeBar === 0 && (
                    <p className='text-[18px] dark:text-white text-black whitespace-pre-line mb-3'>{data[activeVideo]?.description}</p>
                )
            }
            {
                activeBar === 1 && (
                    <div>
                        {data[activeVideo]?.links.map((item: any, index: number) => (
                            <div className='mb-5'>
                                <h2 className='800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                                    {item.title && item.title + " :"}
                                </h2>
                                <a className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2' href={item.url} >
                                    {item.url}
                                </a>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <>
                        <div className='flex w-full'>
                            <Image
                                src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/duw4cwp7d/image/upload/v1731131446/avatars/v7mr3zt3yoj0n0f9bobj.png"}
                                width={50}
                                height={50}
                                alt=''
                                className='w-[50px] h-[50px] rounded-full object-cover'
                            />
                            <textarea
                                name=''
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                id=''
                                cols={40}
                                rows={5}
                                placeholder='Nhập câu hỏi của bạn...'
                                className='outline-none bg-transparent ml-3 border border-[#ffffff57] dark:border-zinc-800 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Roboto dark:text-white text-black'
                            >
                            </textarea>
                        </div>
                        <div className='w-full flex justify-end'>
                            <div className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && 'cursor-not-allowed'} `}
                                onClick={questionCreationLoading ? () => { } : handleQuestion}

                            >
                                Đăng
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full h-[1px] bg-[#fffff3b]"></div>
                        <div>
                            <CommentReply
                                data={data}
                                activeVideo={activeVideo}
                                answer={answer}
                                setAnswer={setAnswer}
                                handleAnswerSubmit={handleAnswerSubmit}
                                user={user}
                                setQuestionId={setQuestionId}
                            />
                        </div>
                    </>
                )
            }
            {
                activeBar === 3 && (
                    <div className='w-full dark:text-white text-black'>
                        <>
                            {
                                !isReviewExists && (
                                    <>
                                        <div className='flex w-full'>
                                            <Image
                                                src={
                                                    user.avatar ? user.avatar.url : "https://res.cloudinary.com/duw4cwp7d/image/upload/v1731131446/avatars/v7mr3zt3yoj0n0f9bobj.png"
                                                }
                                                width={50}
                                                height={50}
                                                alt=''
                                                className='w-[50px] h-[50px] rounded-full object-cover'
                                            />
                                            <div className='w-full'>
                                                <h5 className='pl-3 text-[20px] font-[500] dark:text-white text-black'>
                                                    Cho đánh giá <span className='text-red-500'>*</span>
                                                </h5>
                                                <div className='flex w-full ml-2 pb-3'>
                                                    {[1, 2, 3, 4, 5].map((i) =>
                                                        rating >= i ? (
                                                            <AiFillStar
                                                                key={i}
                                                                className='mr-1 cursor-pointer'
                                                                color='rgb(246,186,0)'
                                                                size={25}
                                                                onClick={() => setRating(i)}
                                                            />
                                                        ) : (
                                                            <AiOutlineStar
                                                                key={i}
                                                                className='mr-1 cursor-pointer'
                                                                color='rgb(246,186,0)'
                                                                size={25}
                                                                onClick={() => setRating(i)}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <textarea
                                                    name=''
                                                    value={review}
                                                    onChange={(e) => setReview(e.target.value)}
                                                    id=''
                                                    cols={40}
                                                    rows={5}
                                                    placeholder='Nhập đánh giá của bạn...'
                                                    className='outline-none bg-transparent ml-3 border border-[#ffffff57] dark:border-zinc-800 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Roboto dark:text-white text-black'
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-end'>
                                            <div className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewCreationLoading && 'cursor-no-drop'}`}
                                                onClick={reviewCreationLoading ? () => { } : handleReviewSubmit}
                                            >
                                                Đăng
                                            </div>
                                        </div>
                                    </>
                                )}
                            <br />
                            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                            <div className="w-full">
                                {(course?.reviews && [...course.reviews].reverse()).map(
                                    (item: any, index: number) => (
                                        <div className="w-full my-5 dark:text-white text-black">
                                            <div className="w-full flex">
                                                <div>
                                                    <Image
                                                        src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/duw4cwp7d/image/upload/v1731131446/avatars/v7mr3zt3yoj0n0f9bobj.png"}
                                                        width={50}
                                                        height={50}
                                                        alt=''
                                                        className='w-[50px] h-[50px] rounded-full object-cover'
                                                    />
                                                </div>
                                                <div className="ml-2">
                                                    <h1 className="text-[18px]">{item?.user.name}</h1>
                                                    <Rating rating={item.rating} />
                                                    <p>{item.comment}</p>
                                                    <small className="text-[#0000009e] dark:text-[#ffffff83]">
                                                        {format(item.createdAt)}
                                                    </small>
                                                </div>
                                            </div>
                                            {
                                                user.role === "admin" && (
                                                    <span
                                                        className={`${style.label} !ml-5 cursor-pointer`}
                                                        onClick={() => setReviewId(item._id)}
                                                    >
                                                        Thêm phản hồi
                                                    </span>
                                                )
                                            }
                                            {
                                                reviewId === item._id && (
                                                    <div className="w-full flex relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Nhập phản hồi của bạn...."
                                                            value={reply}
                                                            onChange={(e) => setReply(e.target.value)}
                                                            className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="absolute right-10 bottom-1"
                                                            onClick={handleReviewReplySubmit}
                                                        >
                                                            Gửi
                                                        </button>
                                                    </div>
                                                )
                                            }


                                            {
                                                item.commentReplies.map((i: any, index: number) => (
                                                    <div key={index} className="w-full flex 800px:ml-16 my-5">
                                                        <div className="w-[50px] h-[50px]">
                                                            <Image
                                                                src={i.user.avatar ? i.user.avatar.url : "https://res.cloudinary.com/duw4cwp7d/image/upload/v1731131446/avatars/v7mr3zt3yoj0n0f9bobj.png"}
                                                                width={50}
                                                                height={50}
                                                                alt=""
                                                                className="w-[50px] h-[50px] rounded-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="pl-2">
                                                            <div className="flex items-center">
                                                            <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                                                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]"/>
                                                            </div>
                                                            <p>{i.comment}</p>
                                                            <small className="text-[#ffffff83]">
                                                                {format(i.createdAt)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    )
                                )}
                            </div>


                        </>
                    </div>
                )
            }
        </div>
    )
}

const CommentReply = ({
    data,
    activeVideo,
    answer,
    setAnswer,
    handleAnswerSubmit,
    user,
    setQuestionId,
    answerCreationLoading
}: any) => {
    return (
        <>
            <div className="w-full my-3">
                {
                    data[activeVideo].questions.map((item: any, index: any) => (
                        <CommentItem
                            key={index}
                            data={data}
                            activeVideo={activeVideo}
                            item={item}
                            index={index}
                            answer={answer}
                            setAnswer={setAnswer}
                            setQuestionId={setQuestionId}
                            handleAnswerSubmit={handleAnswerSubmit}
                            answerCreationLoading={answerCreationLoading}
                        />
                    ))
                }
            </div>
        </>

    )

}


const CommentItem = ({
    data,
    setQuestionId,
    item,
    answer,
    setAnswer,
    handleAnswerSubmit,
    answerCreationLoading
}: any) => {
    const [replyActive, setreplyActive] = useState(false);
    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    <div>
                        <Image
                            src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/duw4cwp7d/image/upload/v1731131446/avatars/v7mr3zt3yoj0n0f9bobj.png"}
                            width={50}
                            height={50}
                            alt=''
                            className='w-[50px] h-[50px] rounded-full object-cover'
                        />
                    </div>
                    <div className="pl-3 text-black dark:text-white">
                        <h5 className="text-[20px] ">{item?.user.name}</h5>
                        <p className='text-black dark:text-white'>{item?.question}</p>
                        <small className="text-white">{!item.createdAt ? "" : format(item?.createdAt)}</small>
                    </div>
                </div>
                <div className="w-full flex">
                    <span className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
                        onClick={() => {
                            setreplyActive(!replyActive)
                            setQuestionId(item._id)

                        }}
                    >
                        {!replyActive ? item.questionReplies.length !== 0 ? "Tất cả phản hồi" : "Thêm phản hồi" : "Ẩn phản hồi"}
                    </span>
                    <BiMessage size={20} className="cursor-pointer" fill="#ffffff83" />
                    <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]">
                        {item.questionReplies.length}
                    </span>
                </div>
                {
                    replyActive && (
                        <>
                            {item.questionReplies.map((item: any) => (
                                <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                                    <div>
                                        <Image
                                            src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/duw4cwp7d/image/upload/v1731131446/avatars/v7mr3zt3yoj0n0f9bobj.png"}
                                            width={50}
                                            height={50}
                                            alt=''
                                            className='w-[50px] h-[50px] rounded-full object-cover'
                                        />
                                    </div>
                                    <div className="pl-2">
                                        <div className="flex items-center">
                                            <h5 className="text-[20px]">{item.user.name}</h5> {item.user.role === "admin" && <VscVerifiedFilled className="text-green-400 ml-2 text-[20px]" />}
                                        </div>
                                        <p>{item.answer}</p>
                                        <small className="text-[#ffffff83]">
                                            {format(item.createdAt)}
                                        </small>
                                    </div>
                                </div>
                            ))}
                            <>
                                <div className="w-full flex relative dark:text-white text-black">
                                    <input
                                        type="text"
                                        placeholder="Nhập câu trả lời của bạn..."
                                        value={answer}
                                        onChange={(e: any) => setAnswer(e.target.value)}
                                        className={`block 800px:: ml-12 mt-2 outline-none bg-transparent border-[#00000027] dark:text-white text-black dark:border-[#fff] p -[5px] w-[95%] ${answer === "" || answerCreationLoading && 'cursor-not-allowed'}`}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 bottom-1"
                                        onClick={handleAnswerSubmit}
                                        disabled={answer === "" || answerCreationLoading}
                                    >
                                        Gửi
                                    </button>
                                </div>
                                <br />
                            </>
                        </>
                    )
                }

            </div>
            console.log("check data: ", data)
        </>
    )

}

export default CourseContentMedia