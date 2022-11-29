import React, { useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [providerArray, setProviderArray] = useState([]);

  const [locationURLs, getLocationURLs] = useState([])
  const [providerSpecialtyList, setProviderSpecialtyList] = useState([]);
  const [totalFound, getTotalFound] = useState(0);
  const [buttonClicked, setButtonClicked] = React.useState(false)
  const nameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalRef = useRef();

  function sortCriteria() {

    let name = nameRef.current.value;
    let city = cityRef.current.value;
    let state = stateRef.current.value;
    let postalCode = postalRef.current.value;
    let searchCriteria = ''
    let nameCriteria = '&name=' + name
    let cityCriteria = '&location.address-city=' + city
    let stateCriteria = '&location.address-state=' + state
    let postalCriteria = '&location.address-postalcode=' + postalCode


    if (name !== '') {
      searchCriteria = searchCriteria + nameCriteria
    }

    if (city !== '') {
      searchCriteria = searchCriteria + cityCriteria
    }

    if (state !== '') {
      searchCriteria = searchCriteria + stateCriteria
    }
    if (postalCode !== '') {
      searchCriteria = searchCriteria + postalCriteria
    }

    getDatData(searchCriteria)


  }
// this function gets the data from the api and then sorts it out into an array
  function getDatData(query) {
    setButtonClicked(true)

    let url = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&${query}`;
    const fetchData = async () => {
      try {
        // initial response
        const response = await fetch(url);
        const json = await response.json();
        // get the number of search results and the results and save them as states
        getTotalFound(json.total);
        setProviderArray(json.entry);

        // this gets the location reference numbers for all the providers 
        let locURLArray = [];
        json.entry.forEach(provider => locURLArray.push(provider.resource.location[0].reference))
        getLocationURLs(locURLArray);
        // gets the specialty data if it exists
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



// when someone clicks the "show address" button this query will take the location reference and query it separately
  function showAddress(e) {
    //we use the index number of the main provider search to get the location - having set it to the value of the output
    let location = locationURLs[e.target.value];

    const fetchLocation = async () => {
      try {

        let locationLink = `https://public.fhir.flex.optum.com/R4/${location}`;
        const response = await fetch(locationLink);
        const json = await response.json();
        //we don't want to get the location data if it didn't get anything so we wrapped it in an if statement
        if (locationURLs === []) {
          getLocationURLs(json.name)
        }
        //change the button to display the address
        e.target.innerHTML = json.name

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchLocation();

  }





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>United Healthcare Providers</h1>
        <p>brought to you by healthcare Download. Get in control, stay in control.</p></header>

      <input
        name="name"
        placeholder="search by name"
        ref={nameRef}
        id="searchInput"
      />
      <input
        name="city"
        placeholder="search by city"
        ref={cityRef}
        id="searchInput"
      />
      <input
        name="state"
        placeholder="search by state"
        ref={stateRef}
        id="searchInput"
      />
      <input
        name="search"
        placeholder="search by postal code"
        ref={postalRef}
        id="searchInput"
      />

      <button onClick={sortCriteria}>Find A Doctor</button>
      {totalFound === 0 && buttonClicked ? (
        <p>We didn't find anything that matched that search criteria</p>
      ) : null}
      {totalFound > 10 ? (<p>We found {totalFound} results matching that criteria, consider refining your search</p>) : null}
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
              <tbody key={provider.fullUrl}>
                <tr>

                  <td key={provider.resource.name}>{provider.resource.name}</td>
                  <td key={providerSpecialtyList[index]}>{providerSpecialtyList[index]}</td>
                  <td key={provider.resource.telecom[0].value}>{provider.resource.telecom[0].value}</td>
                  <td><button key={index} value={index} onClick={showAddress}>Show Address</button></td>
                </tr>

              </tbody>

            )
          })
          }

        </table>
      ) : null}
 
      {providerArray === undefined ? (
        <div>
          <p>Sorry, your search did not work, please try again or notify our team  at info@healthcareDL.com</p>
        </div>
      ) : null}

    </div>


  )


};

export default App;