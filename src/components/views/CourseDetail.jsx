import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_COURSE } from "../../queries/mutation";
import { FETCH_COURSE } from "../../queries/query";
import ListPlaceholder from "../common/ListPlaceholder";
import CourseForm from "../CourseForm";

const CourseDetail = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [course, setCourse] = React.useState({
    title: "",
    startDate: "",
    endDate: "",
    detail: "",
  });
  const [updateCourse] = useMutation(UPDATE_COURSE);
  const { data, loading } = useQuery(FETCH_COURSE, { variables: { id } });
  const handleChange = (e) => {
    setCourse({ ...course, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onSubmit = () => {
    updateCourse({
      variables: {
        id,
        title: course.title,
        detail: course.detail,
        end_date: course.endDate,
        start_date: course.startDate,
      },
    }).then(() => {
      history.goBack();
    });
  };
  React.useEffect(() => {
    if (!data) return;
    const { title, detail, end_date, start_date } = data.courses_by_pk;
    setCourse({
      title,
      detail,
      endDate: end_date,
      startDate: start_date,
    });
    return () => null;
  }, [data]);

  if (loading) return <ListPlaceholder count={2} />;
  const props = { data, course, handleChange, onSubmit };
  return <CourseForm {...props} />;
};

export default CourseDetail;
