import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcon from "../../../public/assets/avatar.png"
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';

type Props = {
    avatar: string | null;
    user: any;
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name);
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })
    const [loading, setLoading] = useState(false);


    const imageHandler = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                if (fileReader.readyState === 2) {
                    const result = fileReader.result;
                    setLoading(true);
                    await updateAvatar({ avatar: result });
                }
            };
            fileReader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cập nhật ảnh đại diện thành công!");
            setLoading(false);
            setLoadUser(true);
        }
        if (success) {
            toast.success("Cập nhật tên thành công!");
            setLoading(false);
            setLoadUser(true);
        }
        if (error || updateError) {
            toast.error(error?.data?.message || updateError?.data?.message || "Có lỗi xảy ra!");
        }
    }, [isSuccess, success, error, updateError]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (name !== "")
            await editProfile({
                name: name,
            });
    }

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="relative">
                    {loading
                        ?
                        (
                            <Loader />
                        )
                        :
                        (
                            <Image
                                src={user && user.avatar && typeof user.avatar.url === "string" ? user.avatar.url : avatarIcon}
                                alt="avatar"
                                width={120}
                                height={120}
                                className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
                                priority
                            />
                        )}
                    <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp/gif"
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            <AiOutlineCamera size={20} className="z-1 text-black dark:text-white" />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10">
                <form onSubmit={handleSubmit}>
                    <div className="800px:w-[50%] m-auto block pb-4">
                        <div className="w-[100%]">
                            <label className='${style.label} text-black dark:text-white'>Họ và tên</label>
                            <input
                                type="text"
                                className={`{w-full text-black dark:text-white bg-transparent border rounded-h-[40px] px-2 outline-none mt-[10px] font-Poppins} !w-[95%] mb-4 800px:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-[100%] pt-2">
                            <label className='${style.label} text-black dark:text-white'>Địa chỉ Email</label>
                            <input
                                type="text"
                                readOnly
                                className={`{w-full text-black dark:text-white bg-transparent border rounded-h-[40px] px-2 outline-none mt-[10px] font-Poppins} !w-[95%] mb-1 800px:mb-0`}
                                required
                                value={user?.email}
                            />
                        </div>
                        <input
                            className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                            required
                            value="Cập nhật"
                            type="submit"
                        />
                    </div>

                </form>
                <br />
            </div>
        </>
    )
}

export default ProfileInfo