// app.js - Demonstrates all import patterns

console.log("=== Exercise 5: Advanced Module Patterns ===\n");

// 1. Named imports from barrel
import { add, subtract, multiply, PI, Logger, API_URL, COLORS } from './index.js';

console.log("1️⃣ Named Imports (from barrel):");
console.log(`   add(5, 3) = ${add(5, 3)}`);
console.log(`   subtract(10, 4) = ${subtract(10, 4)}`);
console.log(`   multiply(6, 7) = ${multiply(6, 7)}`);
console.log(`   PI = ${PI}`);
console.log(`   API_URL = ${API_URL}\n`);

// 2. Default import
import Logger2 from './logger.js'; // Can rename default imports
const logger = new Logger('APP ');

console.log("2️⃣ Default Import:");
logger.log("This is a log message");
logger.success("Operation successful!");
logger.info("Using Logger class");
console.log();

// 3. Namespace import (import everything as object)
import * as math from './math.js';

console.log("3️⃣ Namespace Import:");
console.log(`   math.add(10, 20) = ${math.add(10, 20)}`);
console.log(`   math.PI = ${math.PI}`);
console.log(`   math.square(5) = ${math.square(5)}\n`);

// 4. Mixed import (default + named)
import config, { TIMEOUT, MAX_RETRIES } from './config.js';

console.log("4️⃣ Mixed Import (default + named):");
console.log(`   config.api.timeout = ${config.api.timeout}`);
console.log(`   TIMEOUT = ${TIMEOUT}`);
console.log(`   MAX_RETRIES = ${MAX_RETRIES}\n`);

// 5. Dynamic import
const loadDataBtn = document.getElementById('load-data');
const processBtn = document.getElementById('process-data');
const output = document.getElementById('output');

let dataModule = null;

loadDataBtn?.addEventListener('click', async () => {
  logger.info("Loading data module dynamically...");

  try {
    // Dynamic import returns a Promise
    dataModule = await import('./data.js');

    logger.success(`Loaded module with ${dataModule.largeDataset.length} items`);

    output.innerHTML = `
      <div style="padding: 20px; background: #d4edda; border-radius: 8px; color: #155724;">
        <strong>✅ Module Loaded!</strong><br>
        Dataset size: ${dataModule.largeDataset.length} items<br>
        First item: ${JSON.stringify(dataModule.largeDataset[0])}
      </div>
    `;

    processBtn.disabled = false;
    loadDataBtn.disabled = true;

  } catch (error) {
    logger.error(`Failed to load module: ${error.message}`);
  }
});

processBtn?.addEventListener('click', () => {
  if (!dataModule) {
    logger.warning("Please load the data module first!");
    return;
  }

  logger.info("Processing data...");

  const stats = dataModule.processData(dataModule.largeDataset);

  output.innerHTML = `
    <div style="padding: 20px; background: #fff3cd; border-radius: 8px;">
      <strong>📊 Data Statistics:</strong><br>
      <pre style="margin-top: 10px;">${JSON.stringify(stats, null, 2)}</pre>
    </div>
  `;
});

// Demonstration summary
console.log("📦 Module Pattern Summary:");
console.log("   ✓ Named exports - specific items from module");
console.log("   ✓ Default export - main export from module");
console.log("   ✓ Barrel pattern - single entry point (index.js)");
console.log("   ✓ Namespace import - everything as object");
console.log("   ✓ Dynamic import - load on demand (code splitting)");
console.log("\n💡 Click buttons to see dynamic imports in action!");

