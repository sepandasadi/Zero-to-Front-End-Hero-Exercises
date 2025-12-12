console.log("=== Exercise 3: WeakMap & WeakSet ===\n");

// ==========================================
// 1. PRIVATE DATA WITH WEAKMAP
// ==========================================

// WeakMap for storing private data
const privateData = new WeakMap();

class Counter {
  constructor(initialValue = 0) {
    // Store private data in WeakMap
    privateData.set(this, {
      count: initialValue,
      history: []
    });
  }

  increment() {
    const data = privateData.get(this);
    data.count++;
    data.history.push(`Incremented to ${data.count}`);
  }

  decrement() {
    const data = privateData.get(this);
    data.count--;
    data.history.push(`Decremented to ${data.count}`);
  }

  getCount() {
    return privateData.get(this).count;
  }

  getHistory() {
    return [...privateData.get(this).history];
  }

  // Try to access private data directly (won't work!)
  // There's no way to get the count without using the methods
}

function testPrivateData() {
  const output = document.getElementById('private-output');
  output.innerHTML = 'Testing Private Data with WeakMap...\n\n';

  try {
    const counter1 = new Counter(10);
    const counter2 = new Counter(100);

    output.innerHTML += '📊 Counter 1:\n';
    output.innerHTML += `Initial count: ${counter1.getCount()}\n`;

    counter1.increment();
    counter1.increment();
    counter1.decrement();

    output.innerHTML += `Final count: ${counter1.getCount()}\n`;
    output.innerHTML += `History: ${counter1.getHistory().join(', ')}\n\n`;

    output.innerHTML += '📊 Counter 2:\n';
    output.innerHTML += `Count: ${counter2.getCount()}\n\n`;

    // Try to access private data
    output.innerHTML += '🔒 Testing Privacy:\n';
    output.innerHTML += `counter1.count = ${counter1.count} (undefined - truly private!)\n`;
    output.innerHTML += `counter1.history = ${counter1.history} (undefined - truly private!)\n\n`;

    output.innerHTML += '<span class="success">✅ Private data is completely inaccessible!</span>\n';
    output.innerHTML += '<span class="info">The only way to access it is through the methods.</span>';

  } catch (error) {
    output.innerHTML += `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

function testMemoryCleanup() {
  const output = document.getElementById('private-output');
  output.innerHTML = 'Testing Automatic Memory Cleanup...\n\n';

  try {
    // Create counters and let them be garbage collected
    output.innerHTML += '1. Creating counter instances...\n';
    let counter1 = new Counter(5);
    let counter2 = new Counter(10);

    output.innerHTML += `Counter 1: ${counter1.getCount()}\n`;
    output.innerHTML += `Counter 2: ${counter2.getCount()}\n\n`;

    output.innerHTML += '2. Setting counters to null...\n';
    counter1 = null;
    counter2 = null;

    output.innerHTML += '<span class="success">✅ Counters are now eligible for garbage collection!</span>\n\n';

    output.innerHTML += '3. WeakMap behavior:\n';
    output.innerHTML += '   - When objects are garbage collected...\n';
    output.innerHTML += '   - Their WeakMap entries are automatically removed\n';
    output.innerHTML += '   - No memory leaks! 🎉\n\n';

    output.innerHTML += '<span class="info">💡 This is impossible with regular Map!</span>\n';
    output.innerHTML += '<span class="info">Regular Map would keep the objects alive.</span>';

  } catch (error) {
    output.innerHTML += `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

// ==========================================
// 2. DOM METADATA STORAGE
// ==========================================

const elementMetadata = new WeakMap();
let elementCounter = 0;

function createTrackedElement() {
  const container = document.getElementById('tracked-items');

  // Create DOM element
  const div = document.createElement('div');
  div.className = 'tracked-item';
  div.id = `item-${++elementCounter}`;

  // Store metadata in WeakMap
  const metadata = {
    id: elementCounter,
    created: new Date(),
    clicks: 0,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  };

  elementMetadata.set(div, metadata);

  // Set initial content
  div.innerHTML = `
    <strong>Item #${metadata.id}</strong><br>
    Clicks: <span id="clicks-${metadata.id}">0</span>
  `;
  div.style.backgroundColor = metadata.color;

  // Track clicks
  div.addEventListener('click', () => {
    const meta = elementMetadata.get(div);
    meta.clicks++;
    document.getElementById(`clicks-${meta.id}`).textContent = meta.clicks;
  });

  // Add remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✕';
  removeBtn.style.marginTop = '10px';
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    div.remove();
    // Metadata will be automatically cleaned up!
    showToast('Element removed! Metadata will be garbage collected.');
  };

  div.appendChild(removeBtn);
  container.appendChild(div);

  showMetadata();
}

function showMetadata() {
  const output = document.getElementById('metadata-output');
  const items = document.querySelectorAll('.tracked-item');

  output.innerHTML = 'Current Element Metadata:\n\n';

  if (items.length === 0) {
    output.innerHTML += '<span class="info">No tracked elements. Create some!</span>';
    return;
  }

  items.forEach(item => {
    const meta = elementMetadata.get(item);
    if (meta) {
      output.innerHTML += `📦 Item #${meta.id}:\n`;
      output.innerHTML += `   Created: ${meta.created.toLocaleTimeString()}\n`;
      output.innerHTML += `   Clicks: ${meta.clicks}\n`;
      output.innerHTML += `   Color: ${meta.color}\n\n`;
    }
  });

  output.innerHTML += `<span class="success">Total tracked: ${items.length} elements</span>`;
}

function clearElements() {
  const container = document.getElementById('tracked-items');
  container.innerHTML = '';

  const output = document.getElementById('metadata-output');
  output.innerHTML = '<span class="success">✅ All elements removed!</span>\n\n';
  output.innerHTML += '<span class="info">🗑️ WeakMap entries will be automatically garbage collected.\n';
  output.innerHTML += 'No memory leaks! No manual cleanup needed!</span>';
}

function showToast(message) {
  const output = document.getElementById('metadata-output');
  output.innerHTML = `<span class="info">${message}</span>\n\n` + output.innerHTML;
}

// ==========================================
// 3. WEAKSET FOR OBJECT TRACKING
// ==========================================

const processedObjects = new WeakSet();

function processObject(obj) {
  if (processedObjects.has(obj)) {
    return 'Already processed!';
  }

  processedObjects.add(obj);
  return 'Processed successfully!';
}

function testWeakSet() {
  const output = document.getElementById('weakset-output');
  output.innerHTML = 'Testing WeakSet for Object Tracking...\n\n';

  try {
    const user1 = { name: 'Alice', id: 1 };
    const user2 = { name: 'Bob', id: 2 };
    const user3 = { name: 'Charlie', id: 3 };

    output.innerHTML += '1. Processing user objects:\n';
    output.innerHTML += `User 1 (Alice): ${processObject(user1)}\n`;
    output.innerHTML += `User 2 (Bob): ${processObject(user2)}\n`;
    output.innerHTML += `User 3 (Charlie): ${processObject(user3)}\n\n`;

    output.innerHTML += '2. Trying to process again:\n';
    output.innerHTML += `User 1 (Alice): ${processObject(user1)}\n`;
    output.innerHTML += `User 2 (Bob): ${processObject(user2)}\n\n`;

    output.innerHTML += '3. Checking membership:\n';
    output.innerHTML += `Has User 1? ${processedObjects.has(user1)}\n`;
    output.innerHTML += `Has User 2? ${processedObjects.has(user2)}\n\n`;

    // Create and process temporary object
    output.innerHTML += '4. Processing temporary object:\n';
    let tempUser = { name: 'Temp', id: 999 };
    output.innerHTML += `Temp User: ${processObject(tempUser)}\n`;
    output.innerHTML += `Has Temp? ${processedObjects.has(tempUser)}\n\n`;

    tempUser = null; // Now eligible for garbage collection
    output.innerHTML += 'Temp user set to null → Eligible for garbage collection\n\n';

    output.innerHTML += '<span class="success">✅ WeakSet prevents duplicate processing!</span>\n';
    output.innerHTML += '<span class="info">When objects are GC\'d, they\'re auto-removed from WeakSet.</span>';

  } catch (error) {
    output.innerHTML += `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

function testDuplicatePrevention() {
  const output = document.getElementById('weakset-output');
  output.innerHTML = 'Testing Duplicate Prevention System...\n\n';

  try {
    const processed = new WeakSet();
    const results = [];

    class Task {
      constructor(name) {
        this.name = name;
      }

      execute() {
        if (processed.has(this)) {
          return `⚠️ Task "${this.name}" already executed!`;
        }

        processed.add(this);
        return `✅ Task "${this.name}" executed successfully!`;
      }
    }

    const task1 = new Task('Send Email');
    const task2 = new Task('Save Database');
    const task3 = new Task('Update Cache');

    output.innerHTML += 'Executing tasks:\n\n';

    // First execution
    output.innerHTML += `${task1.execute()}\n`;
    output.innerHTML += `${task2.execute()}\n`;
    output.innerHTML += `${task3.execute()}\n\n`;

    output.innerHTML += 'Trying to execute again:\n\n';

    // Second execution (should be prevented)
    output.innerHTML += `${task1.execute()}\n`;
    output.innerHTML += `${task2.execute()}\n`;
    output.innerHTML += `${task3.execute()}\n\n`;

    output.innerHTML += '<span class="success">✅ Duplicate execution prevented!</span>\n';
    output.innerHTML += '<span class="info">💡 Perfect for idempotency and preventing duplicate operations.</span>';

  } catch (error) {
    output.innerHTML += `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

// ==========================================
// 4. MAP VS WEAKMAP COMPARISON
// ==========================================

function compareMapVsWeakMap() {
  const output = document.getElementById('comparison-output');
  output.innerHTML = 'Comparing Map vs WeakMap...\n\n';

  try {
    output.innerHTML += '═══════════════════════════════════════\n';
    output.innerHTML += '           Regular Map\n';
    output.innerHTML += '═══════════════════════════════════════\n\n';

    const regularMap = new Map();
    let obj1 = { data: 'test1' };
    let obj2 = { data: 'test2' };

    regularMap.set(obj1, 'value1');
    regularMap.set(obj2, 'value2');
    regularMap.set('string-key', 'value3'); // Can use any key type

    output.innerHTML += '✓ Can use any type as key (objects, strings, numbers)\n';
    output.innerHTML += `✓ Has size property: ${regularMap.size}\n`;
    output.innerHTML += '✓ Can iterate: forEach, for...of, .keys(), .values()\n';
    output.innerHTML += '✓ Keys are enumerable\n\n';

    output.innerHTML += 'Keys: ';
    for (const key of regularMap.keys()) {
      output.innerHTML += `${typeof key === 'object' ? '{obj}' : key}, `;
    }
    output.innerHTML += '\n\n';

    output.innerHTML += '⚠️ Problem: Strong references!\n';
    obj1 = null;
    obj2 = null;
    output.innerHTML += 'Even after obj1 and obj2 are set to null...\n';
    output.innerHTML += `Map still has ${regularMap.size} entries!\n`;
    output.innerHTML += '❌ Objects can\'t be garbage collected → Memory leak!\n\n';

    output.innerHTML += '═══════════════════════════════════════\n';
    output.innerHTML += '           WeakMap\n';
    output.innerHTML += '═══════════════════════════════════════\n\n';

    const weakMap = new WeakMap();
    let obj3 = { data: 'test3' };
    let obj4 = { data: 'test4' };

    weakMap.set(obj3, 'value3');
    weakMap.set(obj4, 'value4');
    // weakMap.set('string', 'value'); // ❌ Error! Keys must be objects

    output.innerHTML += '✓ Weak references (no memory leaks)\n';
    output.innerHTML += '✓ Automatic garbage collection\n';
    output.innerHTML += '✓ True privacy (can\'t enumerate)\n\n';

    output.innerHTML += '✗ Keys MUST be objects\n';
    output.innerHTML += '✗ No size property\n';
    output.innerHTML += '✗ Can\'t iterate (no forEach, no for...of)\n';
    output.innerHTML += '✗ Can\'t get list of keys\n\n';

    output.innerHTML += '💡 Benefit: Automatic cleanup!\n';
    obj3 = null;
    obj4 = null;
    output.innerHTML += 'When obj3 and obj4 are set to null...\n';
    output.innerHTML += '✅ They can be garbage collected!\n';
    output.innerHTML += '✅ WeakMap entries automatically removed!\n';
    output.innerHTML += '✅ No memory leaks!\n\n';

    output.innerHTML += '═══════════════════════════════════════\n';
    output.innerHTML += '         When to Use Each\n';
    output.innerHTML += '═══════════════════════════════════════\n\n';

    output.innerHTML += 'Use Map when:\n';
    output.innerHTML += '  • You need to iterate over entries\n';
    output.innerHTML += '  • You need to know the size\n';
    output.innerHTML += '  • Keys can be primitives\n';
    output.innerHTML += '  • You control object lifecycle\n\n';

    output.innerHTML += 'Use WeakMap when:\n';
    output.innerHTML += '  • Storing private/metadata for objects\n';
    output.innerHTML += '  • You don\'t control object lifecycle\n';
    output.innerHTML += '  • You want automatic cleanup\n';
    output.innerHTML += '  • Preventing memory leaks is critical\n';
    output.innerHTML += '  • You want true privacy\n\n';

    output.innerHTML += '<span class="success">✅ Use the right tool for the job!</span>';

  } catch (error) {
    output.innerHTML += `<span class="error">❌ Error: ${error.message}</span>`;
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

console.log("✓ WeakMap & WeakSet module loaded");
console.log("\n📚 Key Concepts:");
console.log("   - WeakMap: Private data storage with auto cleanup");
console.log("   - WeakSet: Object tracking without memory leaks");
console.log("   - Weak references allow garbage collection");
console.log("   - Can't iterate (ensures privacy)");
console.log("\n💡 Click buttons to see examples!");

