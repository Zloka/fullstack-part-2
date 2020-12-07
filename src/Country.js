const Country = ({ country }) => {
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
    </div>
  );
}

export default Country;