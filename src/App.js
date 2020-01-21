import React from "react";

import "./App.css";

// Components
import Navbar from "./components/NavBar.js";
import Record from "./components/Sound.js";
import Example from "./components/Record";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Example />
    </div>
  );
}

export default App;
