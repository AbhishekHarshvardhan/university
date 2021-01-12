import React from "react";

const CourseDates = ({ student }) => {
  return student.enrolments.map(({ course, id }) => (
    <div key={id} className="ui label">
      {course.start_date} to {course.end_date}
    </div>
  ));
};

export default CourseDates;
