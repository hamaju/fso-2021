import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      if (filter !== "") {
        const results = response.data.filter((country) =>
          country.name.toLowerCase().includes(filter.toLocaleLowerCase())
        );

        setCountries(results);
      }
    });
  }, [filter]);

  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital;
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [countries]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleCountryClick = (countryToShow) => {
    setFilter(countryToShow.toLowerCase());
  };

  return (
    <div>
      <Filter
        name="find country"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countries}
        filter={filter}
        weather={weather}
        handleCountryClick={handleCountryClick}
      />
    </div>
  );
};

export default App;
