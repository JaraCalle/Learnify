"use server";

import axios from "axios";
import { auth } from "@/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE + "/courses/";

export const getCourses = async ({ page = 1, search = "" }) => {
  try {
    if (!BASE_URL) {
      throw new Error("API base URL is not configured");
    }

    if (page < 1) {
      throw new Error("Page number must be greater than 0");
    }

    const endpointUrl = new URL(BASE_URL);
    endpointUrl.searchParams.append("page", page);

    if (search) {
      endpointUrl.searchParams.append("search", search);
    }

    const response = await axios.get(endpointUrl.toString());

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(
          `Server error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    }
    throw error;
  }
};

export const getOwnedCourses = async () => {
  try {
    if (!BASE_URL) {
      throw new Error("API base URL is not configured");
    }

    const session = await auth();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No authentication token available");
    }

    const endpointUrl = new URL(BASE_URL + "owned/");

    const response = await axios.get(endpointUrl.toString(), {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Server error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    }
    throw error;
  }
};

export const getCourse = async (courseId) => {
  console.log("courseId", courseId);
  try {
    if (!BASE_URL) {
      throw new Error("API base URL is not configured");
    }

    if (!courseId) {
      throw new Error("Course ID is required");
    }

    const endpointUrl = new URL(BASE_URL + `${courseId}/`);
    const response = await axios.get(endpointUrl.toString());

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error("Course not found");
        }
        throw new Error(
          `Server error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        throw new Error("No response received from server");
      }
    }
    throw error;
  }
};
export const createCourse = async (courseData) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("No authentication token available");
  }

  const endpointUrl = new URL(BASE_URL);

  const response = await axios.post(endpointUrl.toString(), courseData, {
    headers: {
      Authorization: `Token ${accessToken}`,
    },
  });

  if (!response.data) {
    throw new Error("No data received from the server");
  }


  return response.data;

};
