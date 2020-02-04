import React from "react";

function WeatherInfo({ weather, handleSubmit, updateSearch, search }) {
  return (
    <div className="info">
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
      <img src={`icons/${weather.icon}.png`} alt="icon" />
      <h2>{weather.temp}C</h2>
    </div>
  );
}

export default WeatherInfo;
