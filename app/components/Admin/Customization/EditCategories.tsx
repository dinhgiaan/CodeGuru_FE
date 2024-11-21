import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Category = {
  _id: string;
  title: string;
};

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
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

  const newCategoriesHandler = () => {
    setCategories((prevCategory) => [
      ...prevCategory,
      { _id: Date.now().toString(), title: "" },
    ]);
  };

  const handleCategoryChange = (id: string, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((cat) =>
        cat._id === id ? { ...cat, title: value } : cat
      )
    );
  };

  const handleCategoryDelete = (id: string) => {
    setCategories((prevCategory) => prevCategory.filter((cat) => cat._id !== id));
  };

  const areCategoriesUnchanged = (
    originalCategories: Category[],
    newCategories: Category[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: Category[]) => {
    return categories.some((cat) => cat.title === "");
  };

  const handleEdit = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories: categories,
      })
        .unwrap()
        .then(() => {
          toast.success("Cập nhật danh mục thành công");
          refetch(); // Cập nhật lại danh sách ngay sau khi thành công
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Có lỗi xảy ra");
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-4xl mx-auto mt-12 ml-[600px] p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Chỉnh Sửa Danh Mục
          </h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 min-w-[80px]">
                    <span className="text-[#b064c9] font-semibold">Danh mục:</span>
                  </label>
                  <input
                    className={`flex-grow ${style.input} border-none bg-transparent text-lg mb-3`}
                    value={category.title}
                    onChange={(e: any) =>
                      handleCategoryChange(category._id, e.target.value)
                    }
                    placeholder="Nhập tên danh mục"
                  />
                  <button
                    onClick={() => handleCategoryDelete(category._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiOutlineDelete className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <IoAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer hover:text-green-500"
              onClick={newCategoriesHandler}
            />

            <div
              className={`${style.button
                } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black 
                ${areCategoriesUnchanged(data?.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories)
                  ? "!cursor-not-allowed bg-gray-300"
                  : "!cursor-pointer !bg-green-500 hover:bg-green-600"
                }
                !rounded transition-all duration-300`}
              onClick={handleEdit}
            >
              Lưu
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
