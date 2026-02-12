import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "src", "logs");
const logFile = path.join(logDir, "transactions.log");

// garante que a pasta exista
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export function logTransaction(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
}
