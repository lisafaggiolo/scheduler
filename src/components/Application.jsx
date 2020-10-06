import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import axios from "axios";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
  

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });
  //const setInterviewers = interviewer => setInterviewers ({...state})

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),//.then(response => setDays(response.data))),
      axios.get("http://localhost:8001/api/appointments"),//.then(response => setAppointments(response.data))),
      axios.get("http://localhost:8001/api/interviewers")//.then(response => setInterviewers(response.data)))
    ]).then((all) => {
      setState(prev => ({ ...prev, days : all[0].data, appointments : all[1].data, interviewers : all[2].data}))
    });
    
  }, []); 
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

                     
  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(response =>
      setState({
      ...state,
      appointments
    }))
  }

   const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const interview = null;
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(response =>
      setState({
      ...state,
      appointments
    }))

   }

  
  //console.log(interviewersForDay);
 //interviewers={interviewers}
  //const interview = getInterview(state, appointment.interview);
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        {<DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />}
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">

        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview)
          const interviewersForDay = getInterviewersForDay(state, state.day)
          
          return (
            <li 
              key={appointment.id}>
            <Appointment
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewersForDay}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
            </li>)
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
