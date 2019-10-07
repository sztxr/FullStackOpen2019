import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('')
  const [icon, setIcon] = useState('')

  const params = {
    access_key: '00355c28ad31cd5e716ba52a5637c517',
    query: capital
  }

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(res => {
        console.log(res.data)
        setWeather(res.data.current)
        setIcon(res.data.current.weather_icons)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <img src={icon} alt={weather.weather_descriptions}/>
      <p><strong>{weather.weather_descriptions}</strong></p>
      <p><strong>Temperature: </strong>{weather.temperature} &deg;C</p>
      <p><strong>Wind: </strong>{weather.wind_speed} km/h &ndash; direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather