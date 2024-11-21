import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (layoutSuccess) {
      toast.success("FAQ cập nhật thành công");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };
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
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    if (originalQuestions.length !== newQuestions.length) return false;
    return originalQuestions.every(
      (q, index) =>
        q.question === newQuestions[index]?.question &&
        q.answer === newQuestions[index]?.answer
    );
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      })
        .unwrap()
        .then(() => {
          toast.success("FAQ cập nhật thành công");
          refetch(); // Cập nhật lại danh sách ngay sau khi thành công
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Có lỗi xảy ra");
        });
    }
  };

  console.log("data layout: ", data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Chỉnh Sửa Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-4">
            {questions.map((q: any) => (
              <div
                key={q._id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 min-w-[80px]">
                    <span className="text-[#b064c9] font-semibold">
                      {" "}
                      Câu hỏi:{" "}
                    </span>
                  </label>
                  <input
                    className={`flex-grow ${style.input} border-none bg-transparent text-lg mb-3`}
                    value={q.question}
                    onChange={(e: any) =>
                      handleQuestionChange(q._id, e.target.value)
                    }
                    placeholder="Nhập câu hỏi của bạn"
                  />
                  <button
                    onClick={() => toggleQuestion(q._id)}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    {q.active ? (
                      <FaArrowAltCircleRight className="h-6 w-6" />
                    ) : (
                      <FaArrowCircleDown className="h-6 w-6" />
                    )}
                  </button>
                </div>

                {q.active && (
                  <div className="mt-3 flex items-center space-x-3">
                    <label className="font-semibold text-gray-700 dark:text-gray-300 min-w-[80px]">
                      <span className="text-[#b55c68] font-semibold">
                        {" "}
                        Câu trả lời:{" "}
                      </span>
                    </label>
                    <input
                      className={`flex-grow ${style.input} border-none bg-transparent mb-3`}
                      value={q.answer}
                      onChange={(e: any) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                      placeholder="Nhập câu trả lời"
                    />
                    <button
                      onClick={() => {
                        setQuestions((prevQuestions) =>
                          prevQuestions.filter((item) => item._id !== q._id)
                        );
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete className="text-[18px]" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <IoAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer hover:text-green-500"
              onClick={newFaqHandler}
            />

            <div
              className={`${
                style.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black 
                                ${
                                  areQuestionsUnchanged(
                                    data?.layout?.faq,
                                    questions
                                  ) || isAnyQuestionEmpty(questions)
                                    ? "!cursor-not-allowed bg-gray-300"
                                    : "!cursor-pointer !bg-green-500 hover:bg-green-600"
                                }
                                !rounded transition-all duration-300`}
              onClick={
                areQuestionsUnchanged(data.layout.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? () => null
                  : handleEdit
              }
            >
              Lưu
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
