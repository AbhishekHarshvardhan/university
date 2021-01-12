import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Pagination from "react-js-pagination";
import { FETCH_COURSES } from "../queries/query";
import CourseTable from "./CourseTable";
import ListPlaceholder from "./common/ListPlaceholder";
import ItemButton from "./ItemButton";

const CourseList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const result = useQuery(FETCH_COURSES, {
    variables: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    },
  });

  const {
    data = { courses: [], courses_aggregate: { aggregate: { count: 0 } } },
    loading,
  } = result;

  if (loading) return <ListPlaceholder count={pageSize / 2} />;
  return (
    <>
      <ItemButton title="Add Course" path="/courses/new" />
      <div className="ui segment">
        <CourseTable courses={data.courses.map((course) => ({ course }))} />
      </div>
      <div className="d-flex">
        <Pagination
          {...{
            totalItemsCount: data.courses_aggregate.aggregate.count,
            itemsCountPerPage: pageSize,
            activePage: currentPage,
            pageRangeDisplayed: 5,
            onChange: (page) => setCurrentPage(page),
            innerClass: "ui pagination menu pl-0 pointer",
            itemClass: "item",
            linkClass: "ui big sub header",
          }}
        />
      </div>
    </>
  );
};

export default CourseList;
