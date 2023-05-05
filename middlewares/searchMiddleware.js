import axios from "axios";

/* Both the promises fetches data and always returns something, 
as both of them are 3rd party resource , api will work even if one resource 
is available.
*/
const fetchDentists = new Promise((resolve, reject) => {
  axios
    .get(
      "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json"
    )
    .then((res) => {
      resolve(res?.data || []);
    })
    .catch((err) => {
      resolve([]); //This resolve ensures that even if one of the URL is down, the API will always return data based on success calls
    });
});

const fetchVets = new Promise((resolve, reject) => {
  axios
    .get(
      "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json"
    )
    .then((res) => {
      const formattedVets = res?.data?.map((item) => {
        return {
          name: item?.clinicName,
          stateName: item?.stateCode,
          isVet: 1, //just to identify vets as it comes from a different url.
          availability: {
            from: item?.opening?.from || "00:00",
            to: item?.opening?.to || "00:00",
          },
        };
      });
      resolve(formattedVets);
    })
    .catch((err) => {
      resolve([]);
    }); //This resolve ensures that even if one of the URL is down, the API will always return data based on success calls
});

/* retrives the data from promises and appends to request, to make the data available for controller */
const fetchJsons = (req, res, next) => {
  Promise.all([fetchDentists, fetchVets]).then(([dentists, vets]) => {
    req.clinics = [...dentists, ...vets];
    next();
  });
};

export { fetchJsons };
