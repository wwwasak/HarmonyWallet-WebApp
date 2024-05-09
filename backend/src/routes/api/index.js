import express from "express";
import checkUsername from "./check-username.js";
import checkUsernameQuestion from "./check-username-question.js";
import fotgotPassowrd from "./forgot-password.js";
import changeBase from "./change-base.js";
import getExpense from "./get-expense.js";
import getIncome from "./get-income.js";
import addIncomeExpenseRecord from "./add-income-expense-record.js";
import getCurrencyRate from "./get-currency-rate.js";
import getExchanges from "./get-exchanges.js";
import getUserInfo from "./get-user-info.js";
import changePassword from "./change-password.js";

const router = express.Router();

router.use("/check-username", checkUsername);
router.use("/check-username-question", checkUsernameQuestion);
router.use("/forgot-password", fotgotPassowrd);
router.use("/change-base", changeBase);
router.use("/get-expenses", getExpense);
router.use("/get-incomes", getIncome);
router.use("/add-record", addIncomeExpenseRecord);
router.use("/get-currency-rate", getCurrencyRate);
router.use("/get-exchanges", getExchanges);
router.use("/get-user-info", getUserInfo);
router.use("/change-password", changePassword);

export default router;
