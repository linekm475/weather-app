import React from "react";
import "./Sidebar.css";
import DayList from "../DayList/DayList";

function Sidebar({ forecast, weather }) {
  console.log("sidebar forecast a", forecast);
  return (
    <aside className="sidebar">
      <div className="day active">
        <div className="left">
          <h2>Nuvarande</h2>
          <img src={`icons/${weather.weather[0].icon}.png`} alt="icon" />
        </div>
        <p className="temp">{Math.round(weather.main.temp)} °C</p>
      </div>
      <section className="days">
        {forecast.map((day, idx) => {
          if (idx % 8 !== 0) return null;
          return <DayList key={day.dt} day={day} />;
        })}
      </section>
    </aside>
  );
}

export default Sidebar;
