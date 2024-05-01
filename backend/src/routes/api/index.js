import express from "express";
import dailyRates from "./dailyRates.js";
import relatedNews from "./relatedNews.js";
import checkUsername from "./check-username.js";
import checkUsernameQuestion from "./check-username-question.js";
import changePassowrd from "./change-password.js";
import changeBase from "./change-base.js";
import getExpense from "./get-expense.js";
import getIncome from "./get-income.js";
import addIncomeExpenseRecord from "./add-income-expense-record.js";
import getCurrencyRate from "./get-currency-rate.js";

const router = express.Router();

router.use("/dailyRates", dailyRates);
router.use("/relatedNews", relatedNews);
router.use("/check-username", checkUsername);
router.use("/check-username-question", checkUsernameQuestion);
router.use("/change-password", changePassowrd);
router.use("/change-base", changeBase);
router.use("/get-expense/:peroid", getExpense);
router.use("/get-income/:peroid", getIncome);
router.use("/add-record", addIncomeExpenseRecord);
router.use("/get-currency-rate", getCurrencyRate);

export default router;
