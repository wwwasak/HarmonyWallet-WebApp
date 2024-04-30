import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatorURL: String,
  security_question: String,
  question_answer: String,
  base_currency: String,
  notification: [
    {
      base_currency: { type: Schema.Types.ObjectId, ref: "Currency" },
      target_currency: { type: Schema.Types.ObjectId, ref: "Currency" },
      target_rate: Number,
      time_stamp: String,
    },
  ],
  favourite_currency: [{ type: Schema.Types.ObjectId, ref: "Currency" }],
});

const User = mongoose.model("User", userSchema);

export default User;
