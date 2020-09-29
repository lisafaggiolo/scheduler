import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";  


export default function DayListItem(props) {
  
  const dayClass = classNames("day-list__item", {
      "day-list__item--selected" : props.selected,
      "day-list__item--full" : !props.spots
  }); 
  
  const formatSpots = (spots) => {
    return (spots > 1 ?  spots + " spots remaining" : "1 spot remaining");
  }
  
  return (
    <li 
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{!props.spots ?  "no spots remaining" : formatSpots(props.spots)}</h3>
    </li>
  );
}