import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import UnitedAPI from "./APIs/UnitedAPI";

const App = () => {
  const [showUnited, setShowUnited] = useState(false);

  const handleShowInsurer = () => {
    setShowUnited(!showUnited);
    const fetchData = async () => {
      try {
        // initial response
        const response = await fetch(
          `https://public.fhir.flex.optum.com/R4/Practitioner?family=Gabbard&given=Julian&identifier=1134198609`
        );
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo " alt="logo" />
        <p>
          brought to you by healthcare Download. Get in control, stay in
          control.
        </p>
      </header>

      <button onClick={handleShowInsurer}>United</button>
      {showUnited ? <UnitedAPI /> : null}
    </div>
  );
};

export default App;
