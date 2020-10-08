import {useState, useEffect} from "react";
import axios from "axios";


const useApplicationData = () => {

/////////////////////////////////////////////////
    useEffect(() => {
        Promise.all([
          axios.get("http://localhost:8001/api/days"),
          axios.get("http://localhost:8001/api/appointments"),
          axios.get("http://localhost:8001/api/interviewers")
        ]).then((all) => {
          setState(prev => ({ ...prev, days : all[0].data, appointments : all[1].data, interviewers : all[2].data}));
        });  
      }, []);
    
      const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: [],
        interviewers: []
      });

/////////////////////////////////////////////////
  const setDay = day => setState({ ...state, day });

/////////////////////////////////////////////////
  const getSpots = (appointments) => {

    const currentDay = state.days.find(eachday => eachday.name === state.day);
    //builds an array with the appointments which value equals to null
    const nullAppointments = currentDay.appointments.map(appId => appointments[appId]).filter(appointment => appointment.interview === null);
    const spotsNum = nullAppointments.length;
    
    //unpdates the spots value for the day when the appointment was booked or deleted
    const days = state.days.map(eachDay => {
      if (eachDay.id === currentDay.id) {
        eachDay.spots = spotsNum;
      } 
      return eachDay;
    });
    return days;
  };

/////////////////////////////////////////////////
  const bookInterview = (id, interview) => {

    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment };
    const days = getSpots(appointments);

    const bookApp = axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(response => setState({ ...state, appointments, days }));

    return bookApp;  
  }

/////////////////////////////////////////////////
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const interview = null;
    const days = getSpots(appointments);

    const deleteApp = axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(response => setState({ ...state, appointments, days }));
    return deleteApp;
   }
  return { state, setDay, bookInterview, cancelInterview };
}

/////////////////////////////////////////////////
export default useApplicationData;