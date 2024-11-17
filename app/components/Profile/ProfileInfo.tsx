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
            <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                    <div className="relative">
                        {loading ? (
                            <Loader />
                        ) : (
                            <Image
                                src={user && user.avatar && typeof user.avatar.url === "string" ? user.avatar.url : avatarIcon}
                                alt="avatar"
                                width={120}
                                height={120}
                                className="w-[120px] h-[120px] border-4 border-teal-500 rounded-full object-cover"
                                priority
                            />
                        )}
                        <input
                            type="file"
                            id="avatar"
                            className="hidden"
                            onChange={imageHandler}
                            accept="image/png,image/jpg,image/jpeg,image/webp,gif"
                        />
                        <label htmlFor="avatar">
                            <div className="absolute bottom-2 right-2 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center cursor-pointer">
                                <AiOutlineCamera size={20} className="text-white" />
                            </div>
                        </label>
                    </div>
                    <h3 className="text-lg font-semibold mt-4 text-gray-700 dark:text-gray-200">{user?.email}</h3>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Họ và tên</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Địa chỉ Email</label>
                        <input
                            type="text"
                            readOnly
                            className="mt-1 block w-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
                            value={user?.email}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition"
                    >
                        Cập nhật
                    </button>
                </form>
            </div>
        </>
    )
}

export default ProfileInfo