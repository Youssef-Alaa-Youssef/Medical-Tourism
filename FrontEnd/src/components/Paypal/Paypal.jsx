import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Paypal({ start, end, user, treatment, tourism }) {
  const [isPaid, setIsPaid] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [paymentValue, setPaymentValue] = useState(null);
  const [payment, setPayment] = useState([]);
  const [paymentTourism, setPaymentTourism] = useState([]);

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      axios
        .post("http://127.0.0.1:8000/payment_done", {
          treatment_center: treatment,
          user_id: user,
          payed: paymentValue,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error", error.response.data);
        });
      if (tourism) {
        axios
          .post("http://localhost:8000/tourism_payment_list", {
            tourism_company: tourism,
            user_id: user,
            payed: paymentValue,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log("error", error.response.data);
          });
      }
      setIsPaid(true);
      toast.success("Payment was successful.");
    });
  };
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/get_payment", {
        treatment_center: treatment,
        user_id: user,
      })
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/tourism_get_payment", {
        tourism_company: tourism,
        user_id: user,
      })
      .then((response) => {
        setPaymentTourism(response.data);
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  }, []);

  function calculateDays(start_date, end_date) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const timeDifference = endDate - startDate;

    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const numDays = Math.floor(timeDifference / oneDay) + 1;

    return numDays;
  }
  const val = calculateDays(start, end);

  return (
    <>
      {payment.isPaid == "True" ||
      paymentTourism.isPaidTourism == "True" ||
      isPaid ? (
        <p>Thank you for your payment!</p>
      ) : (
        <PayPalScriptProvider
          options={{
            "client-id":
              "Ab0crf7t0zlwgLRmSkuPEyv0cxNBxPcLZV7JyrGm8LwkMNLy0qyE_HPFkF2lF-qWuzsNVNU6XB8QvOas",
            currency: "USD",
          }}
        >
          <div>
            <PayPalButtons
              createOrder={(data, actions) => {
                const value = val * 100 ? val * 100 : "1.00";
                setPaymentValue(value);
                // Set up the transaction details
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: value,
                      },
                    },
                  ],
                });
              }}
              onApprove={handleApprove}
            />
            {/* {isPaid &&
          // <div className="alert alert-danger">Payment was successful!</div>
          toast.success("Payment was successful.")} */}
          </div>
        </PayPalScriptProvider>
      )}
    </>
  );
}

export default Paypal;