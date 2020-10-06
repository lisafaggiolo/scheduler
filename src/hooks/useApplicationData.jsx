

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();


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