import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
    
  const daylist = props.days.map((day) => {
      return (
        <ul key={day.id}>
          <DayListItem
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={(event) => props.setDay(day.name)} />
        </ul>  
      );
  });
  return daylist;
};