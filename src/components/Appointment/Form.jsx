
import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";


export default function Form(props) { 
  
  const [name, setName] = useState(props.name || "" );
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const reset = (props) => {
    setInterviewer(prevState => {
      return null;
    })
    setName(prevState => {
      return "";
    });
  }
  
  
    return (
        <main className="appointment__card appointment__card--create">
          <section className="appointment__card-left">
            <form autoComplete="off"  onSubmit={event => event.preventDefault()}>
                <input
                  className="appointment__create-input text--semi-bold"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter Student Name"
                />
            </form>
            <InterviewerList 
              interviewers={[]} 
              value={interviewer} 
              onClick={setInterviewer} />
          </section>
          <section className="appointment__card-right">
            <section className="appointment__actions">
              <Button danger onClick={props.onCancel}>Cancel</Button>
              <Button confirm onClick={props.onChange}>Save</Button>
            </section>
          </section>
        </main>
    );
}