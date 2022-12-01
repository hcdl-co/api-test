import React, { useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [providerArray, setProviderArray] = useState([]);

  const [locationURLs, getLocationURLs] = useState([])
  const [providerSpecialtyList, setProviderSpecialtyList] = useState([]);
  const [totalFound, getTotalFound] = useState(0);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [resultTracker, setResultTracker] = useState(0);
  const [searchHolder, setSearchHolder] = useState([]);
  const [noResultsCall, setNoResultsCall] = useState(false)

  const nameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalRef = useRef();

  function handleChange(e) {
    e.preventDefault();
    // it's a new search we need to reset the arrays
    setProviderArray([]);
    getLocationURLs([]);
    setProviderSpecialtyList([]);
    setSearchHolder([]);
    setButtonClicked(false);
    getTotalFound(0);
    setResultTracker(0);
    setNoResultsCall(false);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function delayedGreeting(e) {

    await sleep(5000)
    setNoResultsCall(true);



  }


  function sortCriteria() {

    delayedGreeting();

    let name = nameRef.current.value;
    let city = cityRef.current.value;
    let state = stateRef.current.value;
    let postalCode = postalRef.current.value;

    let searchCriteria = ''
    let nameCriteria = '&name=' + name
    let cityCriteria = '&location.address-city=' + city
    let stateCriteria = '&location.address-state=' + state
    let postalCriteria = '&location.address-postalcode=' + postalCode
    // let specialty = '&specialty=207Q00000X'

    // let internal = '207RG0100X'
    // let derma = '207N00000X'
    // let family = '207Q00000X'
    if (name !== '') {
      searchCriteria = searchCriteria + nameCriteria
    }

    if (city !== '') {
      searchCriteria = searchCriteria + cityCriteria
    }

    if (state !== '') {
      console.log(state);
      searchCriteria = searchCriteria + stateCriteria
    }
    if (postalCode !== '') {
      searchCriteria = searchCriteria + postalCriteria
    }
    let FirstQuery = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov${searchCriteria}`;
    getDatData(FirstQuery)


  }


  // this function gets the data from the api and then sorts it out into an array
  function getDatData(query) {

    
    //why is this here??? what does it do?
    setSearchHolder(searchHolder => [...searchHolder, query])

    let url = query

    const fetchData = async () => {
      setButtonClicked(true)
      try {
     
        // initial response
        const response = await fetch(url);
        const json = await response.json();
        DataTracking(json);
   
        setProviderArray([...providerArray, ...json.entry]);
        
        orgDisplay(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }

  //gets all the data tracking states: total results, queries, and amount of data returned/displayed
function DataTracking(json) {
    //adding to an array
    if (json.link[1]) {
      let next = json.link[1].url
      setSearchHolder(searchHolder => [...searchHolder, next]);
    }
    getTotalFound(json.total);
    setResultTracker(resultTracker + json.entry.length)
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
        if(json.name) {
          e.target.innerHTML = json.name
        } else {
          e.target.innerHTML = "Not Available"
        }
 

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchLocation();

  }
// there was some weirdness with getting these two
  function orgDisplay(json) {

    // this gets the location reference numbers for all the providers and puts them into the locationURLS state to be used later
    let locURLArray = [];
    json.entry.forEach(provider => locURLArray.push(provider.resource.location[0].reference))
    getLocationURLs([...locationURLs, ...locURLArray]);


    // gets the specialty data if it exists
    let specialtyArray = [];
    json.entry.forEach(provider => {

      if (provider.resource.specialty) {
        specialtyArray.push(provider.resource.specialty[0].text)
      } else {
        specialtyArray.push('Not Available')
      }
      //merging arrays
      setProviderSpecialtyList([...providerSpecialtyList, ...specialtyArray]);
    })

  }
  function next() {

    getDatData(searchHolder[searchHolder.length - 1])

  }


  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <h1>United Healthcare Providers</h1>
        <p>brought to you by healthcare Download.
          Get in control, stay in control.</p>
      </header>

      <input
        name="name"
        placeholder="search by last name"
        ref={nameRef}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="search by city"
        ref={cityRef}
        onChange={handleChange}
      />
      <input
        name="state"
        placeholder="search by state abb. "
        ref={stateRef}
        onChange={handleChange}
      />
      <input
        name="postalcode"
        placeholder="search by postal code"
        ref={postalRef}
        onChange={handleChange}
      />

      <button onClick={sortCriteria}>Find A Doctor</button>
      {/* this doesn't work like it should */}
      {buttonClicked && totalFound === 0 && noResultsCall ? (
        <div>
          <p className="notfound">We didn't find anything that matched that search criteria</p>
        </div>
      ) : null}

      {totalFound > 0 ? (
        <p>We found {totalFound} results matching that criteria.
          Showing {resultTracker} results.</p>
      ) : null}
      {providerArray !== undefined && providerArray.length ? (
        <div>
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
          {
            searchHolder !== undefined && searchHolder.length > 1 ? (
              <button
                className="showButton"
                onClick={next}
              >Show More Results
              </button>
            ) : null}

        </div>
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