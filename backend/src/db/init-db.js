import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import User from "../models/user-schema.js";
import Currency from "../models/currency-schema.js";
import Expense from "../models/expense-schema.js";
import Income from "../models/income-schema.js";
import Exchange from "../models/exchange-schema.js";
import { initDummyDatabase } from "../services/dummyDatabase.js";

import { initCurrencyDatabase } from "../services/initCurrencyDatabase.js";
import { fillMissingRates } from "../services/fillMissingRates.js";

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  await Expense.deleteMany();
  await Income.deleteMany();
  await Exchange.deleteMany();
  await User.deleteMany();

  await Currency.deleteMany();

  await initCurrencyDatabase();

  await fillMissingRates();
  await initDummyDatabase();
  await mongoose.disconnect();
  console.log("Done!");
}

run();
