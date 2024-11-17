import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const ChangePassword: FC<Props> = (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
    const passwordChangeHandler = async (e: any) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu không khớp");
        } else {
            await updatePassword({ oldPassword, newPassword })
        }

    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("Đổi mật khẩu thành công");
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);


    return (
        <div className="w-full flex flex-col items-center px-5 py-10">
            <form
                onSubmit={passwordChangeHandler}
                className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6"
            >
                <div className="flex flex-col">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">
                        Nhập mật khẩu cũ
                    </label>
                    <input
                        type="password"
                        className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">
                        Nhập mật khẩu mới
                    </label>
                    <input
                        type="password"
                        className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 dark:text-gray-300 font-medium">
                        Nhập lại mật khẩu mới
                    </label>
                    <input
                        type="password"
                        className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
                >
                    Đổi mật khẩu
                </button>
            </form>
        </div>
    )
}

export default ChangePassword