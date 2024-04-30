import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import User from "../models/user-schema.js";
import News from "../models/news-schema.js";
import Currency from "../models/currency-schema.js";

import { getRelatedNews } from "../services/getRelatedNews.js";
import { initCurrencyDatabase } from "../services/initCurrencyDatabase.js";

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  await User.deleteMany();
  // await Currency.deleteMany();

  // await initCurrencyDatabase();

  await mongoose.disconnect();
  console.log("Done!");
}

run();
