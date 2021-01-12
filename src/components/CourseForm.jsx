import React from "react";

const CourseForm = ({ newCourse, data, course, handleChange, onSubmit }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="ui form border" onSubmit={onFormSubmit}>
      {!newCourse && (
        <h4 className="ui dividing header">{data.courses_by_pk.title}</h4>
      )}
      {newCourse && (
        <h4 className="ui dividing header">Please fill below details</h4>
      )}
      <br />
      <div className="field">
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={course.title}
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
              name="startDate"
              placeholder="Start"
              value={course.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="date"
              name="endDate"
              placeholder="End"
              value={course.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="field">
        <textarea
          value={course.detail}
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
