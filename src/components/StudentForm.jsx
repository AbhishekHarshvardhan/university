import React from "react";

const StudentForm = ({ newStudent, data, student, handleChange, onSubmit }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="ui form border" onSubmit={onFormSubmit}>
      {!newStudent && (
        <h4 className="ui dividing header">
          {data.students_by_pk.firstname} {data.students_by_pk.lastname}
        </h4>
      )}
      {newStudent && (
        <h4 className="ui dividing header">Please fill below details</h4>
      )}
      <br />
      <div className="field">
        <label>Name</label>
        <div className="two fields">
          <div className="field">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={student.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={student.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="ui grid">
        <div className="field three column wide">
          <label>Age</label>
          <div className="field">
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              required
              min={18}
              max={120}
            />
          </div>
        </div>
        {
          <div className="field thirteen column wide">
            <label>Avatar</label>
            <input
              value={student.avatar}
              onChange={handleChange}
              name="avatar"
              type="url"
              placeholder="https://example.com"
            />
          </div>
        }
      </div>
      <br />
      <button type="submit" className="ui fluid button">
        Save
      </button>
    </form>
  );
};

export default StudentForm;
