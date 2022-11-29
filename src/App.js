import React, { useEffect, useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [providerArray, setProviderArray] = useState([]);
  const [gotData, setGotData] = useState(false);
  const [locationURLs, getLocationURLs] = useState([])
  const [providerSpecialtyList, setProviderSpecialtyList] = useState([]);


  const searchRef = useRef();

console.log(providerArray)

const blank = providerArray;
  function searchLocationPostalCode() {
    console.log(providerArray);
    setGotData(true);
    console.log(searchRef.current.value)

    let postalCode = searchRef.current.value
    let url = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&location.address-postalcode=${postalCode}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setProviderArray(json.entry);

        let locURLArray = [];
        json.entry.forEach(provider => locURLArray.push(provider.resource.location[0].reference))
        getLocationURLs(locURLArray);

        let specialtyArray = [];
        json.entry.forEach(provider => {

          if (provider.resource.specialty) {
            specialtyArray.push(provider.resource.specialty[0].text)
          } else {
            specialtyArray.push('Not Available')
          }
          setProviderSpecialtyList(specialtyArray);
        })
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }

  function showData() {
    console.log(providerArray);
    setGotData(true);
    console.log(searchRef.current.value)
    let nameQuery = searchRef.current.value;
    let url = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setProviderArray(json.entry);

        let locURLArray = [];
        json.entry.forEach(provider => locURLArray.push(provider.resource.location[0].reference))
        getLocationURLs(locURLArray);

        let specialtyArray = [];
        json.entry.forEach(provider => {

          if (provider.resource.specialty) {
            specialtyArray.push(provider.resource.specialty[0].text)
          } else {
            specialtyArray.push('Not Available')
          }
          setProviderSpecialtyList(specialtyArray);
        })

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }



  function showAddress(e) {

    let location = locationURLs[e.target.value];

    const fetchLocation = async () => {
      try {

        let locationLink = `https://public.fhir.flex.optum.com/R4/${location}`;
        const response = await fetch(locationLink);
        const json = await response.json();
        if (locationURLs === []) {
          getLocationURLs(json.name)
        }

        e.target.innerHTML = json.name

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchLocation();

  }



  // if (gotData === true) {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>United Healthcare Providers</h1>
          <p>brought to you by healthcare Download. Get in control, stay in control.</p></header>
        
          <input
            name="search"
            placeholder="search for another provider"
            ref={searchRef}
            id="searchInput"
          />
          <button onClick={showData}>Search Name</button>
          <button onClick={searchLocationPostalCode}> Search by Postal Code</button>


          {providerArray !== undefined && providerArray.length ? (
       
            <table>
          <thead>
    <tr>
              <th>NAME</th>
              <th>SPECIALTY</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              </tr>
              </thead>
            
            {providerArray.map((provider, index) => {

            return (
              <tbody key={provider}>
                  <tr>

                <td key={index+ 1}>{provider.resource.name}</td>
                <td key={index  + 10}>{providerSpecialtyList[index]}</td>
                <td key={index * 10}>{provider.resource.telecom[0].value}</td>
                <td><button key={index / 10} value={index} onClick={showAddress}>Show Address</button></td>
                </tr>

              </tbody>

            )
          })
        }
        
        </table>
          ) :(<div><p>Sorry, your search did not work, please try again or notify our team  at info@healthDL.com</p></div>)}

      </div>


    )

  // } else {
  //   return (

  //     <div className="App">
  //       <header className="App-header">
  //         <h1>Search for a United Healthcare Provider</h1>
  //         <p>brought to you by Healthcare Download. Get in control, stay in control.</p>
  //       </header>
  //       <main>
  //         <input
  //           name="search"
  //           placeholder="provider last name"
  //           ref={searchRef}
  //           id="searchInput"
 
  //         />
  //         <button onClick={showData}>Show Data</button>
  //         <button onClick={searchLocationPostalCode}> Search By Postal Code</button>
  //       </main>
  //     </div>
  //   )
  // }
};

export default App;