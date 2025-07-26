import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order;
      // Open Razorpay Checkout
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount,
        currency: "INR",
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        callback_url: "http://localhost:3000/payment-success", // Your success URL
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
      };
      //Open the razorPay dialog
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(`Error : ${err}`);
    }
  };
  return (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connection requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 Months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("gold")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Golden Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connection requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 Months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("silver")}
          >
            Buy Silver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
