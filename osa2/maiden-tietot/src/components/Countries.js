import React from "react";
import Country from "./Country";
import SingleCountry from "./SingleCountry";

const Countries = ({ countries, filter, weather, handleCountryClick }) => {
  if (countries.length > 10) {
    return <div>too many matches, narrow your search</div>;
  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <div>
        {countries
          .filter((country) => country.name.toLowerCase().includes(filter))
          .map((country) => (
            <Country
              key={country.name}
              country={country}
              handleCountryClick={handleCountryClick}
            />
          ))}
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        {countries
          .filter((country) => country.name.toLowerCase().includes(filter))
          .map((country) => (
            <SingleCountry
              key={country.name}
              country={country}
              weather={weather}
            />
          ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Countries;
