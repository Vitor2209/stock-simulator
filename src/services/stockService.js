import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function getStockPrice(symbol) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: API_KEY
      }
    });

    const data = response.data['Global Quote'];

    if (!data || !data['05. price']) {
      throw new Error('Stock not found or API limit reached.');
    }

    return parseFloat(data['05. price']);
  } catch (error) {
    throw new Error('Stock not found or API limit reached.');
  }
}

