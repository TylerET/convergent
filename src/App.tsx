import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button href="https://mui.com/" target="_blank">
          Material Ui
        </Button>
        <Button href="https://react-bootstrap.netlify.app/" target="_blank">
          React Bootstrap
        </Button>
      </header>
    </div>
  );
}

export default App;
