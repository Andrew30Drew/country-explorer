import axios from 'axios';
import { getAllCountries, getCountryByCode } from '../api';

jest.mock('axios');

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should fetch all countries successfully', async () => {
      const mockCountries = [
        { name: { common: 'United States' }, capital: ['Washington, D.C.'] },
        { name: { common: 'France' }, capital: ['Paris'] }
      ];

      axios.get.mockResolvedValueOnce({ data: mockCountries });

      const result = await getAllCountries();
      expect(result).toEqual(mockCountries);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    });

    it('should handle errors when fetching all countries', async () => {
      const error = new Error('Network error');
      axios.get.mockRejectedValueOnce(error);

      const result = await getAllCountries();
      expect(result).toBeNull();
    });
  });

  describe('getCountryByCode', () => {
    it('should fetch a country by code successfully', async () => {
      const mockCountry = { name: { common: 'United States' }, capital: ['Washington, D.C.'] };
      axios.get.mockResolvedValueOnce({ data: [mockCountry] });

      const result = await getCountryByCode('USA');
      expect(result).toEqual(mockCountry);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/USA');
    });

    it('should handle errors when fetching a country by code', async () => {
      const error = new Error('Country not found');
      axios.get.mockRejectedValueOnce(error);

      const result = await getCountryByCode('INVALID');
      expect(result).toBeNull();
    });
  });
});
