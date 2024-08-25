import React from 'react'
import "./Courses.css"
import { CourseData } from '../../context/CourseContext'

const Courses = () => {
  const { courses } = CourseData();
  console.log(courses);

  return (
    <div className="courses">
      <h2>Available Courses</h2>

      <div className="course-container">
        
      </div>
    </div>
  )
}

export default Courses