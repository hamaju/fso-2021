import React from "react";
import Weather from "./Weather";

const SingleCountry = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <img src={country.flag} width={200} alt={country.name} />
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <h3>Weather</h3>
      <Weather weather={weather} />
    </div>
  );
};

export default SingleCountry;
