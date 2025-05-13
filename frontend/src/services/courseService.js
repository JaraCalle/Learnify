import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/courses/";

export const fetchCourses = async ({ page = 1, search = "" }) => {
  const url = new URL(BASE_URL);

  // Add pagination
  url.searchParams.append("page", page);

  // Add search if provided
  if (search) {
    url.searchParams.append("search", search);
  }

  const response = await axios.get(url.toString());
  return response.data;
};
