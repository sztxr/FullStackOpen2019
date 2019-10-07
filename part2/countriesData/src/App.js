import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountryList] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        // console.log(res.data)
        setCountryList(res.data)
      })
  }, [])

  const handleSearch = (e) => {
    // console.log(e.target.value)
    setFilter(e.target.value)
  }

  const filteredCountries = filter === ''
  ? []
  : countries.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  // console.log(filteredCountries)

  return (
    <div>
      <h1>Country Database</h1>
      <Filter value={filter} onChange={handleSearch} />
      <h3>Search Results</h3>
      <CountryList countries={filteredCountries} handleSearch={handleSearch} />
    </div>
  )
}

export default App