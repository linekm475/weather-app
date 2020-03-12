import React from "react";
import styled from "styled-components";
import moment from "moment";
import StyledLink from "./StyledLink";

function translateDate(date) {
  switch (date) {
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

function Sidebar({
  forecast,
  isOpen,
  setIsOpen,
  isDarkMode,
  setIsDarkMode
}) {
  return (
    <StyledSidebar isOpen={isOpen}>
      <StyledLink
        className="current-link"
        activeClassName="active"
        to="/current"
        onClick={() => setIsOpen(false)}
      >
        Nutid
      </StyledLink>
      <section className="days">
        <p className="forecast">Prognos</p>
        {forecast &&
          forecast.map((day, idx, forecast) => {
            if (idx % 8 !== 0) return null;
            const date = moment(day.dt_txt).format("dddd");
            let translatedDay = translateDate(date);
            const displayDate = date.replace(date, translatedDay);
            return (
              <StyledLink
                key={`${day.dt}${day.wind.speed}${day.wind.deg}`}
                activeClassName="active"
                to={{
                  pathname: `/f/${moment(day.dt_txt)
                    .format("dddd")
                    .toLowerCase()}`,
                  state: { day, forecast }
                }}
                onClick={() => setIsOpen(false)}
              >
                {displayDate}
              </StyledLink>
            );
          })}
      </section>
      <button
        className="color-mode"
        onClick={() => {
          setIsDarkMode(!isDarkMode);
          setIsOpen(false);
        }}
      >
        {isDarkMode ? "Ljust läge" : "Mörkt läge"}
      </button>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  z-index: 10;
  position: fixed;
  display: grid;
  grid-template-rows: 1fr repeat(2, auto) 3fr auto;
  background-color: ${props => props.theme.colors.bgSecondary};
  color: ${props => props.theme.colors.textMain};
  height: 100%;
  width: 184px;
  padding: 26px 22px;
  transition: transform 0.4s;

  .current-link {
    grid-row: 3 / span 1;
  }

  .days {
    grid-area: 4 / span 1;
    display: flex;
    flex-direction: column;
  }

  .days .forecast {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 22px;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .color-mode {
    grid-area: 5 / span 1;
    background-color: ${props => props.theme.colors.transparent};
    color: ${props => props.theme.colors.blue};
    border: none;
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    outline: none;
    transition: 0.2s;

    &:hover {
      background-color: ${props => props.theme.colors.blue};
      color: ${props => props.theme.colors.textMain};
    }
  }

  @media ${props => props.theme.breakpoints.md} {
    transform: ${props => (props.isOpen ? "" : "translateX(-300px)")};
  }
`;

export default Sidebar;
