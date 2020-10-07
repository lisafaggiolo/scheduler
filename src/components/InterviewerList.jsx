import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

import PropTypes from 'prop-types';

const InterviewerList = (props) => {

  const interviewerList = props.interviewers.map( interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={(event) => props.onClick(interviewer.id)}
      />
      );
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );  
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}


export default InterviewerList;