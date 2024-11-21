import { style } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import Link from "next/link";
import { format } from "timeago.js";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails = ({ data, stripePromise, clientSecret }: Props) => {
  const formatVNDPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const discountPercentage =
    ((data?.suggestedPrice - data.price) / data.suggestedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => data.courseId === data.courseId);
  const handleOrder = (e: any) => {
    setOpen(true);
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Rating rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Đánh giá
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Học viên
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Bạn sẽ học được gì sau khóa học này
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Bạn cần chuẩn bị những kiến thức gì trước khi tham gia khóa học
              này?
            </h1>
            {data.requirements?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Tổng quan khóa học
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            {/*Mô tả khoá học*/}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Chi tiết khóa học
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Rating rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {data?.ratings
                    ? Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)
                    : "0"}{" "}
                  Lượt đánh giá . {data?.reviews?.length ?? 0} Số lượng người đã
                  xem{" "}
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-12 h-12">
                        <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px] text-black dark:text-white">
                            {item.user?.name?.slice(0, 2) || "NA"}
                          </h1>
                        </div>
                      </div>

                      <div className="hidden lg:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user?.name || "Ẩn danh"}
                          </h5>
                          <Rating rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment || "Không có bình luận nào."}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {item.createdAt
                            ? format(item.createdAt)
                            : "Unknown Date"}{" "}
                          .
                        </small>
                      </div>

                      <div className="pl-2 flex lg:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user?.name || "Ẩn danh"}
                        </h5>
                        <Rating rating={item.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? "Miễn phí" : formatVNDPrice(data.price)}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {formatVNDPrice(data.suggestedPrice)}
                </h5>

                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  Giảm giá {discountPercentagePrice}%
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${style.button} w-[180px] my-3 font-Poppins cursor-pointer bg-[#DC143C]`}
                    href={`/course-access/${data._id}`}
                  >
                    Vào học
                  </Link>
                ) : (
                  <div
                    className={`${style.button} w-[25vh] my-3 font-Poppins cursor-pointer bg-[#DC143C]`}
                    onClick={handleOrder}
                  >
                    Mua ngay {formatVNDPrice(data.price)}
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                {" "}
                → Cung cấp đầy đủ Source Code
              </p>
              <p className="pb-1 text-black dark:text-white">
                → Không giới hạn thời gian
              </p>
              <p className="pb-1 text-black dark:text-white">
                → Thêm các công cụ trợ giúp việc học
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#0000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[470px] h-auto bg-white rounded-xl shadow-p3 flex flex-col items-center pt-6 px-4 relative">
              <div className="mb-4 cursor-pointer">
                <IoCloseOutline
                  size={28}
                  className="text-black cursor-pointer absolute top-4 right-4"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-96 pb-8">
                {stripePromise && clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, locale: "vi" }}
                  >
                    <CheckoutForm setOpen={setOpen} data={data} user={user} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
