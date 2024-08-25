import React from 'react'
import "./CourseCard.css"
import { server } from '../../main'

const CourseCard = ({course}) => {
  return (
    <div className="course-card">
        <img src={`${server}/${course.image}`} alt="" />
    </div>
  )
}

export default CourseCard