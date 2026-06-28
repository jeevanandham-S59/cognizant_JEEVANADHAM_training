import { useSelector } from "react-redux";

function Profile() {
  const enrolledCourses = useSelector(
    (state) => state.courses.enrolledCourses
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Profile</h2>

      <h3>Enrolled Courses</h3>

      <p>Total Enrolled : {enrolledCourses.length}</p>

      <ul>
        {enrolledCourses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;