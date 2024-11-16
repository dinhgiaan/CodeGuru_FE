import { useGetCoursesDetailsQuery } from "@/redux/features/course/courseAPI";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Footer from "../Footer";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from "@/redux/features/order/orderAPI";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  console.log(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCoursesDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      // Đảm bảo số tiền là số nguyên và lớn hơn 12,000 VND
      const amount = Math.max(Math.round(data.course.price), 12000);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={
              data?.course?.name
                ? `${data.course.name} - CodeGuru`
                : "Đang tải..."
            }
            description="CodeGuru là trang web cung cấp các khóa học đa dạng"
            keywords={data?.course?.tags ?? []}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {data && data.course && <CourseDetails data={data.course} stripePromise={stripePromise} clientSecret={clientSecret} />}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
