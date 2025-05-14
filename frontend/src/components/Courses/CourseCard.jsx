"use client";
import { useState, useEffect } from "react";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Image from "next/image";
import { Button } from "@components/ui/Button";
import BackgroundBlur from "@components/BackgroundBlur";
import Link from "next/link";
import CourseDetails from "@components/Courses/CourseDetails";
import { cn } from "@/lib/utils/cn";
import { getOwnedCourses } from "@/services/courseService";
import { useQuery } from "@tanstack/react-query";

function CourseCard({ course, className = "", description = true }) {

  const [isOwned, setIsOwned] = useState(false);

  const { data: ownedCourses } = useQuery({
    queryKey: ["ownedCourses"],
    queryFn: getOwnedCourses,
  });

  useEffect(() => {
    setIsOwned(ownedCourses?.some((item) => item.id === course.id));
  }, [ownedCourses]);

  const ratingRangeClass =
    course?.rating_avg > 4
      ? "from-rating-high-start to-rating-high-end"
      : course?.rating_avg > 3
      ? "from-rating-mid-start to-rating-mid-end"
      : "from-rating-low-start to-rating-low-end";



  return (
    <Link
      className="w-full max-w-7xl content-center"
      href={`/courses/${course.id}`}
    >
      <Card className={cn("flex-row justify-start gap-0 dark:bg-transparent p-0 overflow-clip border-2 bg-white h-72 relative", className)}>
        {/* Existing Card Content */}
        <div className="relative w-full min-h-52">
          <Image
            alt="Grid"
            src={
              course.thumbnail_url ||
              "https://support.heberjahiz.com/hc/article_attachments/21013076295570"
            }
            quality={100}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-full flex flex-col justify-between p-6">
          <CardHeader className={"flex flex-col items-start p-0"}>
            <CardTitle className={"text-xl"}>
              <h1>{course.title}</h1>
            </CardTitle>
            {description && (
              <CardDescription className={"text-lg "}>
                
              <p className="overflow-hidden text-ellipsis">
                {course.description}
                </p>
              </CardDescription>
            )}
          </CardHeader>
          <CardFooter
            className={
              "flex flex-col justify-between p-0 lg:flex-row lg:items-end"
            }
          >
            <CourseDetails course={course} />
            
            <div className="flex gap-4">
              {!isOwned && (
                <Button size={"xl"}>{course.price} USD</Button>
              )}
              <BackgroundBlur
                color={`bg-linear-to-b  ${ratingRangeClass}`}
                size="lg"
              >
                <Button
                  className={`bg-linear-to-b  ${ratingRangeClass} text-xl`}
                  size={"xl"}
                >
                  {course.rating_avg || 0}
                </Button>
              </BackgroundBlur>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

export default CourseCard;
