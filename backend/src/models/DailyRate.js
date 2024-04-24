import mongoose from "mongoose";

const dailyRateSchema = new mongoose.Schema({
  date: Date,
  base: String,
  rates: { type: Map, of: Number },
});

const DailyRate = mongoose.model("DailyRate", dailyRateSchema);

export default DailyRate;
