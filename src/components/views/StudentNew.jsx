import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_STUDENT } from "../../queries/mutation";
import StudentForm from "../StudentForm";
import { useHistory } from "react-router-dom";

const StudentNew = () => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    age: "",
    avatar: "",
  });
  const history = useHistory();
  const [addStudent] = useMutation(ADD_STUDENT);
  const handleChange = (e) => {
    setStudent({ ...student, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onSubmit = () => {
    addStudent({
      variables: {
        firstname: student.firstname,
        lastname: student.lastname,
        age: student.age,
        avatar: student.avatar,
      },
    }).then(function () {
      history.push("/students");
    });
  };

  return (
    <div className="ui section">
      <br />
      <div className="ui stackable grid">
        <div className="three wide centered column">
          <img
            className="ui medium circular centered image"
            src={student.avatar || window.location.origin + "/avatar.jpg"}
            alt="student"
          />
        </div>
        <div className="thirteen wide column">
          <StudentForm
            newStudent={true}
            student={student}
            onSubmit={onSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentNew;
