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

   return { state, setDay, bookInterview, cancelInterview }
}
   export default useApplicationData;