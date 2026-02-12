import readline from 'readline';
import { getStockPrice } from './services/stockService.js';
import { buyStock, sellStock, getBalance, getPortfolio } from './services/tradingService.js';
import { logTransaction } from './utils/logger.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log('\n=== Stock Market Simulator ===');
  console.log('1 - View stock price');
  console.log('2 - Buy stock');
  console.log('3 - Sell stock');
  console.log('4 - View balance and portfolio');
  console.log('5 - Exit');

  rl.question('Choose an option: ', async (option) => {
    try {
      switch (option) {
        case '1':
          await viewStock();
          break;
        case '2':
          await buy();
          break;
        case '3':
          await sell();
          break;
        case '4':
          showPortfolio();
          break;
        case '5':
          rl.close();
          return;
        default:
          console.log('Invalid option.');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }

    menu();
  });
}

async function viewStock() {
  const symbol = await ask('Symbol (e.g., AAPL): ');
  const price = await getStockPrice(symbol);
  console.log(`Current price of ${symbol}: $${price}`);
}

async function buy() {
  const symbol = await ask('Symbol: ');
  const quantity = parseInt(await ask('Quantity: '));

  const price = await getStockPrice(symbol);
  const total = buyStock(symbol, price, quantity);

  logTransaction(`BOUGHT ${quantity} ${symbol} at $${price} | Total: $${total}`);

  console.log(`Bought ${quantity} shares of ${symbol}`);
}

async function sell() {
  const symbol = await ask('Symbol: ');
  const quantity = parseInt(await ask('Quantity: '));

  const price = await getStockPrice(symbol);
  const total = sellStock(symbol, price, quantity);

  logTransaction(`SOLD ${quantity} ${symbol} at $${price} | Total: $${total}`);

  console.log(`Sold ${quantity} shares of ${symbol}`);
}

function showPortfolio() {
  console.log('\nBalance:', getBalance());
  console.log('Portfolio:', getPortfolio());
}

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

menu();

