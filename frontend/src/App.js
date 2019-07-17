import React from 'react';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <Home />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
