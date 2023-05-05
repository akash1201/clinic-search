import express from "express";
import dotenv from "dotenv";
import searchRoute from "./routes/searchRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", searchRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running`));
