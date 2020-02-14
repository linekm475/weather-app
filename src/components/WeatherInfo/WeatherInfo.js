import React from "react";
import "./WeatherInfo.css";

function WeatherInfo({ weather, handleSubmit, updateSearch, search }) {
  // checka ifall APIen skicka tillbaka data om nederbörd, annars är nederbörd 0
  let rainfall = 0;
  if (weather.rain && (weather.rain["3h"] || weather.rain["3h"])) {
    rainfall = weather.rain["3h"] || weather.rain["3h"];
  }

  return (
    <main className="weather">
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
    </main>
  );
}

export default WeatherInfo;
