import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currencySchema = new Schema({
  currency: { type: String, unique: true },
  hourly_exchange: [
    {
      rate: Number,
      time_stamp: Timestamp,
    },
  ],
  daily_exchange: [
    {
      rate: Number,
      time_stamp: Timestamp,
    },
  ],
});

const Currency = mongoose.model("Currency", currencySchema);

export default Currency;
