import React from "react";
import * as moment from "moment";
import "./DayList.css";

function DayList({ day }) {
  // formatera till ett mer användarvänligt format på datumet
  let date = moment(day.dt_txt).format("dddd, HH:00");
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
    <div className="day">
      <div className="left">
        <h2>{date}</h2>
        <img src={`icons/${day.weather[0].icon}.png`} alt="icon" />
      </div>
      <p className="temp">{Math.round(day.main.temp)} °C</p>
    </div>
  );
}

export default DayList;
