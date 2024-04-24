import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String,unique:true},
  security_question: String,
  auestion_answer:String,
  password:String,
  default_currency:{type:Schema.Types.ObjectId, ref:'Currency'},
  notification:[{
    base_currency:{type:Schema.Types.ObjectId,ref:'Currency'},
    target_currency:{type:Schema.Types.ObjectId,ref:'Currency'},
    target_rate:Number,
    time_stamp:Timestamp
  }],
  favourite_currency:[{type:Schema.Types.ObjectId,ref:'Currency'}]
});

const User = mongoose.model("User", userSchema);

export default User;
