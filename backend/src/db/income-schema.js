import mongoose from "mongoose";

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  time_stamp: Date,
  currency: { type: Schema.Types.ObjectId, ref: 'Currency' }
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;
