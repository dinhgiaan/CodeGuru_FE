import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { style } from '@/app/styles/style';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import toast from 'react-hot-toast';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit
}) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleCollapseToggle = (index: number) => {
        const updateCollapsed = [...isCollapsed];
        updateCollapsed[index] = !updateCollapsed[index];
        setIsCollapsed(updateCollapsed);
    }

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    }

    const newContentHandler = (item: any) => {
        if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            toast.error("Vui lòng nhập hết thông tin!");
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

                // 
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    //add new section
    const addNewSection = () => {
        const lastSection = courseContentData[courseContentData.length - 1];

        if (
            lastSection.title === "" ||
            lastSection.description === "" ||
            lastSection.videoUrl === "" ||
            lastSection.links[0].title === "" ||
            lastSection.links[0].url === ""
        ) {
            toast.error("Vui lòng nhập hết thông tin phần trước!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Phần chưa đặt tên ${activeSection + 1}`,
                links: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Vui lòng nhập hết thông tin!");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };

    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <>
                            <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                {showSectionInput && (
                                    <>
                                        <div className='flex w-full items-center'>
                                            <input
                                                type='text'
                                                className={`text-[20px] ${item.videoSection === "Phần chưa đặt tên"
                                                    ? "w-[250px]"
                                                    : "w-min"
                                                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                value={item.videoSection}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoSection = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                            <BsPencil className='cursor-pointer dark:text-white text-black ml-10' />
                                        </div>
                                    </>
                                )}
                                <div className='flex w-full items-center justify-between my-0'>
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className='font-Poppins dark:text-white text-black'>
                                                    {index + 1}.{item.title}
                                                </p>
                                            )
                                                :
                                                (
                                                    <>

                                                    </>
                                                )}
                                        </>
                                    )
                                        :
                                        (
                                            <div>

                                            </div>
                                        )}
                                    {/* arrow button for collapsed video content */}
                                    <div className='flex items-center'>
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black 
                                                ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updateData = [...courseContentData];
                                                    updateData.splice(index, 1);
                                                    setCourseContentData(updateData);
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className='dark:text-white text-black'
                                            style={{
                                                transform: isCollapsed[index]
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                            }}
                                            onClick={() => { handleCollapseToggle(index) }}
                                        />
                                    </div>
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className='my-3'>
                                            <label className={style.label}>Tiêu đề video</label>
                                            <input
                                                type='text'
                                                placeholder='Cách sử dụng Docker'
                                                className={style.input}
                                                value={item.title}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].title = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                        <div className='my-3'>
                                            <label className={style.label}>URL Video</label>
                                            <input
                                                type='text'
                                                placeholder='https://cmccloud.vn/'
                                                className={style.input}
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].videoUrl = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                        </div>
                                        <div className='my-3'>
                                            <label className={style.label}>Mô tả</label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                placeholder='Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows...'
                                                className={`${style.input} !h-min py-2`}
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData];
                                                    updateData[index].description = e.target.value;
                                                    setCourseContentData(updateData);
                                                }}
                                            />
                                            <br />
                                        </div>
                                        {item?.links.map((link: any, linkIndex: number) => {
                                            return (
                                                <>
                                                    <div className='mb-3 block'>
                                                        <div className='w-full flex items-center justify-between'>
                                                            <label className={style.label}>
                                                                Link {linkIndex + 1}
                                                            </label>
                                                            <AiOutlineDelete
                                                                className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-black dark:text-white text-[20px]`}
                                                                onClick={() => linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)}
                                                            />
                                                        </div>
                                                        <input
                                                            type='text'
                                                            placeholder='Tiêu đề của Source Code'
                                                            className={`${style.input}`}
                                                            value={link.title}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData];
                                                                updateData[index].links[linkIndex].title = e.target.value;
                                                                setCourseContentData(updateData);
                                                            }}
                                                        />
                                                        <input
                                                            type='url'
                                                            placeholder='Source code (URL)'
                                                            className={`${style.input} mt-6`}
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData];
                                                                updateData[index].links[linkIndex].url = e.target.value;
                                                                setCourseContentData(updateData);
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        })}
                                        <br />
                                        <div className='inline-block mb-4'>
                                            <p
                                                className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                                onClick={() => handleAddLink(index)}
                                            >
                                                <BsLink45Deg className='mr-2' /> Thêm đường dẫn
                                            </p>
                                        </div>
                                    </>
                                )}
                                <br />
                                {index === courseContentData.length - 1 && (
                                    <div>
                                        <p
                                            className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                            onClick={(e: any) => newContentHandler(item)}
                                        >
                                            <AiOutlinePlusCircle className='mr-2' /> Thêm nội dung mới
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    );
                })};
                <br />
                <div className='flex items-center text-[20px] dark:text-white text-black cursor-pointer' onClick={() => addNewSection()}>
                    <AiOutlinePlusCircle className='mr-2' /> Thêm phần mới
                </div>
            </form>
            <br />
            <div className='w-full flex items-center justify-between'>
                <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] round mt-8 cursor-pointer' onClick={() => prevButton()}>
                    Quay lại
                </div>
                <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] round mt-8 cursor-pointer' onClick={() => handleOptions()}>
                    Tiếp theo
                </div>
            </div>
        </div>
    )
}

export default CourseContent