import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currencySchema = new Schema({
  short_name:String,
  hourly_exchange:[{
    rate:Number,
    time_stamp:Timestamp
  }],
  daily_exchange:[{
    rate:Number,
    time_stamp:Timestamp
  }],
  news:[{
    title:String,
    link:String,
    time_stamp:Timestamp
  }]
});

const Currency = mongoose.model("Currency", currencySchema);

export default Currency;
