import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import axios from "axios";

import { getAppointmentsForDay, getInterview } from "../helpers/selectors"
//import getInterview from "../helpers/selectors"
  



export default function Application(props) {

  
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https: i.imgur.com/LpaY82x.png"
          }
        }
      },
      {
        id: 3,
        time: "2pm",
        interview: {
          student: "Lisa Hermiston",
          interviewer: { 
            id: 2, 
            name: "Tori Malcolm", 
            avatar: "https: i.imgur.com/Nmx0Qxo.png" 
          }
        }
      },
      {
        id: 4,
        time: "1pm",
        interview: {
          student: "Luke Faggiolo",
          interviewer:{ 
            id: 3, 
            name: "Mildred Nazir", 
            avatar: "https: i.imgur.com/T2WwVfS.png" 
          }
        }
      },
      {
        id: 5,
        time: "1pm",
        interview: {
          student: "Carla Szabo",
          interviewer: { 
            id: 5, 
            name: "Sven Jones", 
            avatar: "https: i.imgur.com/twYrpay.jpg" } 
        }
      }
    ],
    interviewers: []
  });


 
  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState({ ...state, days });
  //const setAppointments = appointments => setState({ ...state, appointments });
  //const setInterviewers = interviewers => setState({ ...state, interviewers });

  //  useEffect(() => {
  //    axios.get("http://localhost:8001/api/days")
  //    .then(response => setDays(response.data))
  //  }, []);  



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
          //setDays={setDays}
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
          return (
            <li>
            <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
             />
            </li>
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    
  );
}
