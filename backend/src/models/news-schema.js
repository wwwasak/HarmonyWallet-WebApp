import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  relatedCurrency: { type: Schema.Types.ObjectId, ref: "Currency" },
  title: { type: String, required: true },
  link: { type: String, required: true },
  time_published: String,
});

const News = mongoose.model("News", newsSchema);

export default News;
