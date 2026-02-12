let balance = 10000;
let portfolio = {};

export function getBalance() {
  return balance;
}

export function getPortfolio() {
  return portfolio;
}

export function buyStock(symbol, price, quantity) {
  const total = price * quantity;

  if (total > balance) {
    throw new Error('Insufficient balance.');
  }

  balance -= total;
  portfolio[symbol] = (portfolio[symbol] || 0) + quantity;

  return total;
}

export function sellStock(symbol, price, quantity) {
  if (!portfolio[symbol] || portfolio[symbol] < quantity) {
    throw new Error('Not enough shares.');
  }

  const total = price * quantity;

  balance += total;
  portfolio[symbol] -= quantity;

  return total;
}
