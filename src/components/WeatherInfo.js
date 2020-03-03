import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import Search from "./Search";
import TimeCard from "./TimeCard";

function WeatherInfo({
  day,
  handleSubmit,
  updateSearch,
  search,
  location,
  forecast
}) {
  console.log("location: ", location);
  console.log("w forecast: ", location.state);
  let weather;
  if(!day && location && location.state && location.state.day) {
    weather = location.state.day;
  } else if(day) {
    weather = day;
  } else {
    return <Redirect to="/current" />;
  }

  // checka ifall APIen skicka tillbaka data om nederbörd, annars är nederbörd 0
  let rainfall = 0;
  if (weather && weather.rain && (weather.rain["3h"] || weather.rain["3h"])) {
    rainfall = weather.rain["3h"] || weather.rain["3h"];
  }

  return (
    <StyledWeatherInfo>
      <Search
        handleSubmit={handleSubmit}
        updateSearch={updateSearch}
        search={search}
      />
      <div className="info">
        <div>
          <img src={`icons/${weather.weather[0].icon}.png`} alt="icon" />
          <h1>{search}, SE</h1>
          <h2>{Math.round(weather.main.temp)}C</h2>
          <p>{weather.weather[0].description}</p>
        </div>
        <div>
          <p>Känns som: {Math.round(weather.main.feels_like)}</p>
          <p>Vind: {weather.wind.speed}</p>
          <p>Fuktighet: </p>
          <p>Min: {Math.round(weather.main.temp_min)}</p>
          <p>Max: {Math.round(weather.main.temp_max)}</p>
        </div>
      </div>
      <div className="day-forecast">
        {location &&
        location.state &&
        location.state.forecast &&
        location.state.forecast.filter(day => {
          return moment(day.dt_txt)
            .format("dddd") === moment(weather.dt_txt).format("dddd");
        }).map(day => <TimeCard day={day} />)}
      </div>
    </StyledWeatherInfo>
  );
}

const StyledWeatherInfo = styled.main`
  background-color: ${props => props.theme.colors.gray[7]};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  color: white;

  .info {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .day-forecast {
    display: flex;
  }
`;

export default withRouter(WeatherInfo);
