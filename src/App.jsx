import "./App.scss";
import Table from "./Components/Table";

function App() {
  return (
    <div className="App">
      <div className="square-container">
        <h1 className="big-title">Tic tac toe</h1>
        <Table></Table>
      </div>
    </div>
  );
}

export default App;
