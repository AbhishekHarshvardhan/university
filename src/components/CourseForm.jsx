import { useMutation } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ADD_COURSE, UPDATE_COURSE } from "../queries/mutation";
import ListPlaceholder from "./common/ListPlaceholder";

const CourseForm = ({ course }) => {
  const history = useHistory();
  const [newCourse, setNewCourse] = React.useState({
    title: "",
    start_date: "",
    end_date: "",
    detail: "",
  });

  const [addCourse, { loading: adding }] = useMutation(ADD_COURSE, {
    onCompleted: () => history.push("/courses"),
    update: (cache, { data: { insert_courses_one } }) => {
      cache.modify({
        fields: {
          courses(exitingCourses = []) {
            return [insert_courses_one, ...exitingCourses];
          },
        },
      });
    },
  });
  const [updateCourse, { loading: updating }] = useMutation(UPDATE_COURSE);

  const handleChange = ({ currentTarget: Input }) => {
    setNewCourse({ ...newCourse, [Input.name]: Input.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (course)
      return updateCourse({
        variables: {
          id: newCourse.id,
          title: newCourse.title,
          detail: newCourse.detail,
          end_date: newCourse.end_date,
          start_date: newCourse.start_date,
        },
      });

    addCourse({
      variables: {
        title: newCourse.title,
        detail: newCourse.detail,
        end_date: newCourse.end_date,
        start_date: newCourse.start_date,
      },
    });
  };

  useEffect(() => {
    if (course) setNewCourse(course);
  }, []);

  if (adding || updating) return <ListPlaceholder count={4} />;
  return (
    <form className="ui form border" onSubmit={onSubmit}>
      {course && <h4 className="ui dividing header">{course.title}</h4>}
      {!course && (
        <h4 className="ui dividing header">Please fill below details</h4>
      )}
      <br />
      <div className="field">
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={newCourse.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="field">
        <label>Course schedule</label>
        <div className="two fields">
          <div className="field">
            <input
              type="date"
              name="start_date"
              placeholder="Start"
              value={newCourse.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="date"
              name="end_date"
              placeholder="End"
              value={newCourse.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="field">
        <textarea
          value={newCourse.detail}
          name="detail"
          cols="30"
          rows="5"
          onChange={handleChange}
        ></textarea>
      </div>
      <br />
      <button type="submit" className="ui fluid button">
        Save
      </button>
    </form>
  );
};

export default CourseForm;
