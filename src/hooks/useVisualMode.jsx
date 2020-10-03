import React, {useState} from "react";

function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    function back() {
      mode === initial ? setHistory(initial) : 
        history.pop()
        const lastState = history.length-1
        setMode(history[lastState]);      
    }
         
    function transition(next, replace = false) { 
       if (replace) {
         setMode([initial]) 
       } else {
         history.push(next); 
         setMode(next);
       }
      
      //  replace ? setMode([initial]) : 
      //    history.push(next) 
      //    setMode(next); 
    }
    return { mode, transition, back };
}

export default useVisualMode;

