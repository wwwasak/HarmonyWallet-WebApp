import express from "express";
const router = express.Router();
import News from "../../models/news-schema.js";

//wait for fetching data
router.get("/", (req, res) => {
  res.send("this is related news");
});

router.get("/:targetCurrency", async (req, res) => {
  const { targetCurrency } = req.params;

  res.json(`this is the result for ${targetCurrency}`);
});

export default router;
