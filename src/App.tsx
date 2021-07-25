import React from 'react';
import './App.css';
import './assets/scss/main.scss';
import ColorList from "./pages/ColorList";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Hello</h1>
        <ColorList />
      </div>
    </div>
  );
}

export default App;
