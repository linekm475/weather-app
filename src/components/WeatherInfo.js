import React from "react";
import styled from "styled-components";

function WeatherInfo({ weather, handleSubmit, updateSearch, search }) {
  // checka ifall APIen skicka tillbaka data om nederbörd, annars är nederbörd 0
  let rainfall = 0;
  if (weather.rain && (weather.rain["3h"] || weather.rain["3h"])) {
    rainfall = weather.rain["3h"] || weather.rain["3h"];
  }

  return (
    <StyledWeatherInfo>
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
      <img src={`icons/${weather.weather[0].icon}.png`} alt="icon" />
      <h2>{weather.main.temp}C</h2>
    </StyledWeatherInfo>
  );
}

const StyledWeatherInfo = styled.main`
  background-color: ${props => props.theme.colors.gray[7]};
`;

export default WeatherInfo;
