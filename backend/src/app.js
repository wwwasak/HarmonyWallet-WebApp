// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cron from "node-cron";
import { updateAllCurrenciesData } from "./services/updateAllCurrenciesData.js";
import { fillMissingRates } from "./services/fillMissingRates.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

import routes from "./routes/routes.js";
app.use("/", routes);

await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

cron.schedule("0 0 * * *", async () => {
  await updateAllCurrenciesData();
  await fillMissingRates();
});

app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
