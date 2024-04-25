import express from "express";
import dailyRates from "./dailyRates.js";
import relatedNews from "./relatedNews.js";
import checkUsername from "./check-username.js";
import checkUsernameQuestion from "./check-username-question.js";
import changePassowrd from "./change-password.js";

const router = express.Router();

router.use("/dailyRates", dailyRates);
router.use("/relatedNews", relatedNews);
router.use("/check-username", checkUsername);
router.use("/check-username-question", checkUsernameQuestion);
router.use("/change-password", changePassowrd);

export default router;
