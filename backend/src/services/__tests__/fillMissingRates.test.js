import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { fillMissingRates } from '../../services/fillMissingRates';

let mongoServer;
const opts = { useNewUrlParser: true, useUnifiedTopology: true };

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); 
  const mongoUri = mongoServer.getUri(); 
  await mongoose.connect(mongoUri, opts); 
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('fillMissingRates', () => {
  let Currency;

  beforeAll(async () => {
    Currency = mongoose.model('Currency');
  });

  beforeEach(async () => {
    await Currency.deleteMany({});
  });

  it('should fill missing rates for currencies', async () => {

    const currency = await Currency.create({
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-01-05'),
      rates: new Map([
        ['2024-01-01', { EUR: 0.8, GBP: 0.7 }],
        ['2024-01-02', { EUR: 0.79, GBP: 0.69 }],
      
      ]),
    });

    await fillMissingRates();

    const updatedCurrency = await Currency.findById(currency._id);

    expect(updatedCurrency.rates.size).toBeGreaterThan(currency.rates.size);

  });

});