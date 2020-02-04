import React from "react";
import "./Sidebar.css";

function Sidebar({ forecast }) {
  console.log("sidebar forecast a", forecast);
  return (
    <aside className="sidebar">
      {/*<section className="current">
        <h2>Nuvarande</h2>
        <img src={`icons/${weather.icon}.png`} alt="icon" />
        <p>Temp: {weather.temp}</p>
        <p>Nederbörd: {weather.rainfall}mm</p>
  </section>*/}
      <section className="days">
        {forecast.map((day, idx) => {
          if (idx % 8 !== 0) return null;
          return (
            <div className="day" key={day.dt}>
              <h2>{day.dt_txt}</h2>
              <img src={`icons/${day.weather[0].icon}.png`} alt="icon" />
              <p>Temp: {day.main.temp}</p>
              <p>Nederbörd: {(day.rain && day.rain["3h"]) || "-"}mm</p>
            </div>
          );
        })}
      </section>
    </aside>
  );
}

export default Sidebar;
