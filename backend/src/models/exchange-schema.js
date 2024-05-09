import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  fromAmount: Number,
  fromCurrency: { type: Schema.Types.ObjectId, ref: "Currency" },
  toAmount: Number,
  toCurrency: { type: Schema.Types.ObjectId, ref: "Currency" },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

export default Exchange;
