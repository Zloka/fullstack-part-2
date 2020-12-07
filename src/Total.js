const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises
      </b>
    </p>
  );
};

export default Total;