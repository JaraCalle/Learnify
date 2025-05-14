import axios from "axios";
import { makeUrl } from "@/utils/url";

export const createPaymentIntent = async (amount, accessToken) => {
  try {
    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    const response = await axios.post(
      makeUrl(
        process.env.NEXT_PUBLIC_BACKEND_API_BASE,
        "payments",
        "create-intent"
      ),
      {
        amount: amountInCents,
        currency: "usd",
      },
      {
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.clientSecret) {
      throw new Error("No client secret received from server");
    }

    return response.data;
  } catch (error) {
    console.error(
      "Payment intent creation error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create payment intent"
    );
  }
};

export const confirmPayment = async (
  paymentIntentId,
  paymentMethodId,
  accessToken
) => {
  try {
    const response = await axios.post(
      makeUrl(process.env.NEXT_PUBLIC_BACKEND_API_BASE, "payments", "confirm"),
      {
        paymentIntentId,
        paymentMethodId,
      },
      {
        headers: {
          Authorization: `Token ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Payment confirmation error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to confirm payment"
    );
  }
};
