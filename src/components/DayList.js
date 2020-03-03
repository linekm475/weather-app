import React from "react";
import moment from "moment";

import Day from "./Day";

function DayList({ day }) {
  // formatera till ett mer användarvänligt format på datumet
  let date = moment(day.dt_txt).format("dddd");
  // ändra från engelska till svenska på dagarnas namn
  date = date
    .replace("Monday", "Måndag")
    .replace("Tuesday", "Tisdag")
    .replace("Wednesday", "Onsdag")
    .replace("Thursday", "Torsdag")
    .replace("Friday", "Fredag")
    .replace("Saturday", "Lördag")
    .replace("Sunday", "Söndag");
  return (
    <Day>
      <h2>{date}</h2>
      <img src={`icons/${day.weather[0].icon}.png`} alt="icon" />
      <p className="temp">{Math.round(day.main.temp)} °C</p>
    </Day>
  );
}

export default DayList;
