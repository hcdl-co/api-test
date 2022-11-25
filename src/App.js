import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [providerArray, setProviderArray] = useState("");
  const [gotData, setGotData] = useState(false);
  const [locationURLs, getLocationURLs] = useState([])

  const [providerNameList, setProviderNameList] = useState([]);
  const [providerAddressList, setProviderAddressList] = useState([]);
  const [providerPhoneList, setProviderPhoneList] = useState([]);
  const [providerSpecialtyList, setProviderSpecialtyList] = useState([]);

  function showData() {
    console.log(providerArray);
    setGotData(true);
    console.log(locationURLs);
    for (let i = 0; i < providerArray.length; i++) {
      // console.log(providerArray[i].resource.name);
      if(providerArray[i].resource.specialty !== undefined){
      // console.log(providerArray[i].resource.specialty[0].text);
      setProviderSpecialtyList(providerArray[i].resource.specialty[0].text)
      // let special = document.getElementById('specialty');
      // special.innerHTML =providerArray[i].resource.specialty[0].text
    } else {

    }

    }
  }

  function showAddress(e) {

    console.log("e.target.value: " +e.target.value);
    let location = locationURLs[e.target.value];
    console.log("locationURLs[3]: "+locationURLs[3]);
    console.log(" console.log(locationURLs); outside async: " +locationURLs);
    const fetchLocation = async () => {
      try {

        console.log(" console.log(locationURLs); inside async: " +locationURLs);

        let locationLink = `https://public.fhir.flex.optum.com/R4/${location}`;
        const response = await fetch(locationLink);
        const json = await response.json();
        if(locationURLs== [] ){
          getLocationURLs(json.name)
        }
        // getLocationURLs(json.name)
        console.log("json.name: " + json.name);
        e.target.innerHTML = json.name

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
        // console.log(json.entry);
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
          {/* <tr>
            <td>{providerArray[0].resource.name}</td>
            <td><button  value= '0'onClick={showAddress}>Show Address</button></td>
            <td>{providerArray[0].resource.telecom[0].value}</td>
            <td id='specialty'></td>
          
          </tr> */}
     
      { providerArray.map((provider,index) => {

      return (
        <tr>
          <td key={index}>{provider.resource.name}</td>
          <td><button value={index} onClick={showAddress}>Show Address</button></td>
          <td key={index *10}>{provider.resource.telecom[0].value}</td>
        </tr> 
    
    ) }) }
     
     </table>
      </div>


    )

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