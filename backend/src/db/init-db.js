import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import User from "../models/user-schema.js";
import News from "../models/news-schema.js";

import { getRelatedNews } from "../services/getRelatedNews.js";

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  const user1 = new User({
    username: "user1",
    security_question: "String1",
    auestion_answer: "String",
    password: "123456",
    default_currency: null,
    notification: [],
    favourite_currency: [],
  });

  await user1.save();

  await mongoose.disconnect();
  console.log("Done!");
}

run();
