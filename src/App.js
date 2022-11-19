import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import API from "./utils/BlueCross_API";

function ShowResponse(res) {
  let providerList = [res]
  console.log(providerList[0][0])
 
if (res) {

  console.log(res.name);
  console.log(res.length);
  console.log(res.type);
  // return (
  //   <p>{res}</p>
  // )
}



// }
}


export default function App() {


  const searchProviders = async () => {
   await API.getProviders().then (res => {
    // ShowResponse(res);
    console.log(res)
    console.log(res.length)
   }
    )
  
  }

  useEffect(() =>
    searchProviders
  )

 

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
      <button onClick={searchProviders}>Test</button>
        {/* <div className="flex-grid">
          <div className="col">This little piggy went to market.</div>
          <div className="col">This little piggy stayed home.</div>
          <div className="col">This little piggy had roast beef.</div>
        </div> */}
     
    
          <ShowResponse/>

        

        
      
        <div className="flex-grid">
          <div className="col">This little piggy went to market.</div>
          <div className="col">This little piggy stayed home.</div>
          <div className="col">This little piggy had roast beef.</div>
          <div className="col">This little piggy had none.</div>
          <div className="col">This little piggy went wee wee wee all the way home.</div>
        </div>

        {/* <div className="flex-grid-thirds">
          <div className="col">This little piggy went to market.</div>
          <div className="col">This little piggy stayed home.</div>
          <div className="col">This little piggy had roast beef.</div>
        </div> */}
      </main>

    </div>
  );
}


