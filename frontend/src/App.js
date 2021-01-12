import logo from "./logo.svg";
import "./App.css";

let turtles = [];

async function fetchTurtles() {
  let r = await fetch("http://localhost:6969/api/turtles", {
    method: "get",
  });
  turtles = await r.json();
}

function createPanels() {}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
