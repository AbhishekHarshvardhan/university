import React from "react";
import { Link } from "react-router-dom";

const StudentCourses = ({ student }) => {
  return student.enrolments.map(({ course, id }) => (
    <Link key={id} to={`/courses/${course.id}`}>
      <div className="ui label">
        <i className="globe icon" /> {course.title}
      </div>
    </Link>
  ));
};

export default StudentCourses;
