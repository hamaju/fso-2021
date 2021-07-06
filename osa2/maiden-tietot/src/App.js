import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      if (filter !== '') {
        const results = response.data.filter((country) =>
          country.name.toLowerCase().includes(filter.toLocaleLowerCase())
        )

        setCountries(results)
      }
    })
  }, [filter])

  useEffect(() => {
    if (countries.length === 1) {
      const api_key = process.env.REACT_APP_API_KEY
      const capital = countries[0].capital

      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
        )
        .then((res) => {
          setWeatherData(res.data)
        })
    }
  }, [countries])

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  const handleCountryClick = (countryToShow) => {
    setFilter(countryToShow.toLowerCase())
  }

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
        weatherData={weatherData}
        handleCountryClick={handleCountryClick}
      />
    </div>
  )
}

export default App
