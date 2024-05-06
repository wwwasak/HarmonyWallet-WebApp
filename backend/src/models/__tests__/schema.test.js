import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Currency from '../currency-schema.js';
import DailyRate from '../DailyRate.js';
import Exchange from '../exchange-schema.js';
import Expense from '../expense-schema.js';
import Income from '../income-schema.js';
import User from '../user-schema.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Currency Model', () => {
  test('should create a new currency', async () => {
    const currency = new Currency({
      currency: 'USD',
      amount: 100,
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-12-31'),
      rates: new Map([['EUR', 0.9], ['GBP', 0.8]]),
    });
    await currency.save();
    expect(currency.currency).toBe('USD');
    expect(currency.amount).toBe(100);
  });
});

describe('DailyRate Model', () => {
  test('should create a new daily rate', async () => {
    const dailyRate = new DailyRate({
      date: new Date('2023-05-01'),
      base: 'USD',
      rates: new Map([['EUR', 0.9], ['GBP', 0.8]]),
    });
    await dailyRate.save();
    expect(dailyRate.date).toEqual(new Date('2023-05-01'));
    expect(dailyRate.base).toBe('USD');
  });
});

describe('Exchange Model', () => {
  test('should create a new exchange', async () => {
    const user = new User({ username: 'testuser1', password: 'password' });
    await user.save();

    const fromCurrency = new Currency({ currency: 'USD', amount: 100 });
    await fromCurrency.save();

    const toCurrency = new Currency({ currency: 'EUR', amount: 90 });
    await toCurrency.save();

    const exchange = new Exchange({
      user: user._id,
      date: new Date('2023-05-01'),
      fromAmount: 100,
      fromCurrency: fromCurrency._id,
      toAmount: 90,
      toCurrency: toCurrency._id,
    });
    await exchange.save();

    expect(exchange.user).toEqual(user._id);
    expect(exchange.date).toEqual(new Date('2023-05-01'));
    expect(exchange.fromAmount).toBe(100);
    expect(exchange.fromCurrency).toEqual(fromCurrency._id);
    expect(exchange.toAmount).toBe(90);
    expect(exchange.toCurrency).toEqual(toCurrency._id);
  });
});

describe('Expense Model', () => {
  test('should create a new expense', async () => {
    const user = new User({ username: 'testuser2', password: 'password' });
    await user.save();

    const currency = new Currency({ currency: 'USD', amount: 100 });
    await currency.save();

    const expense = new Expense({
      user: user._id,
      amount: 50,
      date: new Date('2023-05-01'),
      currency: currency._id,
    });
    await expense.save();

    expect(expense.user).toEqual(user._id);
    expect(expense.amount).toBe(50);
    expect(expense.date).toEqual(new Date('2023-05-01'));
    expect(expense.currency).toEqual(currency._id);
  });
});

describe('Income Model', () => {
  test('should create a new income', async () => {
    const user = new User({ username: 'testuser3', password: 'password' });
    await user.save();

    const currency = new Currency({ currency: 'USD', amount: 100 });
    await currency.save();

    const income = new Income({
      user: user._id,
      amount: 75,
      date: new Date('2023-05-01'),
      currency: currency._id,
    });
    await income.save();

    expect(income.user).toEqual(user._id);
    expect(income.amount).toBe(75);
    expect(income.date).toEqual(new Date('2023-05-01'));
    expect(income.currency).toEqual(currency._id);
  });
});
