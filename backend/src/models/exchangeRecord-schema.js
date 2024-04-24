import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exchangeRecordSchema = new Schema({
  exchang_id: Schema.Types.ObjectId,
  time_stamp:Timestamp,
  exchange_from:{
    amount_used:Number,
    currency: { type: Schema.Types.ObjectId, ref: 'Currency' }
  },
  exchange_to: {
    target_amount: Number,
    currency: { type: Schema.Types.ObjectId, ref: 'Currency' }
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const ExchangeRecord = mongoose.model("ExchangeRecord", exchangeRecordSchema);

export default ExchangeRecord;
