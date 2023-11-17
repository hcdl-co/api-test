import React, { useState, useRef } from "react";

const UnitedAPI = () => {
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const npiRef = useRef();

  const [showUnited, setShowUnited] = useState(false);

  const handleShowInsurer = () => {
    setShowUnited(!showUnited);
    const fetchData = async () => {
      try {
        // initial response
        const response = await fetch(
          `https://public.fhir.flex.optum.com/R4/Practitioner?family=Gabbard&given=Julian&identifier=1134198609`
        );
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  const search = () => {
    let searchCriteria = "";

    let lastName = lastNameRef.current.value;
    let firstName = firstNameRef.current.value;
    let npi = npiRef.current.value;

    let countValues = 0;

    if (lastName) {
      countValues = countValues + 1;
      lastName = "family=" + lastName;
    }

    if (firstName) {
      countValues = countValues + 1;
      firstName = "given=" + firstName;
    }

    if (npi) {
      countValues = countValues + 1;
      npi = "identifier=" + npi;
    }

    if (countValues === 1) {
      searchCriteria = lastName + firstName + npi;
    } else if (countValues === 2 || countValues === 3) {
      searchCriteria = lastName + "&" + firstName + "&" + npi;
      console.log(searchCriteria);
    }

    const fetchData = async () => {
      try {
        // initial response
        const response = await fetch(
          `https://public.fhir.flex.optum.com/R4/Practitioner?${searchCriteria}`
        );
        const json = await response.json();
        console.log(json.entry[0].resource);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <div>
      <input
        name="lastName"
        placeholder="search by last name"
        ref={lastNameRef}
      />
      <input
        name="firstName"
        placeholder="search by first name"
        ref={firstNameRef}
      />
      <input name="npi" placeholder="search by npi" ref={npiRef} />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default UnitedAPI;
