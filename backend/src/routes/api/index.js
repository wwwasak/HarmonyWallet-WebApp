import express from "express";
import dailyRates from "./dailyRates.js";
import relatedNews from "./relatedNews.js";

const router = express.Router();

router.use("/dailyRates", dailyRates);
router.use("/relatedNews", relatedNews);

export default router;
