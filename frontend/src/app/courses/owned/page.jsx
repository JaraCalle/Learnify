import { getOwnedCourses } from "@services/courseService";
import CourseCard from "@components/Courses/CourseCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OwnedCoursesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  let courses = [];
  try {
    courses = await getOwnedCourses();
  } catch (error) {
    console.error("Error fetching owned courses:", error);
    // You might want to show an error message to the user
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>
        <div className="text-center py-8">
          <p className="text-red-600">
            There was an error loading your courses. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      {courses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            You haven't purchased any courses yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard owned description={false} key={course.id} course={course} className={"flex-col h-fit"} />
          ))}
        </div>
      )}
    </div>
  );
}
