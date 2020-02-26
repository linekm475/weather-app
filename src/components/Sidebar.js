import React from "react";
import styled from "styled-components";
import DayList from "./DayList";
import Day from "./Day";

function Sidebar({ forecast, weather }) {
  console.log("sidebar forecast a", forecast);
  return (
    <StyledSidebar>
      <Day active>
        <div className="left">
          <h2>Nuvarande</h2>
          <img src={`icons/${weather.weather[0].icon}.png`} alt="icon" />
        </div>
        <p className="temp">{Math.round(weather.main.temp)} °C</p>
      </Day>
      <section className="days">
        {forecast.map((day, idx) => {
          if (idx % 8 !== 0) return null;
          return <DayList key={day.dt} day={day} />;
        })}
      </section>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  background-color: ${props => props.theme.colors.gray[8]};
  color: white;
  max-height: 100vh;

  .day.active {
    background-color: ${props => props.theme.colors[5]};
    border: none;
  }
`;

export default Sidebar;
