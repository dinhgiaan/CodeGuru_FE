import { style } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    console.log("Fetched data:", data);
    if (data && data.layout?.banner) {
      setTitle(data?.layout?.banner.title || "");
      setSubTitle(data?.layout?.banner.subTitle || "");
      setImage(data?.layout?.banner?.image?.url || "");
    }
    if (isSuccess) {
      toast.success("Hero đã được cập nhật!");
    }
  }, [data]);

  const handleUpdate = (e: any) => {};
  const handleEdit = async () => {};
  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100:left-[18rem] 1500px:left-[21rem]"></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
          <div className="1000px:w-[60% flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left nt-[150px]">
            <textarea
              className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[60px]"
              placeholder="Cải thiện kỹ năng của bạn một cách nhanh chóng"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4}
            />
            <br />
            <textarea
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="chúng tôi có hơn 40k khóa học online và hơn 500k người đăng kí. Hãy tìm vấn đề của bạn."
              className="dark:text-[#edfff4] text-[#000000ac] font-josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%]"
            ></textarea>
            <br />
            <br />
            <br />
            <div
              className={`${
                style.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#ccccc34] 
            ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            }
            !rounded absolute bottom-12 right-12`}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Lưu
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditHero;
