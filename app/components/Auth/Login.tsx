"use client";
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { style } from '../../../app/styles/style';
import { useLoginMutation } from '@/redux/features/auth/authAPI';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string().email("Email không đúng định dạng!").required("Vui lòng nhập email của bạn!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, error }] = useLoginMutation();
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        },
    });

    // add event press key enter
    const handlePressKey = (event) => {
        if (event.key === "Enter") {
            formik.handleSubmit(event);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Đăng nhập thành công");
            setOpen(false);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full flex flex-col items-center bg-slate-600 p-6 rounded-lg shadow-lg'>
            <h1 className={`${style.title} text-2xl font-semibold mb-6 text-white`}>
                Đăng nhập vào CodeGuru
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
                <label className={`${style.label} text-white`} htmlFor="email">
                    Nhập email
                </label>
                <br />
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onKeyPress={handlePressKey}
                    id="email"
                    placeholder="example@gmail.com"
                    className={`w-full text-black  bg-white border 
                                rounded-md px-4 py-2 outline-none mt-2 transition-all 
                                duration-300 ease-in-out 
                                ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                <div className="w-full mt-4 relative mb-4">
                    <label className={`${style.label} text-white`} htmlFor="password">
                        Nhập mật khẩu
                    </label>
                    <br />
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onKeyPress={handlePressKey}
                        id="password"
                        placeholder="Mật khẩu của bạn"
                        className={`w-full text-black bg-white border 
                                    rounded-md px-4 py-2 outline-none mt-2 transition-all 
                                    duration-300 ease-in-out 
                                    ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}
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
                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                    )}
                </div>
                <div className="w-full mt-4">
                    <input
                        type="submit"
                        value="Đăng nhập"
                        className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer 
                            bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white 
                            transition duration-300 hover:bg-blue-600`}
                    />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-white dark:text-white">
                    Hoặc đăng nhập bằng
                </h5>
                <div className="flex items-center justify-center my-3 space-x-4">
                    <FcGoogle size={30} className="cursor-pointer"
                        onClick={() => signIn("google")}
                    />
                    <AiFillGithub size={30} className="cursor-pointer"
                        onClick={() => signIn("github")}
                    />
                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-white dark:text-white">
                    Bạn chưa có tài khoản?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Sign-Up")}
                    >
                        Đăng ký
                    </span>
                </h5>
            </form>
            <br />
        </div>
    );
}

export default Login;
