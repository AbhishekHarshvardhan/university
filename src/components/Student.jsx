import React from "react";
import { Link } from "react-router-dom";
import CourseDates from "./CourseDates";
import StudentCourses from "./StudentCourses";

const Student = ({ student }) => {
  return (
    <div key={student.id} className="item">
      <div className="ui tiny image">
        <img src={student.avatar} alt={student.firstname} />
      </div>
      <div className="middle aligned content">
        <Link to={`/students/${student.id}`} className="header">
          {student.firstname} {student.lastname}
        </Link>
        <div className="meta">
          <StudentCourses student={student} />
        </div>
        <div className="description">
          <p />
        </div>
        <div className="extra">
          <CourseDates student={student} />
        </div>
      </div>
    </div>
  );
};

export default Student;
