import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [providerArray, setProviderArray] = useState("");
  const [gotData, setGotData] = useState(false);
  const [locationURLs, getLocationURLs] = useState([])

  function showData() {
    console.log(providerArray);
    setGotData(true);
    console.log(locationURLs);
    for (let i = 0; i < providerArray.length; i++) {
      console.log(providerArray[i].resource.name);
      if(providerArray[i].resource.specialty !== undefined){
      console.log(providerArray[i].resource.specialty[0].text)}

    }
  }

  function showAddress() {

    
      const fetchLocation = async () => {
        try {
          // locationURLs.forEach((location ) => {
            let location = locationURLs[0];
            let locationLink = `https://public.fhir.flex.optum.com/R4/${location}`;
          const response = await fetch(locationLink);
          const json = await response.json();
          console.log(json.name); 
        // })
  
        } catch (error) {
          console.log("error", error);
        }
      }; 
  
      fetchLocation();
  
      // console.log(providerArray);
  
  }


  useEffect(() => {
    let nameQuery = "john";
    let url = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.entry);
        setProviderArray(json.entry);
        let locURLArray =[];
        json.entry.forEach(provider => locURLArray.push(provider.resource.location[0].reference))
        getLocationURLs(locURLArray);
      } catch (error) {
        console.log("error", error);
      }
    };
 
    fetchData();

  }, []);



  if (gotData === true) {
    return (
      <div>
        <table>
          <tr>
            <th>name</th>
            <th>address</th>
            <th>phone number</th>
            <th>specialty</th>
          </tr>
          <tr>
            <td>{providerArray[0].resource.name}</td>
            <td><button onClick={showAddress}>Show Address</button></td>
            <td>{providerArray[0].resource.telecom[0].value}</td>
            {/* <td>{providerArray[0].resource.specialty}</td> */}
          </tr>
        </table>

      </div>


    )
    // providerArray.map((provider,index) => {
    //   return (
    // <div><h3 key={index}>{provider.resource.name}</h3> </div>) })
  } else {
    return (
      <div>  <button onClick={showData}>Show Data</button></div>
    )
  }
  //   return (
  //     <div>
  //       {/* <p>{providerArray}</p> */}
  //       {/* {addressList.map((address, i) => {
  //         return <p key={i}>{address}</p>
  //       })

  //       } */}
  //   <button onClick={showData}>Show Data</button>

  //   {gotData ? (
  // providerArray.map((provider, i) => {
  //   return (
  // <div><p>{provider[i].resource.name}</p> </div>
  //   )
  // })
  //   ): (<p>{gotData}</p>)}
  //     </div>
  //   );
};

export default App;