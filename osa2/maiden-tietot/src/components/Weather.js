import React from "react";

const Weather = ({ weather }) => {
  return (
    <div>
      <img src={weather?.current.weather_icons} alt="weather icon" />
      <div>temperature: {weather?.current.temperature}°C</div>
      <div>
        wind: {weather?.current.wind_speed} mph direction {" "}
        {weather?.current.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
