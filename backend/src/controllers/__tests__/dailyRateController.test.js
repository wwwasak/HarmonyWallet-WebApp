const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { fetchAndStoreHistoricalRates } = require('../dailyRateController');
const DailyRate = require('../../models/DailyRate');

describe('fetchAndStoreHistoricalRates', () => {
    const mock = new MockAdapter(axios);
    const mockRates = {
        rates: {
            EUR: 0.8,
            GBP: 0.7

        }
    };

    beforeEach(() => {

        jest.clearAllMocks();
        DailyRate.create = jest.fn();
    });

    it('should fetch and store historical rates for March successfully', async () => {
        const startDate = new Date('2024-03-01');
        const endDate = new Date('2024-03-31');

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const formattedDate = date.toISOString().split('T')[0];
            mock.onGet(`https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=61ef9148f656465a89126e0c0bedf31b&base=USD`).reply(200, mockRates);
        }

        await fetchAndStoreHistoricalRates();

        expect(DailyRate.create).toHaveBeenCalledTimes(31);
    });
});
