import React, { useEffect, useState } from "react";

const App = () => {
  const [providerArray, setProviderArray] = useState("");
  const [gotData, setGotData] = useState(false);


  function showData() {
    console.log(providerArray);
    setGotData(true);

    for (let i = 0; i < providerArray.length; i++) {
      console.log(providerArray[i].resource.name);
      if(providerArray[i].resource.specialty !== undefined){
      console.log(providerArray[i].resource.specialty[0].text)}

    }
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


      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

    // console.log(providerArray);
  }, []);


  if (gotData === true) {
    return (
      <div>
        <p>{providerArray[0].resource.name}</p>
        <table>
          <tr>
            <th>name</th>
            <th>address</th>
            <th>phone number</th>
            <th>specialty</th>
          </tr>
          <tr>
            <td>{providerArray[0].resource.name}</td>
            <td><p>naah</p></td>
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