import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState();
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${country.capital}`)
      .then(resp => {
        setWeatherData(resp.data.current);
      })
  }, [country, WEATHER_API_KEY])

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>
      <img src={country.flag} width={200} height={100} alt="Failed to load flag" />
      {weatherData ? (
        <>
        <h3>Weather in {country.capital}</h3>
        <div>
          <b>
            temperature: 
          </b>
          {` ${weatherData.temperature} Celcius`}
        </div>
        {weatherData.weather_icons.length > 0 ? <div><img src={weatherData.weather_icons[0]} alt="Failed to load" /></div> : null}
        <div>
          <b>
            wind: 
          </b>
          {` ${weatherData.wind_speed} mph direction ${weatherData.wind_dir}`}
        </div>
        </>
      ) : null}
    </div>
  );
}

export default Country;