import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_COURSE } from "../queries/query";
import ListPlaceholder from "./common/ListPlaceholder";
import CourseForm from "./CourseForm";

const CourseDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { data, loading } = useQuery(FETCH_COURSE, { variables: { id } });
  if (loading) return <ListPlaceholder count={4} />;
  if (!data && !loading)
    return <h3 className="ui sub header">Course does not exist</h3>;

  return <CourseForm course={data.courses_by_pk} />;
};

export default CourseDetail;
