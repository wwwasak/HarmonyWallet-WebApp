import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  exchange_from: {
    used_amount: Number,
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
  },
  exchange_to: {
    target_amount: Number,
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
  },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

export default Exchange;
