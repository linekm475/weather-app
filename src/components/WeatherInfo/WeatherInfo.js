import React from "react";

function WeatherInfo({
  temp,
  icon,
  description,
  rainfall,
  feelsLike,
  country,
  name,
  windSpeed,
  windDeg,
  pressure,
  humidity
}) {
  return (
    <div className="info">
      <img src="" alt="icon" />
      <h2>{temp}C</h2>
    </div>
  );
}

export default WeatherInfo;
