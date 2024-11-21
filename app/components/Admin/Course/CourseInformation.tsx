import React, { useState, FC, useEffect } from "react";
import { style } from "@/app/styles/style";
import Image from "next/image";
import toast from "react-hot-toast";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {}); // Lấy dữ liệu categories
  const [categories, setCategories] = useState<any[]>([]); // Lưu danh sách categories

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories); // Cập nhật categories từ dữ liệu API
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseInfo.thumbnail) {
      toast.error("Tải lên hình ảnh để tới bước tiếp theo.");
      return;
    }

    setActive(active + 1); // Chuyển sang bước tiếp theo
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventdefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventdefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventdefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 mb-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={style.label}>
            Tên khóa học
          </label>
          <input
            type="text"
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="React Pro Max với Next.js - Làm Chủ Toàn Diện React.JS Hiện Đại"
            className={style.input}
          />
        </div>

        <div>
          <label htmlFor="description" className={style.label}>
            Mô tả khóa học
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            placeholder="Khóa học này sẽ giúp bạn hiểu sâu hơn về React, bao gồm quản lý state với Redux, sử dụng React Hooks, tối ưu hóa hiệu năng và triển khai ứng dụng thực tế."
            rows={5}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={`${style.input} h-36 resize-none pt-4`}
          />
        </div>

        <div className="flex justify-between">
          <div className="w-[48%]">
            <label className={style.label}>Giá khóa học</label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="1.499.000"
              className={style.input}
            />
          </div>

          <div className="w-[48%]">
            <label className={style.label}>Giá gốc khóa học</label>
            <input
              type="number"
              value={courseInfo.suggestedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, suggestedPrice: e.target.value })
              }
              id="suggestedPrice"
              placeholder="2.499.000"
              className={style.input}
            />
          </div>
        </div>
        <br />
        <div className="w-[48%]">
          <label className={`style.label w-[48%] dark:text-white text-black`}>
            Danh mục khóa học
          </label>
          <select
            name="categories"
            id="categories"
            className={`${style.input} text-black dark:text-white py-3 px-1`}
            value={courseInfo.categories || ""}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, categories: e.target.value })}
          >
            <option value="" className="text-black">Lựa chọn danh mục</option>
            {categories.map((item) => (
              <option value={item._id} key={item._id} className="text-black">
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={style.label} htmlFor="tags">
            Tags
          </label>
          <input
            type="text"
            required
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, Next 13, Tailwind CSS, LMS, Redux"
            className={style.input}
          />
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${style.label}`}>Trình độ khóa học</label>
            <input
              type="text"
              value={courseInfo.level}
              required
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, level: e.target.value });
              }}
              id="level"
              placeholder="Fresher/ Junior/ Middle/ Senior"
              className={`${style.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={style.label}>URL Demo</label>
            <input
              type="text"
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="8391ad94ab9a19478c7d1f5fbff76999"
              className={style.input}
            />
          </div>
        </div>

        {/* Thêm phần upload hình ảnh ở đây */}
        <div className="w-full mt-6">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center 
              ${dragging ? "bg-blue-500" : "bg-transparent"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt="Đang tải ảnh lên..."
                width={600}
                height={500}
                className="object-contain"
              />
            ) : (
              <span className="text-black dark:text-white">
                Thả ảnh vào đây hoặc chọn file
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Tiếp theo"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer border-none"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
