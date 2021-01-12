import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ENROLLMENT, UPDATE_STUDENT } from "../../queries/mutation";
import { FETCH_STUDENT } from "../../queries/query";
import ListPlaceholder from "../common/ListPlaceholder";
import CourseTable from "../CourseTable";
import CourseListModal from "../CourseListModal";
import StudentForm from "../StudentForm";

const StudentDetails = ({
  match: {
    params: { id },
  },
}) => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    age: "",
    avatar: "",
    enrolments: [],
  });
  const [showModal, setShowModal] = useState(false);
  const { loading, data } = useQuery(FETCH_STUDENT, {
    variables: { id },
  });
  const [updateStudent, { loading: updateLoader }] = useMutation(
    UPDATE_STUDENT
  );
  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {
    refetchQueries: [{ query: FETCH_STUDENT, variables: { id } }],
  });

  const onSave = (input) => {
    addEnrollment({
      variables: {
        course_id: input.value,
        student_id: id,
      },
    });
  };

  const onSubmit = () => {
    updateStudent({
      variables: {
        id: id,
        age: student.age,
        firstname: student.firstname,
        lastname: student.lastname,
        avatar: student.avatar,
      },
    });
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.currentTarget.name]: e.currentTarget.value });
  };

  useEffect(() => {
    if (!data) return;
    const {
      firstname,
      lastname,
      age,
      avatar,
      enrolments,
    } = data.students_by_pk;
    setStudent({
      firstname,
      lastname,
      age,
      avatar,
      enrolments,
    });
    setShowModal(false);

    return () => {
      return null;
    };
  }, [data]);

  if (loading) return <ListPlaceholder count={5} />;
  if (!data && !loading)
    return <h3 className="ui sub header">Student does not exist</h3>;

  return (
    <>
      <div className="ui section">
        <br />
        <div className="ui stackable grid">
          <div className="three wide column">
            <img
              className="ui medium circular image"
              src={student.avatar}
              alt={student.firstname}
            />
          </div>
          <div className="thirteen wide column">
            {updateLoader && <ListPlaceholder count={3} />}
            {!loading && (
              <StudentForm
                data={data}
                student={student}
                handleChange={handleChange}
                onSubmit={onSubmit}
              />
            )}
            <br />
            <br />
            <button
              onClick={() => setShowModal(true)}
              className="ui right floated circular icon button"
            >
              <i className="plus icon"></i> Add a new course
            </button>
            {student.enrolments.length > 0 && (
              <>
                <h4 className="ui dividing header">Courses</h4>
                <CourseTable courses={student.enrolments} />
              </>
            )}
          </div>
        </div>
      </div>
      <CourseListModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={onSave}
      />
    </>
  );
};

export default StudentDetails;
