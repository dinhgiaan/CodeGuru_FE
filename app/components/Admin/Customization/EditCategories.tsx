import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

type Category = {
  _id: string;
  title: string;
};

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [edit, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories); // Lấy danh mục từ backend
    }

    if (layoutSuccess) {
      toast.success("Cập nhật danh mục thành công");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  // Thêm danh mục mới
  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Danh mục không thể bị bỏ trống");
    } else {
      setCategories((prevCategory) => [
        ...prevCategory,
        { _id: Date.now().toString(), title: "" }, // Tạo danh mục mới, sử dụng ID tạm thời
      ]);
    }
  };

  // Cập nhật danh mục
  const EditCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      try {
        // Gọi API cập nhật layout
        await edit({
          type: "Categories",
          categories: categories,
        }).unwrap();
        toast.success("Danh mục đã được cập nhật thành công");
      } catch (error) {
        toast.error("Không thể cập nhật danh mục");
      }
    } else {
      toast.error("Không có thay đổi hoặc danh mục trống");
    }
  };

  // Kiểm tra xem danh mục có thay đổi so với dữ liệu ban đầu hay không
  const areCategoriesUnchanged = (
    originalCategories: Category[],
    newCategories: Category[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  // Kiểm tra xem có danh mục trống nào không
  const isAnyCategoryTitleEmpty = (categories: Category[]) => {
    return categories.some((q) => q.title === "");
  };

  // Cập nhật tên danh mục
  const handleCategoriesAdd = (id: string, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  // Xóa danh mục
  const handleCategoryDelete = (id: string) => {
    setCategories((prevCategory) => prevCategory.filter((i) => i._id !== id));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${style.title}`}>Tất cả danh mục</h1>
          {categories.map((item) => (
            <div className="p-3" key={item._id}>
              <div className="flex items-center w-full justify-center">
                <input
                  className={`${style.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) =>
                    handleCategoriesAdd(item._id, e.target.value)
                  }
                  placeholder="Hãy nhập tên danh mục..."
                />
                <AiOutlineDelete
                  className="dark:text-white text-black text-[18px] cursor-pointer"
                  onClick={() => handleCategoryDelete(item._id)} // Xử lý xóa danh mục
                />
              </div>
            </div>
          ))}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler} // Thêm danh mục mới
            />
          </div>
          <div
            className={`${
              style.button
            } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            } !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : EditCategoriesHandler
            } // Lưu các thay đổi
          >
            Lưu
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
