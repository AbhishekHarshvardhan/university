import React from "react";
import { Link } from "react-router-dom";

const CourseTable = ({ courses }) => {
  return (
    <table className="ui very basic table">
      <thead>
        <tr>
          <th className="single line">Title</th>
          <th className="single line">Start Date</th>
          <th className="single line">End Date</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(({ course }) => (
          <tr key={course.id}>
            <td className="single line">
              <Link to={`/courses/${course.id}`}>{course.title}</Link>
            </td>
            <td className="single line">{course.start_date}</td>
            <td className="single line">{course.end_date}</td>
            <td>{course.detail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
