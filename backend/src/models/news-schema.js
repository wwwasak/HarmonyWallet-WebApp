import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  relatedCurrency: { type: Schema.Types.ObjectId, require: true },
  title: String,
  link: String,
  time_published: String,
});

const News = mongoose.model("News", newsSchema);

export default News;
