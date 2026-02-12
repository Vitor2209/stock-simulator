import axios from "axios";
import "dotenv/config";

const API_KEY = process.env.API_KEY;

export async function getStockPrice(symbol) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query`,
      {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: API_KEY
        }
      }
    );

    const data = response.data["Global Quote"];

    if (!data || !data["05. price"]) {
      throw new Error("Invalid symbol or API limit reached.");
    }

    return parseFloat(data["05. price"]);
  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);
    throw new Error("Stock not found or API limit reached.");
  }
}
