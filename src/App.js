import React, { useEffect, useState } from "react";

const App = () => {
  const [advice, setAdvice] = useState("");
const [addressList, setAddressList] = useState([]);
const [providerList, setProviderList] = useState("");

let addressArray = [];
let providerArray = [];
  useEffect(() => {
    let nameQuery = "john";
    let url = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.entry);
        setAdvice(JSON.stringify(json.entry));
     
        for (let i = 0; i < json.entry.length; i++) {
          providerArray.push(i, json.entry[i].resource.name,json.entry[i].resource.telecom[0].value, json.entry[i].resource.specialty)
      
           console.log(providerArray)
   


          let locationQuery = json.entry[i].resource.location[0].reference;
          let locationLink = `https://public.fhir.flex.optum.com/R4/${locationQuery}`;
          // const fetchLocation = async () => {
          //   try {
          //     const locationResponse = await fetch(locationLink);
          //     const locHolder = await locationResponse.json();
          //     console.log(locHolder.address.text);
             
          //     addressArray.push(locHolder.address.text);
          //     console.log(addressArray.length)
          //     setAddressList(addressArray)
          // // console.log(addressArray);
          // // setAddressList(addressArray);
         
          //   } catch (error) {
          //     console.log("error", error);
          //   }
          //   return addressArray
          // };
        
          // fetchLocation();
        return providerArray
    
        }
        setProviderList(JSON.stringify(providerArray));
        console.log(providerList);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    // console.log(provider);
  }, []);

  return (
    <div>
      <p>{advice}</p>
      {/* {addressList.map((address, i) => {
        return <p key={i}>{address}</p>
      })

      } */}

    </div>
  );
};

export default App;