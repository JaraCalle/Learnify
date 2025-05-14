"use client";

import React from "react";
import CourseCard from "@components/Courses/CourseCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCourses } from "@services/courseService";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Spinner } from "@components/ui/Spinner";

function Courses({ searchParams }) {
  const { search } = React.use(searchParams)  ;
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["courses", search],
    queryFn: ({ pageParam = 1 }) => getCourses({ page: pageParam, search }),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page");
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full items-center justify-start page-wrapper">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full items-center justify-start page-wrapper">
        <p>Error loading courses: {error.message}</p>
      </div>
    );
  }

  const courses = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="flex flex-col w-full items-center justify-start page-wrapper">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} />
      ))}

      {/* Loading indicator and intersection observer target */}
      <div ref={ref} className="w-full flex justify-center py-4">
        {isFetchingNextPage && <Spinner />}
      </div>

      {!hasNextPage && <p>No more courses to load</p>}
    </div>
  );
}

export default Courses;
