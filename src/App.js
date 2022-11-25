import React, { useEffect, useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [providerArray, setProviderArray] = useState([]);
  const [gotData, setGotData] = useState(false);
  const [locationURLs, getLocationURLs] = useState([])
  const [providerSpecialtyList, setProviderSpecialtyList] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');

  const searchRef = useRef();

  function handleChange(e) {
    console.log(e.target.innerHTML)
    // if (e.target.files) {
    //     setState({ ...newInfo, [e.target.name]: e.target.files[0] });
    // } else {
    //     setState({ ...newInfo, [e.target.name]: e.target.value });
    // }
  }

  function showData() {
    console.log(providerArray);
    setGotData(true);
    console.log(searchRef.current.value)
    setCurrentSearch(searchRef.current.value);


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



  if (gotData === true) {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>United Healthcare Providers</h1>
          <p>brought to you by healthcare Download. Get in control, stay in control</p></header>
        
          <input
            name="search"
            placeholder="search for another provider"
            ref={searchRef}
            id="searchInput"
            onChange={handleChange}
          />
          <button onClick={showData}>Show Data</button>

        <table>
          <tr>
            <th>NAME</th>
            <th>SPECIALTY</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
          </tr>



          {providerArray.map((provider, index) => {

            return (
              <tbody key={provider}>
                <td key={index}>{provider.resource.name}</td>
                <td key={index / 5}>{providerSpecialtyList[index]}</td>
                <td key={index * 10}>{provider.resource.telecom[0].value}</td>
                <td><button key={index / 10} value={index} onClick={showAddress}>Show Address</button></td>


              </tbody>

            )
          })}

        </table>
      </div>


    )

  } else {
    return (

      <div className="App">
        <header className="App-header">
          <h1>Search for a United Healthcare Provider</h1>
          <p>brought to you by Healthcare Download. Get in control, stay in control.</p>
        </header>
        <main>
          <input
            name="search"
            placeholder="search for a provider"
            ref={searchRef}
            id="searchInput"
            onChange={handleChange}
          />
          <button onClick={showData}>Show Data</button>
        </main>
      </div>
    )
  }
};

export default App;