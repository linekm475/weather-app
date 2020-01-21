import React from "react";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar">
        <form>
          <input type="text" placeholder="Location..." />
          <button type="submit">Search</button>
        </form>
        <section className="days">
          <div className="day">
            <h2>Monday</h2>
          </div>
        </section>
      </aside>
    );
  }
}

export default Sidebar;
