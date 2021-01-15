import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ENROLLMENT } from "../queries/mutation";
import { FETCH_STUDENT } from "../queries/query";
import ListPlaceholder from "./common/ListPlaceholder";
import CourseTable from "./CourseTable";
import CourseListModal from "./CourseListModal";
import StudentForm from "./StudentForm";

const StudentDetails = ({
  match: {
    params: { id },
  },
}) => {
  const [showModal, setShowModal] = useState(false);
  const { loading, data } = useQuery(FETCH_STUDENT, {
    variables: { id },
  });

  const [addEnrollment] = useMutation(ADD_ENROLLMENT, {
    refetchQueries: [{ query: FETCH_STUDENT, variables: { id } }],
  });

  const onSave = (input) => {
    addEnrollment({
      variables: {
        course_id: input.value,
        student_id: id,
      },
    }).then(() => {
      setShowModal(false);
    });
  };

  if (loading) return <ListPlaceholder count={5} />;
  if (!data && !loading)
    return <h3 className="ui sub header">Student does not exist</h3>;

  return (
    <StudentForm student={data.students_by_pk}>
      <br />
      <br />
      <button
        onClick={() => setShowModal(true)}
        className="ui right floated circular icon button"
      >
        <i className="plus icon"></i> Add a new course
      </button>
      {data.students_by_pk.enrolments.length > 0 && (
        <CourseTable courses={data.students_by_pk.enrolments} />
      )}

      <CourseListModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={onSave}
        studentCourses={data.students_by_pk.enrolments.map((c) => c.course.id)}
      />
    </StudentForm>
  );
};

export default StudentDetails;
