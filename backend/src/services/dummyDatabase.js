// Generate dummy currency data
import Currency from "../models/currency-schema.js";
import User from "../models/user-schema.js";
import Income from "../models/income-schema.js";
import Expense from "../models/expense-schema.js";
import Exchange from "../models/exchange-schema.js";
export async function initDummyDatabase() {
    const currencies = await Currency.find({}, "_id");

    // Generate dummy user data
    const user1 = await User.create({
        username: "user1",
        password: "$2a$10$naDVu1krfySTwUwHOpr40O/cI0dqx8bmNLTOus7Zvox5t0zZiR6j2",
        avatorURL: null,
        security_question: "Q1",
        question_answer: 123,
        base_currency: currencies[0], // Assume the first currency as base currency for user1
        notification: [],
        favourite_currency: [],
    });

    const user2 = await User.create({
        username: "user2",
        password: "$2a$10$naDVu1krfySTwUwHOpr40O/cI0dqx8bmNLTOus7Zvox5t0zZiR6j2",
        avatorURL: null,
        security_question: "Q1",
        question_answer: 123,
        base_currency: currencies[1], // Assume the second currency as base currency for user2
        notification: [],
        favourite_currency: [],
    });

    // Generate dummy income data for user1
    for (let i = 0; i < 100; i++) {
        await Income.create({
            user: user1,
            amount: Math.random() * 1000,
            date: new Date(Date.now() - Math.random() * 10000000000), // Random date within the last 10000000000 milliseconds (about 115 days)
            currency: currencies[Math.floor(Math.random() * currencies.length)], // Randomly select a currency from the available currencies
        });
    }

    // Generate dummy income data for user2
    for (let i = 0; i < 100; i++) {
        await Income.create({
            user: user2,
            amount: Math.random() * 1000,
            date: new Date(Date.now() - Math.random() * 10000000000),
            currency: currencies[Math.floor(Math.random() * currencies.length)],
        });
    }

    // Generate dummy expense data for user1
    for (let i = 0; i < 100; i++) {
        await Expense.create({
            user: user1,
            amount: Math.random() * 1000,
            date: new Date(Date.now() - Math.random() * 10000000000),
            currency: currencies[Math.floor(Math.random() * currencies.length)],
        });
    }

    // Generate dummy expense data for user2
    for (let i = 0; i < 100; i++) {
        await Expense.create({
            user: user2,
            amount: Math.random() * 1000,
            date: new Date(Date.now() - Math.random() * 10000000000),
            currency: currencies[Math.floor(Math.random() * currencies.length)],
        });
    }

    // Generate dummy exchange data for user1
    for (let i = 0; i < 100; i++) {
        await Exchange.create({
            user: user1,
            date: new Date(Date.now() - Math.random() * 10000000000),
            fromAmount: Math.random() * 1000,
            fromCurrency: currencies[Math.floor(Math.random() * currencies.length)],
            toAmount: Math.random() * 1000,
            toCurrency: currencies[Math.floor(Math.random() * currencies.length)],
        });
    }

    // Generate dummy exchange data for user2
    for (let i = 0; i < 100; i++) {
        await Exchange.create({
            user: user2,
            date: new Date(Date.now() - Math.random() * 10000000000),
            fromAmount: Math.random() * 1000,
            fromCurrency: currencies[Math.floor(Math.random() * currencies.length)],
            toAmount: Math.random() * 1000,
            toCurrency: currencies[Math.floor(Math.random() * currencies.length)],
        });
    }

    console.log("Dummy data generated successfully.");
}