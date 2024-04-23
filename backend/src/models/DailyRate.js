const mongoose = require("mongoose");

const dailyRateSchema = new mongoose.Schema({
  date: Date,
  base: String,
  rates: { type: Map, of: Number },
});

const DailyRate = mongoose.model("DailyRate", dailyRateSchema);

module.exports = DailyRate;
