import { gql } from "@apollo/client";

export const FETCH_STUDENTS = gql`
  query FetchStudents($limit: Int, $offset: Int) {
    students(limit: $limit, offset: $offset) {
      id
      firstname
      lastname
      age
      avatar
      enrolments(limit: 2, order_by: { course: { start_date: desc } }) {
        id
        course {
          id
          title
          start_date
          end_date
        }
      }
    }
    students_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`;

export const FETCH_STUDENT = gql`
  query FetchStudent($id: Int!) {
    students_by_pk(id: $id) {
      age
      avatar
      enrolments {
        course {
          id
          title
          start_date
          detail
          end_date
        }
        id
      }
      firstname
      lastname
      id
    }
  }
`;

export const FETCH_COURSES = gql`
  query FetchCourses($limit: Int, $offset: Int) {
    courses(limit: $limit, offset: $offset) {
      detail
      end_date
      start_date
      id
      title
    }
    courses_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const FETCH_COURSE = gql`
  query FetchCourse($id: Int!) {
    courses_by_pk(id: $id) {
      id
      detail
      end_date
      start_date
      title
    }
  }
`;

export const FETCH_ALL_COURSES = gql`
  query FetchAllCourses {
    courses {
      detail
      end_date
      start_date
      id
      title
    }
  }
`;
