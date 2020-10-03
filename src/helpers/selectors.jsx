
const getAppointmentsForDay = (state, day) => {

    const targetDay = state.days.filter(dayInfo => dayInfo.name === day);
     
    return targetDay.length === 0 ? [] : targetDay[0].appointments.map(appointmentId => state.appointments[appointmentId])
};
exports.getAppointmentsForDay = getAppointmentsForDay;
  

const  getInterview = (state, interview) => {

    if (interview === null) {
        return null;
    } else {
      for (let interviewer in state.interviewers){
        if (interview.interviewer === state.interviewers[interviewer].id) {
          return ({  
          "student": interview.student,
          "interviewer": {  
            "id": interview.interviewer,
            "name": state.interviewers[interviewer].name,
            "avatar": state.interviewers[interviewer].avatar
          }
        }
      )} 
      
    }
    }    
};
exports.getInterview = getInterview