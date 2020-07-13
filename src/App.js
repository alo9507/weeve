import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-wrapper">
        {props.children}
      </div>
    </div>
  );
};

export default App;
