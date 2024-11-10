"use client";
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { style } from '../../../app/styles/style';
import { useRegisterMutation } from '@/redux/features/auth/authAPI';
import { toast } from 'react-hot-toast';

type Props = {
    setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required("Nhập tên của bạn!"),
    email: Yup.string()
        .email("Invalid email")
        .required("Please enter your email"),
    password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
    const [register, { data, error, isSuccess }] = useRegisterMutation();
    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Đăng ký thành công";
            toast.success(message);
            setRoute("Verification");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = {
                name, email, password
            };
            await register(data);
        }
    });
    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full mb-6 p-5 bg-slate-600 shadow-md rounded-lg">
            <h1 className={`${style.title} text-2xl font-bold text-center mb-6 text-white`}>
                Đăng ký vào CodeGuru
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`text-[16px] font-Poppins text-white dark:text-white`} htmlFor="name">
                        Nhập tên của bạn
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        id="name"
                        placeholder="Tên của bạn"
                        className={`w-full text-black  bg-gray-100 border 
                                    rounded-md px-4 py-2 mt-1 outline-none transition duration-300
                                    ${errors.name && touched.name && "border-red-500"}`}
                    />
                    {errors.name && touched.name && (
                        <span className="text-red-500 text-sm">{errors.name}</span>
                    )}
                </div>

                <div>
                    <label className={`text-[16px] font-Poppins text-white dark:text-white`} htmlFor="email">
                        Nhập email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="example@gmail.com"
                        className={`w-full text-black bg-gray-100 border 
                                    rounded-md px-4 py-2 mt-1 outline-none transition duration-300
                                    ${errors.email && touched.email && "border-red-500"}`}
                    />
                    {errors.email && touched.email && (
                        <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                </div>

                <div className="relative">
                    <label className={`text-[16px] font-Poppins text-white dark:text-white`} htmlFor="password">
                        Nhập mật khẩu
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="Mật khẩu"
                        className={`w-full text-black bg-gray-100 border 
                                    rounded-md px-4 py-2 mt-1 outline-none transition duration-300
                                    ${errors.password && touched.password && "border-red-500"}`}
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                </div>
                {errors.password && touched.password && (
                    <span className="text-red-500 text-sm">{errors.password}</span>
                )}

                <div>
                    <input
                        type="submit"
                        value="Đăng ký"
                        className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer 
                                    bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white 
                                    transition duration-300 hover:bg-blue-600`}
                    />
                </div>

                <h5 className="text-center pt-4 font-Poppins text-[14px] text-white dark:text-white">
                    Hoặc đăng nhập bằng
                </h5>
                <div className="flex items-center justify-center my-3 space-x-4">
                    <FcGoogle size={30} className="cursor-pointer" />
                    <AiFillGithub size={30} className="cursor-pointer" />
                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px]  text-white dark:text-white">
                    Bạn đã có tài khoản?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >
                        Đăng nhập
                    </span>
                </h5>
            </form>
        </div>
    );
}

export default SignUp;
