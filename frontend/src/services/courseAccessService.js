import axios from "axios";
import { makeUrl } from "@/utils/url";
import { auth } from "@/lib/auth";

export const checkCourseAccess = async (courseId) => {

  const session = await auth();
  const accessToken = session?.user?.accessToken;

  try {
    const response = await axios.get(
      makeUrl(
        process.env.NEXT_PUBLIC_BACKEND_API_BASE,
        "courses",
        courseId,
        "access"
      ),
      {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      }
    );
    return response.data.hasAccess;
  } catch (error) {
    console.error("Error checking course access:", error);
    return false;
  }
};

export const getUserCourses = async (accessToken) => {
  try {
    const response = await axios.get(
      makeUrl(
        process.env.NEXT_PUBLIC_BACKEND_API_BASE,
        "courses",
        "my-courses"
      ),
      {
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return [];
  }
};


const nombre = "Juan";

//axios.get({https:localhost:8000/courses/}, { 'user': nombre }, { 'Authorization': 'Token ${session.user.accessToken}' }, )



//TIPOS DE PETICIONES
//GET | POST | PUT | DELETE | PATCH

//PARAMETROS DE LA PETICION
//URL | BODY | HEADERS | QUERY PARAMS




