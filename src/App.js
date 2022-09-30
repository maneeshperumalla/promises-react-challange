import React, { useEffect, useState } from "react";
import "./app.css";
import { getPeople, getCompany } from "./mocks/api";
import { findPropertyUtil, capitalizeUtil } from "./utils";

const App = () => {
  const [allPeople, setAllPeople] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [clickedID, setClickedID] = useState();
  const [showLoading, setLoading] = useState(false);

  useEffect(() => {
    getPeople().then((result) => setAllPeople(result));
  }, []);

  let finalData = [];

  if (allPeople.length > 0) {
    allPeople.map((obj) => {
      const compName = findPropertyUtil(obj, ["address", "data", "company"]);
      const perName = findPropertyUtil(obj, ["fullName"]);
      const createObj = {
        name: perName,
        company: compName
      };
      return finalData.push(createObj);
    });
  }

  const getCompanyDetails = (name, i) => {
    setLoading(true);
    setCompanyDetails({});
    if (clickedID !== i) {
      setClickedID(i);
    }
    getCompany(name).then((detail) => {
      setCompanyDetails(detail);
      setLoading(false);
    });
  };
  const reset = () => {
    setCompanyDetails({});
    setClickedID();
  };
  const size = Object.keys(companyDetails).length;

  return (
    <>
      <h1 className="header">ORGANIZATION</h1>
      {finalData.length === 0 ? (
        <div className="loader" />
      ) : (
        <div className="container">
          <div className="company-name">
            <h2 className="text-center">EMPLOYEES</h2>
            {finalData.map((val, i) => (
              <div
                className={` persons-list ${clickedID === i ? "person-list clicked" : ""
                  }`}
                onClick={() => getCompanyDetails(val.company, i)}
              >
                <ul>{val.name}</ul>
              </div>
            ))}
          </div>
          <div className="company-container">
            <h2 className="text-center">DETAILS</h2>
            {showLoading && (
              <div className="company-details loading">
                <div className="loader margin" />
              </div>
            )}
            {size > 0 ? (
              <>
                <div className="company-details">
                  <div className="reset" onClick={(e) => reset(e)}>
                    <span className="reset-icon">x</span>
                  </div>
                  {Object.entries(companyDetails).map((value, index) => (
                    <div className="company-list" key={index}>
                      {capitalizeUtil(
                        value[0] === "name" ? "Company" : value[0]
                      )}
                      : {capitalizeUtil(value[1])}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
