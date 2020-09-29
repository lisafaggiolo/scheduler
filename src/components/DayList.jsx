import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

    const daylist = props.days.map( day => {
        return (
          <ul
          key={day.id} 
          onClick={() => props.setDay}
          >
            <DayListItem
              name={day.name}
              spots={day.spots}
              selected={day.name === props.day}
              setDay={props.setDay} />
          </ul>  
        );
    });
    return daylist;
};