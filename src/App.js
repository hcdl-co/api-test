import React from 'react';
import logo from './logo.svg';
import './App.css';
import bcAPI from "./apis/bluecrossapi";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex-grid">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 >Healthcare Download</h3>
        </div>
        <h5>Api Tester</h5>
      </header>


      <main>
        <div className="flex-grid">
          <div className="col">This little piggy went to market.</div>
          <div className="col">This little piggy stayed home.</div>
          <div className="col">This little piggy had roast beef.</div>
        </div>

        <div className="flex-grid">
          <div className="col">This little piggy went to market.</div>
          <div className="col">This little piggy stayed home.</div>
          <div className="col">This little piggy had roast beef.</div>
          <div className="col">This little piggy had none.</div>
          <div className="col">This little piggy went wee wee wee all the way home.</div>
        </div>

        <div className="flex-grid-thirds">
          <div className="col">This little piggy went to market.</div>
          <div className="col">This little piggy stayed home.</div>
          <div className="col">This little piggy had roast beef.</div>
        </div>
      </main>
      <button onClick={bcAPI()}>Test</button>
    </div>
  );
}


