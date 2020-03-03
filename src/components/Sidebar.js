import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DayList from "./DayList";
import Day from "./Day";

function Sidebar({ forecast, weather }) {
  console.log("sidebar forecast a", forecast);
  return (
    <StyledSidebar>
      <Link to="/current" style={{ textDecoration: "none" }}>
        <Day active>
          <h2>Nuvarande</h2>
          <img src={`icons/${weather.weather[0].icon}.png`} alt="icon" />
          <p className="temp">{Math.round(weather.main.temp)} °C</p>
        </Day>
      </Link>
      <section className="days">
        {forecast.map((day, idx, forecast) => {
          if (idx % 8 !== 0) return null;
          return (
            <Link
              key={day.dt}
              to={{
                pathname: "/forecast",
                state: { day, forecast },
              }}
              style={{ textDecoration: "none" }}
            >
              <DayList day={day} />
            </Link>
          );
        })}
      </section>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  background-color: ${props => props.theme.colors.gray[8]};
  color: white;
  max-height: 100%;
  overflow: scroll;

  .day.active {
    background-color: ${props => props.theme.colors[5]};
    border: none;
  }
`;

export default Sidebar;
