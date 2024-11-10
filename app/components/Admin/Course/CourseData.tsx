import React, { FC } from "react"; // Import FC for function component
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { style } from '@/app/styles/style';
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const prevButton = () => {
    setActive(active - 1);
  }

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else {
      toast.error("Vui lòng nhập thông tin để tới bước tiếp theo!")
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={style.label} htmlFor="benefits">
          Học viên sẽ nhận được những lợi ích gì khi tham gia khóc học?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name={`Benefit-${index}`}
            placeholder="Học viên sẽ hiểu rõ và vận dụng được cách dể xây dựng được hệ thống quản lý!"
            required
            className={`my-2 input ${style.input}`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
          className="dark:text-white text-black"
        />
      </div>
      <br />
      <br />

      {/* Prequire */}
      <div>
        <label className={style.label} htmlFor="prerequisites">
          Những yêu cầu nào cần thiết để tham gia khóa học này?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name={`Qrerequisites-${index}`}
            placeholder="Nắm vững kiến thức cơ bản về React, Javascript, CSS!"
            required
            className={`my-2 input ${style.input}`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
          className="dark:text-white text-black"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Quay lại
        </div>
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Tiếp theo
        </div>
      </div>
    </div>
  );
};

export default CourseData;
