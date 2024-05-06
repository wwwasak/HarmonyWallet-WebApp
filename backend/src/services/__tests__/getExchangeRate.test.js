import { getExchangeRate } from '../getExchangeRate';
import Currency from '../../models/currency-schema';
import { format } from 'date-fns';

jest.mock('../../models/currency-schema');

describe('getExchangeRate', () => {
    const mockCurrencyData = {
      currency: 'USD',
      start_date: new Date('2024-01-01'),
      rates: new Map([
        ['2024-01-01', { EUR: 0.8, GBP: 0.7 }],
        ['2024-01-02', { EUR: 0.79, GBP: 0.69 }],
      ]),
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return exchange rate when valid data is provided', async () => {
      const mockDate = new Date('2024-01-01');
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      const formattedDate = format(mockDate, 'yyyy-MM-dd');
  
      Currency.findOne.mockResolvedValue(mockCurrencyData);
  
      const exchangeRate = await getExchangeRate(fromCurrency, toCurrency, mockDate);
  
      expect(Currency.findOne).toHaveBeenCalledWith({
        currency: fromCurrency.toUpperCase(),
        start_date: { $lte: mockDate },
      });
      expect(exchangeRate).toBe(mockCurrencyData.rates.get(formattedDate)[toCurrency.toUpperCase()]);
    });
  });