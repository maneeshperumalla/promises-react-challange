import { peopleData, companyData } from "./data";

const getPeople = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(peopleData);
    }, 3000);
  });
};

const getCompany = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name);
      if (name) {
        resolve(companyData.find((company) => company.name === name));
      } else {
        resolve(companyData);
      }
    }, 3000);
  });
};

export { getPeople, getCompany };
