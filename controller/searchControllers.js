import { sendResponse } from "../Utils/responseHandler.js";

/* since multiple filters can be applied, 
  so here we're trying to eliminate data based on 
  fields provided
  */
const applyFilter = (name, state, from, to, clinics) => {
  let filterResults = clinics.filter((clinic) => {
    if (name && !clinic.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    if (
      state &&
      !clinic.stateName.toLowerCase().includes(state.toLowerCase())
    ) {
      return false;
    }
    /* for time range to work both data are required */
    if (from && to) {
      const clinicFrom = new Date(`2023-05-05T${clinic.availability.from}:00`);
      const clinicTo = new Date(`2023-05-05T${clinic.availability.to}:00`);
      const searchFrom = new Date(`2023-05-05T${from}:00`);
      const searchTo = new Date(`2023-05-05T${to}:00`);
      if (!(searchFrom >= clinicFrom && searchTo <= clinicTo)) {
        return false;
      }
    }
    return true;
  });
  return filterResults;
};

const searchClinics = async (req, res) => {
  const { name, state, from, to } = req.query; //optional parameters

  const { clinics } = req; //data from middleware, which has list of clinics from both the url
  let filterResults = [];
  if (name?.trim() || state?.trim() || (from?.trim() && to?.trim())) {
    filterResults = applyFilter(name, state, from, to, clinics);
  } else {
    filterResults = clinics;
  }
  sendResponse(res, 200, filterResults, "success");
};

export { searchClinics };
