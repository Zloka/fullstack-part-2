import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Country from './Country';

const App = () => {
  const [ search, setSearch ] = useState(''); 
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(resp => {
      setCountries(resp.data);
    })
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
  const numCountries = filteredCountries.length;

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} /> 
        {search.length > 0
          ? numCountries >= 10
            ? <div>Too many matches, specify another filter</div>
            : numCountries > 1
              ? filteredCountries.map(country => <div key={country.name}>
                {country.name}
                <button onClick={() => setSearch(country.name)}>show</button>
                </div>)
              : numCountries === 1
                ? <Country country={filteredCountries[0]} />
                : <div>No countries found, try another filter.</div>
          : <div>Specify a filter.</div>} 
    </div>
  )
}

export default App