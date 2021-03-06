import { useQuery } from "@apollo/client";
import React from "react";
import { FETCH_ALL_COURSES } from "../queries/query";
import ListPlaceholder from "./common/ListPlaceholder";

const CourseListModal = ({ onSave, handleClose, show, studentCourses }) => {
  let input;
  const dimmerClassName = show ? "ui dimmer modals active" : "ui dimmer modals";
  const modalClassName = show ? "ui modal active" : "ui modal";
  const { data, loading } = useQuery(FETCH_ALL_COURSES);

  return (
    <div className={dimmerClassName}>
      <div className={modalClassName}>
        <div className="header">Select a course</div>
        <div className="content">
          {loading && <ListPlaceholder count={2} />}
          {!loading && (
            <select
              ref={(node) => {
                input = node;
              }}
              className="ui dropdown"
            >
              {data.courses
                .filter((c) => !studentCourses.includes(c.id))
                .map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="actions">
          <div onClick={() => onSave(input)} className="ui approve button">
            Save
          </div>
          <div onClick={handleClose} className="ui cancel button">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListModal;
