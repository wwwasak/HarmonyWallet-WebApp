import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import User from "./user-schema.js";
import News from "../schemas/news-schema.js";

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  await User.deleteMany({});

  await mongoose.disconnect();
  console.log("Done!");
}

run();
