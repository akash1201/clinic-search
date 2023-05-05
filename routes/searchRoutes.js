import express from "express";
import { searchClinics } from "../controller/searchControllers.js";
import { fetchJsons } from "../middlewares/searchMiddleware.js";

const searchRoutes = express.Router();

/* 
fetchJsons middleware handles external data fetching, 
i.e. vets and dentists, formats them and their data 
generating a single type of input to prevent the need to process 
multiple types in the controller, making the code compact and distributed.
*/

/* GET /api/clinics?name=<name>&state=<state>&from=<from>&to=<to> */
searchRoutes.get("/clinic-search", fetchJsons, searchClinics);

export default searchRoutes;
