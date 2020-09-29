import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
    const interviewerClass = classNames("interviewers__item", {
        "interviewers__item--selected" : props.selected
     });

     const interviewerClassImage = classNames("interviewers__item-image", {
        "interviewers__item--selected-image" : props.selected
     });

  return ( 
    <li className={interviewerClass}>
    <img
      className={interviewerClassImage}
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>
  );
};