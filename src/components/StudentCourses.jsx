import React from "react";

const StudentCourses = ({ student }) => {
  return student.enrolments.map(({ course, id }) => (
    <div key={id} className="ui label">
      <i className="globe icon" /> {course.title}
    </div>
  ));
};

export default StudentCourses;
