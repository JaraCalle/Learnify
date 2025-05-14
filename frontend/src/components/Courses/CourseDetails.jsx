import React from 'react'
import TagList from '@/components/TagList';

function CourseDetails({course}) {


    const { difficulty, estimated_duration, instructor } = course;
    const {username} = instructor;

    const courseDetails = [difficulty, estimated_duration + ' hours', username];


  return (
    <TagList tags={courseDetails}/>
  );
}

export default CourseDetails