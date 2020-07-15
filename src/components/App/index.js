import React from "react";
import "./style.css";

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
