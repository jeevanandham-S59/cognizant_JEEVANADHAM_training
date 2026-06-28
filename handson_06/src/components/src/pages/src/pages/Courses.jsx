import { useEffect, useState } from "react";
import { getCourses } from "../api/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>

      {courses.map((course) => (
        <div
          key={course.id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{course.title}</h3>

          <p>{course.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;