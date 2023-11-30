import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckOutForm from "./CheckOutForm";
import { useLocation, useParams } from "react-router-dom";

const Payment = () => {
  const { day } = useParams();
  const location = useLocation()
  const trainerEmail = location.state.email;
  console.log(day, trainerEmail);

  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm day={day} trainerEmail={trainerEmail}></CheckOutForm>
    </Elements>
  );
};

export default Payment;
