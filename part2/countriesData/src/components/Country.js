import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;

  return (
    <article>
      <h2>{name}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population}</p>
      <p><strong>Languages:</strong></p>
      <ul>{languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
      <img src={flag} alt={`${name}'s' flag`} height="100"/>
      <Weather capital={capital} />
    </article>
  )
}

export default Country