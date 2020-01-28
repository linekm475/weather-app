import React from "react";
import "./Sidebar.css";

function Sidebar({
  icon,
  temp,
  rainfall,
  description,
  search,
  updateSearch,
  handleSubmit
}) {
  return (
    <aside className="sidebar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location..."
          onChange={updateSearch}
          onBlur={updateSearch}
          value={search}
        />
        <button type="submit">Search</button>
      </form>
      <section className="days">
        <div className="day">
          <h2>Monday</h2>
          <img src={`icons/${icon}.png`} alt="icon" />
          <p>Temp: {temp}</p>
          <p>Nederbörd: {rainfall}mm</p>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
