import React from "react";
import { Redirect, withRouter, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import moment from "moment";

import Search from "./Search";
import TimeCard from "./TimeCard";
import Loading from "./Loading";
import Error from "./Error";

function WeatherInfo({
  current,
  forecast,
  handleSubmit,
  updateSearch,
  search,
  city,
  location,
  isOpen,
  setIsOpen,
  isLoading,
  error
}) {
  const { day } = useParams();
  let weather;
  let dayForecast;
  if (!weather && current) {
    weather = current;
  } else if (!weather && forecast) {
    dayForecast = forecast.filter(dayForecast => (
      moment(dayForecast.dt_txt).format("dddd").toLowerCase() === day
    ));

    const middle = Math.round(dayForecast.length / 2);
    weather = dayForecast[middle] || dayForecast[0];
  } else {
    return <Redirect to="/current" />
  }

  return (
    <StyledWeatherInfo isOpen={isOpen}>
      <FontAwesomeIcon
        icon={isOpen ? faTimes : faBars}
        onClick={() => setIsOpen(!isOpen)}
        className="menu-toggle"
      />
      <Search
        handleSubmit={handleSubmit}
        updateSearch={updateSearch}
        search={search}
      />
      {isLoading ? (
        <Loading />
      ) : error ? <Error error={error} /> : (
        <>
          <div className="info">
            <img src={`/icons/${weather.weather[0].icon}.svg`} alt="icon" />
            <div>
              <h1>{city}</h1>
              <h2>{Math.round(weather.main.temp)} &deg;C</h2>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="right">
              <p>Känns som: {Math.round(weather.main.feels_like)} &deg;C</p>
              <p>Vind: {weather.wind.speed} m/s</p>
              <p>Luftfuktighet: {weather.main.humidity}&#37;</p>
              <p>Min: {Math.round(weather.main.temp_min)} &deg;C</p>
              <p>Max: {Math.round(weather.main.temp_max)} &deg;C</p>
            </div>
          </div>
          <div className="day-forecast">
            {dayForecast && dayForecast.map(day => (
              <TimeCard
                key={`${day.dt}${day.wind.speed}${day.wind.deg}`}
                day={day}
              />
            ))}
          </div>
        </>
      )}
    </StyledWeatherInfo>
  );
}

const StyledWeatherInfo = styled.main`
  width: 100%;
  min-height: 100%;
  background-color: ${props => props.theme.colors.bgMain};
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
  margin-left: 184px;
  padding: 60px 0;
  color: ${props => props.theme.colors.textMain};

  .menu-toggle {
    z-index: 100;
    display: none;
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 12px;
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.colors.hover};
    }
  }

  .info {
    margin: 40px auto;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-gap: 60px 30px;

    img {
      grid-column: 1 / span 2;
      max-width: 200px;
      margin: auto;
    }

    h1 {
      font-weight: 400;
    }

    h2 {
      font-size: 45px;
      margin: 8px 0;
    }

    .right {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        margin: 0;
      }
    }
  }

  .day-forecast {
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media ${props => props.theme.breakpoints.md} {
    margin-left: 0;

    .menu-toggle {
      display: unset;
    }

    .info {
      img {
        max-width: 150px;
      }
    }
  }

  @media ${props => props.theme.breakpoints.xs} {
    .info {
      grid-gap: 20px 10px;
      img {
        max-width: 100px;
      }

      h1 {
        font-size: 25px;
      }
    }

    .day-forecast {

    }
  }
`;

export default withRouter(WeatherInfo);
