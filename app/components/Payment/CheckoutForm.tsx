"use client";
import React, { useEffect, useState } from "react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
import { useCreateOrderMutation } from "@/redux/features/order/orderAPI";

// Kết nối Socket.IO
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
let socket: any;

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

type Notification = {
  title: string;
  message: string;
  userId: string;
};

const CheckoutForm = ({ setOpen, data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Quản lý kết nối socket
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setMessage(stripeError.message || "Thanh toán thất bại.");
      toast.error(stripeError.message || "Thanh toán thất bại.");
      setIsLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      // Tạo đơn hàng mới
      createOrder({ courseId: data._id, payment_info: paymentIntent });
      setIsLoading(false);
    } else {
      setMessage("Thanh toán không thành công. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  // Xử lý khi đơn hàng được tạo hoặc xảy ra lỗi
  useEffect(() => {
    if (orderData) {
      // Gửi thông báo qua Socket.IO
      socket.emit("notification", {
        title: "Đơn hàng mới",
        message: `Bạn có đơn đặt hàng mới từ khóa học ${data.name}`,
        userId: user?._id,
      });
      toast.success("Đơn hàng đã được tạo thành công!");
      router.push(`/course-access/${data._id}`);
    }

    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage?.data?.message || "Đã xảy ra lỗi.");
    }
  }, [orderData, error]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center"
    >
      <LinkAuthenticationElement
        id="link-authentication-element"
        className="w-full mb-4"
      />
      <PaymentElement id="payment-element" className="w-full mb-4" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`btn btn-primary w-full mt-10 pb-3 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span
          id="button-text"
          className="w-full py-3 px-8 bg-blue-500 rounded-full text-gray-100 hover:bg-blue-700"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang thanh toán...
            </span>
          ) : (
            "Thanh toán ngay"
          )}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          className="text-red-500 text-sm mt-4 text-center"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
