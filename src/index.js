import readlineSync from "readline-sync";
import { getStockPrice } from "./services/stockService.js";
import {
  buyStock,
  sellStock,
  getBalance,
  getPortfolio
} from "./services/tradingService.js";

async function main() {
  while (true) {
    console.log("\n=== Stock Market Simulator ===");
    console.log("1 - View stock price");
    console.log("2 - Buy stock");
    console.log("3 - Sell stock");
    console.log("4 - View balance and portfolio");
    console.log("5 - Exit");

    const option = readlineSync.question("Choose an option: ");

    try {
      if (option === "1") {
        const symbol = readlineSync.question("Symbol (e.g., AAPL): ").toUpperCase();
        const price = await getStockPrice(symbol);
        console.log(`Current price of ${symbol}: $${price}`);
      }

      else if (option === "2") {
        const symbol = readlineSync.question("Symbol: ").toUpperCase();
        const quantity = parseInt(readlineSync.question("Quantity: "));

        const price = await getStockPrice(symbol);
        const total = buyStock(symbol, price, quantity);

        console.log(`Purchased for $${total}`);
      }

      else if (option === "3") {
        const symbol = readlineSync.question("Symbol: ").toUpperCase();
        const quantity = parseInt(readlineSync.question("Quantity: "));

        const price = await getStockPrice(symbol);
        const total = sellStock(symbol, price, quantity);

        console.log(`Sold for $${total}`);
      }

      else if (option === "4") {
        console.log("Balance:", getBalance());
        console.log("Portfolio:", getPortfolio());
      }

      else if (option === "5") {
        console.log("Exiting...");
        process.exit();
      }

    } catch (error) {
      console.log("Error:", error.message);
    }
  }
}

main();

