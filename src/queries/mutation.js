import { gql } from "@apollo/client";

export const ADD_ENROLLMENT = gql`
  mutation AddEnrollment($course_id: Int, $student_id: Int) {
    insert_enrolments_one(
      object: { course_id: $course_id, student_id: $student_id }
    ) {
      course_id
      student_id
      course {
        id
        title
        start_date
        detail
        end_date
      }
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation AddStudent(
    $age: Int
    $firstname: String
    $lastname: String
    $avatar: String
  ) {
    insert_students_one(
      object: {
        age: $age
        firstname: $firstname
        lastname: $lastname
        avatar: $avatar
      }
    ) {
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
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse(
    $detail: String
    $end_date: date
    $start_date: date
    $title: String
  ) {
    insert_courses_one(
      object: {
        detail: $detail
        end_date: $end_date
        start_date: $start_date
        title: $title
      }
    ) {
      detail
      end_date
      start_date
      title
    }
  }
`;
export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: Int!
    $detail: String
    $end_date: date
    $start_date: date
    $title: String
  ) {
    update_courses_by_pk(
      _set: {
        detail: $detail
        end_date: $end_date
        start_date: $start_date
        title: $title
      }
      pk_columns: { id: $id }
    ) {
      detail
      end_date
      id
      start_date
      title
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: Int!
    $age: Int
    $firstname: String
    $lastname: String
    $avatar: String
  ) {
    update_students_by_pk(
      pk_columns: { id: $id }
      _set: {
        age: $age
        firstname: $firstname
        lastname: $lastname
        avatar: $avatar
      }
    ) {
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
