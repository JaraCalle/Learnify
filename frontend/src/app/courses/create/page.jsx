"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { createCourse } from "@/services/courseService";  

function CreateCoursePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [previewThumbnail, setPreviewThumbnail] = useState(null);

  const initialFormState = {
    title: "",
    description: "",
    category: "",
    difficulty: "",
    estimated_duration: "",
    price: "",
    status: "draft",
    thumbnail: null,
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update form state with the file
    setFormState((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = await createCourse(formState);
      setFormState(initialFormState);
      setPreviewThumbnail(null);
      router.push(`/courses/${courseData.id}`);
      toast.success("Course created successfully");
      toast.error("Course creation failed");
      
    } catch (error) {
      console.error(error);
    }
  };

  // Modularized onChange handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Modularized onValueChange handler for Select
  const handleSelectChange = (id) => (value) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-5 gap-6 px-0 page-wrapper w-full"
    >
      <div className="col-start-2 col-span-2 h-full">
        <Label htmlFor="thumbnail-upload" className="cursor-pointer block h-full">
          <Card className="h-full overflow-clip p-4 border-2 justify-center dark:bg-transparent relative">
            {previewThumbnail ? (
              <div className="relative size-full">
                <Image
                  src={previewThumbnail}
                  alt="Course thumbnail preview"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                <UploadCloud className=" text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload course thumbnail
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
            <Input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </Card>
        </Label>
      </div>

      <div className="flex flex-col justify-start p-4 gap-6 ">
        <Label className="text-2xl w-full" htmlFor="title">
          Course Title
        </Label>
        <Input
          id="title"
          type="text"
          className={" dark:bg-zinc-950 rounded-sm font-thin"}
          placeholder="Enter course title"
          value={formState.title}
          onChange={handleInputChange}
        />
        <Label
          className="w-full font-thin text-md flex flex-col items-start gap-2"
          htmlFor="difficulty"
        >
          Course Difficulty
          <Select
            className="overflow-clip w-full dark:bg-zinc-950 rounded-sm"
            onValueChange={handleSelectChange("difficulty")}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        {/* Course duration */}
        <Label
          className="w-full font-thin text-md flex flex-col items-start gap-2"
          htmlFor="duration"
        >
          Estimated Duration ( In Hours )
          <Input
            id="estimated_duration"
            type="number"
            className={" dark:bg-zinc-950 rounded-sm"}
            placeholder="Enter course duration"
            value={Math.max(0, formState.estimated_duration) || ""}
            onChange={handleInputChange}
          />
        </Label>
        <Label
          className="w-full font-thin text-md flex flex-col items-start gap-2"
          htmlFor="price"
        >
          Course Price
          <Input
            id="price"
            type="number"
            className={" dark:bg-zinc-950 rounded-sm"}
            placeholder="Enter course price"
            value={formState.price}
            onChange={handleInputChange}
          />
        </Label>
        <Label
          className="w-full font-thin text-md flex flex-col items-start gap-2"
          htmlFor="category"
        >
          Course Category
          <Select
            className="dark:bg-zinc-950 rounded-sm"
            onValueChange={handleSelectChange("category")}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </Label>
      </div>

      <div className="flex flex-col w-full col-start-2 col-span-3 gap-12">
        <Label
          className="w-full font-thin text-md flex flex-col items-start gap-2"
          htmlFor="description"
        >
          Course Description
          <Textarea
            id="description"
            type="text"
            className={"w-full dark:bg-zinc-950 rounded-sm"}
            placeholder="Enter course description"
            value={formState.description}
            onChange={handleInputChange}
          />
        </Label>
        <Button type="submit">Create Course</Button>
      </div>
    </form>
  );
}

export default CreateCoursePage;
