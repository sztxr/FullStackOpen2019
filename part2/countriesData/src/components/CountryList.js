import React from 'react'
import Country from './Country'

const CountryList = ({ countries, handleSearch }) => {
  const countryList = () => countries.map(c =>
    <div key={c.numericCode}>{c.name} <button value={c.name} onClick={handleSearch}>+</button></div>
  )

  if (countries.length === 1) return <Country country={countries[0]} />
  if (countries.length < 10) return <>{countryList()}</>
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  return <></> // if countries.length === 0
}

export default CountryList