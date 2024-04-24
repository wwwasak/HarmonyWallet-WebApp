import express from "express";
const router = express.Router();
import News from "../../models/news-schema.js";
import { getRelatedNews } from "../../services/getRelatedNews.js";

//wait for fetching data
router.get("/", (req, res) => {
  res.send("this is related news");
});

router.get("/:targetCurrency", async (req, res) => {
  const { targetCurrency } = req.params;

  res.json("result");
});

export default router;
