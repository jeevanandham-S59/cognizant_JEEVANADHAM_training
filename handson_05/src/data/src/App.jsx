import { useState } from "react";

import Header from "./components/Header";
import CourseCard from "./components/CourseCard";

import courses from "./data/courses";

import "./App.css";

function App() {

  const [search, setSearch] = useState("");

  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

      <Header />

      <div className="container">

        <input
          type="text"
          placeholder="Search Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid">

          {filteredCourses.map(course => (

            <CourseCard
              key={course.id}
              course={course}
              onSelect={setSelectedCourse}
            />

          ))}

        </div>

        {

          selectedCourse &&

          <div className="details">

            <h2>Selected Course</h2>

            <p>Name : {selectedCourse.name}</p>

            <p>Grade : {selectedCourse.grade}</p>

            <p>Credits : {selectedCourse.credits}</p>

          </div>

        }

      </div>

    </>
  );

}

export default App;