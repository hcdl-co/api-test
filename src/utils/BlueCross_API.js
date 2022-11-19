// import React, { useState, useEffect } from 'react'
// export default function () {


const API = {
    
    getProviders: async function() {
    let nameQuery = "david";
    let apiLink = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;
    let providerArr = [];
    fetch(apiLink)
        .then((res) => {
            // console.info(res.json());
            return res.json();
        })
        .then((pdata) => {
            console.log("Data: ", pdata);
            console.log("Data Entry: ", pdata.entry);
        

            for (let i = 0; i < pdata.entry.length; i++) {
                let locationQuery = pdata.entry[i].resource.location[0].reference;
                let locationLink = `https://public.fhir.flex.optum.com/R4/${locationQuery}`;
                fetch(locationLink)
                    .then((res) => {
                        //console.info(res);
                        return res.json();
                    })
                    .then((ldata) => {
                        let provider = {
                            name: pdata.entry[i].resource.name,
                            telephone: pdata.entry[i].resource.telecom,
                            role: pdata.entry[i].resource.category[0].coding[0].display,
                            address: ldata.address.text
                        }
                        localStorage.setItem(JSON.stringify(provider.name), [JSON.stringify(provider.name)])
                        if (pdata.entry[i].resource.specialty) {
                            let specialityArr = [];
                            for (let j = 0; j < pdata.entry[i].resource.specialty.length; j++) {
                                specialityArr.push(pdata.entry[i].resource.specialty[j].text);
                            }
                            provider.speciality = specialityArr;
                        }
                        providerArr.push(provider);
                         console.log(providerArr[0].name);
                        // return providerArr;
                        // localStorage.setItem(JSON.stringify(providerArr[i].name));
                    })
                   
            }
            
          
        })
        return providerArr;
    }
   
}

// async function bcAPI() {

//     // api link here
//     let nameQuery = "david";
//     let apiLink = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;

//     fetch(apiLink)
//         .then((res) => {
//             console.info(res);
//             return res.json();
//         })
//         .then((pdata) => {
//             console.log("Data: ", pdata);
//             console.log("Data Entry: ", pdata.entry);
//             let providerArr = [];

//             for (let i = 0; i < pdata.entry.length; i++) {
//                 let locationQuery = pdata.entry[i].resource.location[0].reference;
//                 let locationLink = `https://public.fhir.flex.optum.com/R4/${locationQuery}`;
//                 fetch(locationLink)
//                     .then((res) => {
//                         //console.info(res);
//                         return res.json();
//                     })
//                     .then((ldata) => {
//                         let provider = {
//                             name: pdata.entry[i].resource.name,
//                             telephone: pdata.entry[i].resource.telecom,
//                             role: pdata.entry[i].resource.category[0].coding[0].display,
//                             address: ldata.address.text
//                         }
//                         localStorage.setItem(JSON.stringify(provider.name), [JSON.stringify(provider.name)])
//                         if (pdata.entry[i].resource.specialty) {
//                             let specialityArr = [];
//                             for (let j = 0; j < pdata.entry[i].resource.specialty.length; j++) {
//                                 specialityArr.push(pdata.entry[i].resource.specialty[j].text);
//                             }
//                             provider.speciality = specialityArr;
//                         }
//                         providerArr.push(provider)
//                         // localStorage.setItem(JSON.stringify(providerArr[i].name));
//                     })

//             }
            
//             console.log("ProviderArr: ", providerArr[0]);
//         })
// }

export default API;