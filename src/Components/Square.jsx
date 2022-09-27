export default function Square({ step, value, click }) {
  return (
    <>
      <div className="square" onClick={click}>
        {value}
      </div>
    </>
  );
}
