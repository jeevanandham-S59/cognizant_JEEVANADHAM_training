import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Details</h2>

      <h3>Course ID : {id}</h3>
    </div>
  );
}

export default CourseDetails;