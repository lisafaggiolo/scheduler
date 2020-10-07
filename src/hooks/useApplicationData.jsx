import React, {useState, useEffect} from "react";
import axios from "axios";



const useApplicationData = () => {

    useEffect(() => {
        Promise.all([
          axios.get("http://localhost:8001/api/days"),//.then(response => setDays(response.data))),
          axios.get("http://localhost:8001/api/appointments"),//.then(response => setAppointments(response.data))),
          axios.get("http://localhost:8001/api/interviewers")//.then(response => setInterviewers(response.data)))
        ]).then((all) => {
          setState(prev => ({ ...prev, days : all[0].data, appointments : all[1].data, interviewers : all[2].data}))
        });
        
      }, []);
    
    
      const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: [],
        interviewers: []
      });



  const setDay = day => setState({ ...state, day });




  const getSpots = (appointments) => {

    const currentDay = state.days.find(eachday => eachday.name === state.day)
    const nullAppointments = currentDay.appointments.map(appId => appointments[appId]).filter(appointment => appointment.interview === null)
    const spotsNum = nullAppointments.length
    
    const days = state.days.map(eachDay => {
      if (eachDay.id === currentDay.id) {
        eachDay.spots = spotsNum
      } 
      return eachDay;
    })

    return days;
  }






  const bookInterview = (id, interview) => {
    console.log("BOOK INTERVIEW")
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    


    const days = getSpots(appointments)

    const bookApp = axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(response => setState({ ...state, appointments, days }))

    return bookApp;
    
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
    const days = getSpots(appointments)

    const deleteApp = axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(response =>
      setState({
      ...state,
      appointments, 
      days  
    }))
    
 

    return deleteApp;
   }

   return { state, setDay, bookInterview, cancelInterview }
}
   export default useApplicationData;