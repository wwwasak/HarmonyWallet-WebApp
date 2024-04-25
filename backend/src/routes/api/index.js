import express from "express";
import dailyRates from "./dailyRates.js";
import relatedNews from "./relatedNews.js";
import checkUsername from "./check-username.js";

const router = express.Router();

router.use("/dailyRates", dailyRates);
router.use("/relatedNews", relatedNews);
router.use("/check-username", checkUsername);

export default router;
