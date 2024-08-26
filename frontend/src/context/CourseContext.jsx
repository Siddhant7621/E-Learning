import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null); // Changed to null
  const [mycourse, setMyCourse] = useState([]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCourse = async (id) => {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
    }
  };

  const fetchMyCourse = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: { token },
      });
      setMyCourse(data.courses);
    } catch (error) {
      console.error("Error fetching my courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
