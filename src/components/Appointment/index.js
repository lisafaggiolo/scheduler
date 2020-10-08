import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from  "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

/////////////////////////////////////////////////
  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
/////////////////////////////////////////////////
  const save = (name, interviewer) => {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

/////////////////////////////////////////////////  
  const appDelete = () => {
    
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true)); 
  };

  return (
      <article className="appointment">
          <Header time={props.time}/>
            {mode === EMPTY && <Empty 
                                    onAdd={() => transition(CREATE)} 
                                    />}
            {mode === SHOW && props.interview && (<Show
                                    student={props.interview.student}
                                    interviewer={props.interview.interviewer}
                                    id={props.id}
                                    onEdit={() => transition(EDIT)}
                                    onDelete={() => transition(CONFIRM)} 
                                    />)}
            {mode === CREATE && (<Form 
                                    interviewers={props.interviewers}
                                    onCancel={() => back()}  
                                    onSave={save}                                                            
                                    />)}
            {mode === EDIT && (<Form 
                                    student={props.interview.student}
                                    interviewer={props.interview.interviewer.id}
                                    interviewers={props.interviewers}
                                    onCancel={() => transition(SHOW, true)}  
                                    onSave={save} 
                                    />)}
            {mode === SAVING && (<Status 
                                    message='Saving' 
                                    />)}
            {mode === ERROR_SAVE && (<Error 
                                    message='Sorry, an error occured while trying to save your appointment'
                                    onCancel={() => transition(SHOW, true)} 
                                    />)}
            {mode === DELETING && (<Status 
                                    message='Deleting' 
                                    />)}
            {mode === CONFIRM && (<Confirm 
                                    bookInterview={props.bookInterview}
                                    message="Are you sure you want to remove this appointment?"
                                    onCancel={() =>  transition(SHOW, true) } 
                                    onConfirm={appDelete}/>)}
            {mode === ERROR_DELETE && (<Error 
                                    message='Sorry, an error occured while trying to delete your appointment'
                                    onCancel={() => transition(SHOW, true)} 
                                    />)}
      </article>
  );
};