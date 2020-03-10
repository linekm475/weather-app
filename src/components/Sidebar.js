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

function Sidebar({ forecast, isOpen, setIsOpen }) {
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
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  z-index: 10;
  position: fixed;
  display: grid;
  grid-template-rows: 1fr repeat(2, auto) 3fr;
  background-color: ${props => props.theme.colors.gray[8]};
  color: white;
  height: 100%;
  width: 184px;
  padding: 26px 22px;
  transition: all 0.4s;

  .menu-icon {
    display: none;
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

  @media ${props => props.theme.breakpoints.md} {
    transform: ${props => (props.isOpen ? "" : "translateX(-300px)")};

    .menu-icon {
      display: unset;
    }
  }
`;

export default Sidebar;
