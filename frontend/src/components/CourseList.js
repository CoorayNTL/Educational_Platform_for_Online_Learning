import React from "react";
import styled from "styled-components";
import Tabs from "./Tabs";
import { useCoursesContext } from "../context/courses_context";

const CourseList = () => {
  const { course } = useCoursesContext();

  return (
    <CoursesListWrapper>
      <div className="container">
        <div className="course-list-top">
          <h2>A broad selection of course</h2>
          <p>
            Choose from over 210,000 online video course with new additions
            published every month.
          </p>
        </div>

        <Tabs course={course} />
      </div>
    </CoursesListWrapper>
  );
};

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .course-list-top p {
    font-size: 1.8rem;
  }
`;

export default CourseList;
