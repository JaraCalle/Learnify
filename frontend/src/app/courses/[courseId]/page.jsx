import React from "react";
import axios from "axios";
import CourseOverview from "@/components/Courses/CourseOverview";
import { getCourse } from "@/services/courseService";

async function CoursePage({ params }) {
  const { courseId } = await params;

  const course = await getCourse(courseId);

  return (
    <div className="flex flex-col w-full items-center justify-start page-wrapper">
      <CourseOverview course={course} />
    </div>
  );
}

export default CoursePage;
