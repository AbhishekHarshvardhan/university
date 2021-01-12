import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ADD_COURSE } from "../../queries/mutation";
import CourseForm from "../CourseForm";

const CourseNew = () => {
  const [course, setCourse] = React.useState({
    title: "",
    startDate: "",
    endDate: "",
    detail: "",
  });
  const [addCourse] = useMutation(ADD_COURSE);
  const handleChange = (e) => {
    setCourse({ ...course, [e.currentTarget.name]: e.currentTarget.value });
  };
  const history = useHistory();
  const onSubmit = () => {
    addCourse({
      variables: {
        title: course.title,
        detail: course.detail,
        end_date: course.endDate,
        start_date: course.startDate,
      },
    }).then(() => {
      history.push("/courses");
    });
  };

  return (
    <CourseForm {...{ newCourse: true, course, handleChange, onSubmit }} />
  );
};

export default CourseNew;
