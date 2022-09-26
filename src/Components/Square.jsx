export default function Square({ step, value, click }) {
  return (
    <>
      <button className="square" onClick={click}>
        {value}
      </button>
    </>
  );
}
