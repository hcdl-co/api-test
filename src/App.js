import React, { useEffect, useState } from "react";

const App = () => {
    const [advice, setAdvice] = useState("");

    useEffect(() => {
      let nameQuery = "john";
      let url = `https://public.fhir.flex.optum.com/R4/HealthcareService?service-category=prov&name=${nameQuery}`;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json.entry);

                for(let i = 0; i < json.entry.length)


                setAdvice(JSON.stringify(json.entry));

            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>{advice}</p>
        </div>
    );
};

export default App;