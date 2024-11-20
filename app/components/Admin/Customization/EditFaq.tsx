import { useGetHeroDataQuery, useEditLayoutMutation } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { style } from '@/app/styles/style';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FcAnswers } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import Link from 'next/link';
type Props = {}

const EditFaq = (props: Props) => {
    const { data, isLoading,refetch } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
        if (layoutSuccess) {
            toast.success("FAQ cập nhật thành công")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message)
            }
        }
    }, [data, layoutSuccess, error]);

    const toggleQuestion = (id: any) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))

        )
    }
    const handleQuestionChange = (id: any, value: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q._id === id ? { ...q, question: value } : q
            )
        );
    };
    
    const handleAnswerChange = (id: any, value: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))

        )
    }
    const newFaqHandler = () => {
        setQuestions([
            ...questions,
            {
                _id: Date.now().toString(), // Tạo ID tạm thời
                question: "", // Dùng "question" thay vì "questions"
                answer: "",
                active: false, // Đặt trạng thái mặc định
            },
        ]);
    };
    
    // Function to check if the FAQ arrays are unchanged
    const areQuestionsUnchanged = (originalQuestions: any[], newQuestions: any[]) => {
        if (originalQuestions.length !== newQuestions.length) return false;
        return originalQuestions.every((q, index) =>
            q.question === newQuestions[index]?.question &&
            q.answer === newQuestions[index]?.answer
        );
    };
    
    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some((q) => q.question === "" || q.answer === "");
    };

    const handleEdit = async () => {
        if (!areQuestionsUnchanged(data.layout.faq, questions) &&
            !isAnyQuestionEmpty(questions)
        ) {
            await editLayout({
                type: "FAQ",
                faq: questions,
            }).unwrap()
                .then(() => {
                    toast.success("FAQ cập nhật thành công");
                    refetch(); // Cập nhật lại danh sách ngay sau khi thành công
                })
                .catch((err) => {
                    toast.error(err?.data?.message || "Có lỗi xảy ra");
                });
        }
    };


    console.log("data layout: ", data)


    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
                        <div className="mt-12" >
                            <dl className="space-y-8">
                                {questions.map((q: any) =>
                                    <div key={q._id} className={`${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6`}>
                                        <dt className="text-lg">
                                            <button
                                                className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                                                onClick={() => toggleQuestion(q._id)}
                                            >
                                                <input
                                                    className={`${style.input} border-none`}
                                                    value={q.question}
                                                    onChange={(e: any) =>
                                                        handleQuestionChange(q._id, e.target.value)
                                                    }
                                                    placeholder={"Thêm câu hỏi của bạn......"}
                                                />
                                                <span className="ml-6 flex-shrink-0">
                                                    {q.active ? (
                                                        <HiMinus className="h-6 w-6" />
                                                    ) : (
                                                        <HiPlus className="h-6 w-6" />
                                                    )}
                                                </span>
                                            </button>
                                        </dt>
                                        {q.active && (
                                            <dd className="mt-2 pr-12">
                                                <input
                                                    className={`${style.input} border-none`}
                                                    value={q.answer}
                                                    onChange={(e: any) =>
                                                        handleAnswerChange(q._id, e.target.value)
                                                    }
                                                    placeholder={"Thêm câu trả lời....."}
                                                />
                                                <span className="ml-6 flex-shrink-0">
                                                    <AiOutlineDelete
                                                        className="dark:text-white text-black text-[18px] cursor-pointer"
                                                        onClick={() => {
                                                            setQuestions((prevQuestions) =>
                                                                prevQuestions.filter((item) => item._id !== q._id)
                                                            )
                                                        }}
                                                    />
                                                </span>
                                            </dd>
                                        )}
                                    </div>
                                )}
                            </dl>
                            <br />
                            <br />
                            <IoAddCircleOutline
                                className="dark:text-white text-black text-[25px] cursor-pointer"
                                onClick={newFaqHandler}
                            />
                        </div>
                        <div
                            className={`${style.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
        ${areQuestionsUnchanged(data?.layout?.faq, questions) || isAnyQuestionEmpty(questions)
                                    ? "!cursor-not-allowed"
                                    : "!cursor-pointer !bg-[#42d383]"
                                }
        !rounded absolute bottom-12 right-12`}
                            onClick={
                                areQuestionsUnchanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions)
                                    ? () => null
                                    : handleEdit
                            }
                        >
                            Lưu
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default EditFaq;