import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import StyledLink from "./StyledLink";

function translateDate(date) {
  switch(date) {
    case "Monday":
      return "Måndag";
    case "Tuesday":
      return "Tisdag";
    case "Wednesday":
      return "Onsdag";
    case "Thursday":
      return "Torsdag";
    case "Friday":
      return "Fredag";
    case "Saturday":
      return "Lördag";
    case "Sunday":
      return "Söndag";
    default:
      return "";
  }
}

function Sidebar({ forecast, weather, isOpen, setIsOpen }) {
  return (
    <StyledSidebar>
      <FontAwesomeIcon
        icon={faTimes}
        className="menu-icon"
        onClick={() => setIsOpen(!isOpen)}
      />
      <StyledLink
        className="current-link"
        activeClassName="active"
        to="/current"
      >
        Nutid
      </StyledLink>
      <section className="days">
        <p className="forecast">Prognos</p>
        {forecast && forecast.map((day, idx, forecast) => {
          if (idx % 8 !== 0) return null;
          const date = moment(day.dt_txt).format("dddd");
          let translatedDay = translateDate(date);
          const displayDate = date.replace(date, translatedDay);
          return (
            <StyledLink
              key={`${day.dt}${day.wind.speed}${day.wind.deg}`}
              activeClassName="active"
              to={{
                pathname: `/f/${moment(day.dt_txt).format("dddd").toLowerCase()}`, //"/forecast",
                state: { day, forecast }
              }}
            >
              {displayDate}
            </StyledLink>
          );
        })}
      </section>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  position: fixed;
  // display: flex;
  // flex-direction: column;
  display: grid;
  grid-template-rows: auto 1fr repeat(2, auto) 3fr;
  background-color: ${props => props.theme.colors.gray[8]};
  color: white;
  height: 100%;
  width: 184px;
  padding: 26px 22px;
  transition: 0.2s;

  .menu-icon {
    grid-row: 1 / span 1;
    font-size: 12px;
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .current-link {
    grid-row: 3 / span 1;
  }

  .days {
    grid-area: 4 / span 1;
    display: flex;
    flex-direction: column;
  }

  .days .forecast {
    color: rgba(255, 255, 255, 0.8);
    font-size: 22px;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 20px;
  }
`;

export default Sidebar;
