import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_STUDENT, UPDATE_STUDENT } from "../queries/mutation";
import ListPlaceholder from "./common/ListPlaceholder";
import { useHistory } from "react-router-dom";

const StudentForm = ({ student, children }) => {
  const history = useHistory();
  const [newStudent, setNewStudent] = useState({
    firstname: "",
    lastname: "",
    age: "",
    avatar: "",
  });
  const [addStudent, { loading: adding }] = useMutation(ADD_STUDENT, {
    onCompleted: () => history.push("/students"),
    update: (cache, { data: { insert_students_one } }) => {
      cache.modify({
        fields: {
          students(exitingStudents = []) {
            return [insert_students_one, ...exitingStudents];
          },
        },
      });
    },
  });
  const [updateStudent, { loading: updating }] = useMutation(UPDATE_STUDENT);
  const handleChange = ({ currentTarget: Input }) => {
    setNewStudent({ ...newStudent, [Input.name]: Input.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (student)
      return updateStudent({
        variables: {
          id: newStudent.id,
          age: newStudent.age,
          firstname: newStudent.firstname,
          lastname: newStudent.lastname,
          avatar: newStudent.avatar,
        },
      });
    addStudent({
      variables: {
        firstname: newStudent.firstname,
        lastname: newStudent.lastname,
        age: newStudent.age,
        avatar: newStudent.avatar,
      },
    });
  };

  useEffect(() => {
    if (student) setNewStudent(student);
  }, [student]);

  if (adding || updating) return <ListPlaceholder count={3} />;
  return (
    <div className="ui section">
      <br />
      <div className="ui stackable grid">
        <div className="three wide centered column">
          <img
            className="ui medium circular centered image"
            src={newStudent.avatar || window.location.origin + "/avatar.jpg"}
            alt="student"
          />
        </div>
        <div className="thirteen wide column">
          <form className="ui form border" onSubmit={onSubmit}>
            {student && (
              <h4 className="ui dividing header">
                {student.firstname} {student.lastname}
              </h4>
            )}
            {!student && (
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
                    value={newStudent.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={newStudent.lastname}
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
                    value={newStudent.age}
                    onChange={handleChange}
                    required
                    min={18}
                    max={120}
                  />
                </div>
              </div>
              <div className="field thirteen column wide">
                <label>Avatar</label>
                <input
                  value={newStudent.avatar}
                  onChange={handleChange}
                  name="avatar"
                  type="url"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <br />
            <button type="submit" className="ui fluid button">
              Save
            </button>
          </form>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
