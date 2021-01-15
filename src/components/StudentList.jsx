import React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FETCH_STUDENTS } from "../queries/query";
import Pagination from "react-js-pagination";
import ListPlaceholder from "./common/ListPlaceholder";
import Student from "./Student";
import ItemButton from "./ItemButton";

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data, loading } = useQuery(FETCH_STUDENTS, {
    variables: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    },
    fetchPolicy: "no-cache",
  });

  if (loading) return <ListPlaceholder count={pageSize} />;
  return (
    <>
      <ItemButton title="Add Student" path="/students/new" />
      <div className="ui segment">
        <div className="ui divided very relaxed items">
          {data.students.map((student) => (
            <Student key={student.id} student={student} />
          ))}
        </div>
      </div>
      <div className="d-flex">
        <Pagination
          {...{
            totalItemsCount: data.students_aggregate.aggregate.count,
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

export default StudentList;
