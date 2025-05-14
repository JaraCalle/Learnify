"use server";

import { auth } from "@/auth";
import axios from "axios";

export async function getCart() {
  try {
    const session = await auth();
    const accessToken = session?.accessToken;
    const endpointUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE + "/cart/";
    const response = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error);
    console.log("Response", error.response.data);
    return null;
  }
}

export async function addToCart(courseId) {
  try {
    const session = await auth();
    const accessToken = session?.accessToken;
    const endpointUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE + "/cart/add/";
    const response = await axios.post(endpointUrl, 
        {course_id: courseId,},

      {headers: {
        Authorization: `Token ${accessToken}`,
      }},
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
    console.log("Response", error.response.data);
    return null;
  }
}

export async function clearCart() {
    try {
    const session = await auth();
    const accessToken = session?.accessToken;
    const endpointUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE + "/cart/clear/";
    const response = await axios.delete(endpointUrl,{
                headers: {
              Authorization: `Token ${accessToken}`,
            },
          }
        );
    return response.data;
  } catch (error) {
    console.error("Error clearing cart", error);
    console.log("Response", error.response.data);
    return null;
  }
}

export async function removeFromCart(courseId) {
    try {
        const session = await auth();
        const accessToken = session?.accessToken;
        const endpointUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE +`/cart/remove/${courseId}/`;
        const response = await axios.delete(endpointUrl,
            {headers: {
                Authorization: `Token ${accessToken}`,
            }},
        );
        return response.data;
} catch (error) {
    console.error("Error removing from cart", error);
    console.log("Response", error.response.data);
    return null;
}
}

