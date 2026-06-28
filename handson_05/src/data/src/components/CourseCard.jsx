function CourseCard({ course, onSelect }) {
  return (
    <div className="card">

      <h3>{course.name}</h3>

      <p>Code : {course.code}</p>

      <p>Credits : {course.credits}</p>

      <button
        onClick={() => onSelect(course)}
      >
        View Grade
      </button>

    </div>
  );
}

export default CourseCard;