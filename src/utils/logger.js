import fs from 'fs';
import path from 'path';

const logDir = path.resolve('src/logs');
const logFile = path.join(logDir, 'transactions.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export function logTransaction(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}
