import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <Filter
        name="find country"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
