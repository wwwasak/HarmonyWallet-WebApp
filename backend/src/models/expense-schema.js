import mongoose from "mongoose";

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  currency: { type: Schema.Types.ObjectId, ref: "Currency" },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
