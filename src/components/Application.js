import React from "react";
import "components/Application.scss";
//import classNames from "classnames";
//import DayListItem from "components/DayListItem";
//import Button from "components/Button"
import DayList from "components/DayList";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

// function DayListItem(props) {
  
//   const dayClass = classNames("day-list__item", {
//       "day-list__item--selected" : props.selected,
//       "day-list__item--full" : !props.spots
//   }); 
  
//   const formatSpots = (spots) => {
//     return (spots > 1 ?  spots + " spots remaining" : "1 spot remaining");
//   }
  
//   return (
//     <li 
//       className={dayClass}
//       onClick={() => props.setDay(props.name)}
//     >
//       <h2 className="text--regular">{props.name}</h2>
//       <h3 className="text--light">{!props.spots ?  "no spots remaining" : formatSpots(props.spots)}</h3>
//     </li>
//   );
// }

// function DayList(props) {

//   const daylist = days.map( day => {
//       return (
//         <ul onClick={() => props.setDay(day.name)}>
//           <DayListItem
//             key={day.id}
//             name={day.name}
//             spots={day.spots}
//             selected={day.name === props.day}
//             setDay={props.setday} />
//         </ul>  
//       );
//   });
//   return daylist;
// };


export default function Application(props) {
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
          days={days}
          day={"Monday"}
          setDay={day => console.log(day)}
        />}
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
    
  );
}
