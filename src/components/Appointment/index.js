import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";

import useVisualMode from  "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING"

export default function Appointment(props) {

  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)
   

  
  const save = (name, interviewer) => {
    
    const interview = {
      student: name,
      interviewer
    }
    console.log(interview);
    console.log(props.id)
    console.log(props.bookInterview)
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  
  const appDelete = () => {

    props.cancelInterview(props.id).then(() => transition(EMPTY)); 
  }



  return (
      <article className="appointment">
          <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && (<Form 
                                    onCancel={() => back()}  
                                    onSave={save} 
                                    interviewers={props.interviewers}
                            
                                    />)}
            {mode === SHOW && props.interview && (<Show
                                    student={props.interview.student}
                                    interviewer={props.interview.interviewer}
                                    id={props.id}
                                    onDelete={appDelete}  
                                    //onSave={() => transition(CONFIRM)}
                                    />)}
            {mode === CONFIRM && (<Confirm 
                                     bookInterview={props.bookInterview}
                                     message="ok this works"
                                     onCancel={() => back() } 
                                     onConfirm={save}/>)}
            {mode === SAVING && (<Status message='Please hold' />)}
      </article>
  );
};