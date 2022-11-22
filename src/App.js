import React, { useEffect, useState } from "react";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [providerList, setProviderList] = useState([]);

  function showData(){
    console.log(advice);
    for(let i = 0; i<advice.length; i++) {
      console.log(advice[i].resource.name)
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
        setAdvice(json.entry);

  
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    // console.log(provider);
  }, []);

  return (
    <div>
      {/* <p>{advice}</p> */}
      {/* {addressList.map((address, i) => {
        return <p key={i}>{address}</p>
      })

      } */}
  <button onClick={showData}>Show Data</button>
    </div>
  );
};

export default App;