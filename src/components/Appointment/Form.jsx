
import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
//import useVisualMode from  "../../hooks/useVisualMode";

export default function Form(props) { 
  
  const [name, setName] = useState(props.student || "" );
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

/////////////////////////////////////////////////  
  const reset = () => {
    setInterviewer(null);
    setName("");
    setError(null);
  };

///////////////////////////////////////////////// 
  const cancel = () => {
    reset();
    props.onCancel();
  };

/////////////////////////////////////////////////
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("You must pick an interviewer!");
      return;
    }
    setError(""); 
    props.onSave(name, interviewer);
  };
  
  return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off"  onSubmit={event => event.preventDefault()}>
              <input
                className="appointment__create-input text--semi-bold"
                name="name"
                type="text"
                placeholder="Enter Student Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                data-testid="student-name-input"                  
              />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList 
            interviewers={props.interviewers} 
            value={interviewer} 
            onClick={setInterviewer}
             />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>Cancel</Button>
            <Button  confirm onClick={validate}>Save</Button>
          </section>
        </section>
      </main>
      );
};

