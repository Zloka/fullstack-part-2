const Persons = ({ persons, filter, onDeleteClick }) => {
  return (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => {
      return (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => onDeleteClick(person.id)}>delete</button>
        </div>
      );
    })}
    </>
  )
}

export default Persons;
