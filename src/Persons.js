const Persons = ({ persons, filter }) => {
  return (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => {
      return <div key={person.name}>{person.name} {person.number}</div>
    })}
    </>
  )
}

export default Persons;
