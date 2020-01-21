import React from "react";
import "./Sidebar.css";

function Sidebar({ icon, temp, description }) {
  return (
    <aside className="sidebar">
      <form>
        <input type="text" placeholder="Location..." />
        <button type="submit">Search</button>
      </form>
      <section className="days">
        <div className="day">
          <h2>Monday</h2>
          <img src={icon} alt="icon" />
          <p>Temp: {temp}</p>
          <p>Nederbörd: 0mm</p>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
