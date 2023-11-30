import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ day, trainerEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const [transactionId, setTransactionId] = useState("");
  const [totalSalary, setTotalSalary] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  //   data formating
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const paymentDate = `${currentYear}-${currentMonth}${
    currentDay < 10 ? "0" : ""
  }-${currentDay}${currentMonth < 10 ? "0" : ""}`;

  useEffect(() => {
    const currentDate = new Date();
    const joinedDate = new Date(day);
    const daysWorked = Math.ceil(
      (currentDate - joinedDate) / (1000 * 60 * 60 * 24)
    );
    const dailySalary = 5;
    const calculatedSalary = daysWorked * dailySalary;
    setTotalSalary(calculatedSalary);
    if (totalSalary > 0) {
      axiosSecure
        .post("/create-payment-intent", { salary: totalSalary })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [day, axiosSecure, totalSalary]);

  console.log(clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
    } else {
      console.log("PaymentMethod", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const salaryInfo = {
          trainerEmail: trainerEmail,
          paymentDate: paymentDate,
          paymentAmount: totalSalary,
          transactionId: paymentIntent.id,
          payment: "paid",
        };
        axiosSecure.patch("allTrainers", salaryInfo).then((res) => {
          console.log("salary paid", res);
          toast.success("Successfully paid.");
          navigate('/dashboard/trainers');
        });
      }
    }
  };

  return (
    <div className="px-10">
      <div>
        <SectionTitle>Per Day Salary : $5</SectionTitle>
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {transactionId && (
        <p className="text-red-500">your transaction id is : {transactionId}</p>
      )}
    </div>
  );
};

export default CheckOutForm;
