import React from 'react';

const Weather = ({ weatherData }) => {
  return (
    // doesn't work without optional chaining (?.)
    <div>
      <b>{weatherData?.name}</b>
      <div>temperature: {weatherData?.main.temp} °C</div>
      <div>feels like: {weatherData?.main.feels_like} °C</div>
      <div>wind: {weatherData?.wind.speed} m/s</div>
      <div>humidity: {weatherData?.main.humidity}%</div>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
        alt={weatherData?.weather[0].description}
      />
      <div>{weatherData?.weather[0].main}</div>
    </div>
  );
};

export default Weather;
