import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/order/orderAPI';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  setOpen: any,
  data: any
}

const CheckoutForm = ({ setOpen, data }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { } = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    };
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error])

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <LinkAuthenticationElement id="link-authentication-element" className="w-full mb-4" />
      <PaymentElement id="payment-element" className="w-full mb-4" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="btn btn-primary w-full mt-10 pb-3"
      >
        <span id="button-text" className='w-full py-3 px-8 bg-blue-500 rounded-full text-gray-100 hover:bg-blue-700'>
          {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh toán ngay"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>


  )
}

export default CheckoutForm