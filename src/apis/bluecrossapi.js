
async function bcAPI() {

    // api link here
    let nameQuery = "david";
    let apiLink = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;

    fetch(apiLink)
        .then((res) => {
            console.info(res);
            return res.json();
        })
        .then((pdata) => {
            console.log("Data: ", pdata);
            console.log("Data Entry: ", pdata.entry);
            let providerArr = [];

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
                        if (pdata.entry[i].resource.specialty) {
                            let specialityArr = [];
                            for (let j = 0; j < pdata.entry[i].resource.specialty.length; j++) {
                                specialityArr.push(pdata.entry[i].resource.specialty[j].text);
                            }
                            provider.speciality = specialityArr;
                        }
                        providerArr.push(provider)
                    })

            }
            console.log("ProviderArr: ", providerArr);
        })
}

export default bcAPI;