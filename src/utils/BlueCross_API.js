import React, { useState, useEffect } from 'react'



const API = {
    
    getProviders: async function() {
    let nameQuery = "john";
    let apiLink = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;
    let providerArr = [];
    fetch(apiLink)
        .then((res) => {
            // console.info(res.json());
            return res.json();
        })
        .then((allProvider) => {
            // console.log("Data: ", allProvider);
            // console.log("Data Entry: ", allProvider.entry);
        

            for (let i = 0; i < allProvider.entry.length; i++) {
                let locationQuery = allProvider.entry[i].resource.location[0].reference;
                let locationLink = `https://public.fhir.flex.optum.com/R4/${locationQuery}`;
                fetch(locationLink)
                    .then((res) => {
                        //console.info(res);
                        return res.json();
                    })
                    .then((ldata) => {
                        let provider = {
                            name: allProvider.entry[i].resource.name,
                            telephone: allProvider.entry[i].resource.telecom,
                            role: allProvider.entry[i].resource.category[0].coding[0].display,
                            address: ldata.address.text
                        }
                        localStorage.setItem(
                            JSON.stringify(provider.name),
                             [
                                JSON.stringify(provider.name),
                                JSON.stringify(allProvider.entry[i].resource.telecom[0].value),
                                JSON.stringify(allProvider.entry[i].resource.category[0].coding[0].display),
                                JSON.stringify(ldata.address.text),
                                JSON.stringify(allProvider.entry[i].resource.specialty)
                            ])
                   
                        providerArr.push(provider);
               
                    })
                   
            }
            
           
        })
        return providerArr;
    }
   
}


export default API;