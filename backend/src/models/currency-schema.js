import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
  currency: String,
  amount: Number,
  start_date: Date,
  end_date: Date,
  rates: Map,
});

const Currency = mongoose.model("Currency", CurrencySchema);

export default Currency;
