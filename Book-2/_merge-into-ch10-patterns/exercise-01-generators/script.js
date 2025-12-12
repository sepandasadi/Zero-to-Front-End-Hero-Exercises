// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Create a basic generator that counts to 3
function* countToThree() {
  // Use yield to pause and return values
  // yield 1;
  // yield 2;
  // yield 3;
}

// TODO: Create an infinite ID generator
function* idGenerator() {
  // Generate IDs like "ID-0001", "ID-0002", etc.
  // This should run forever (infinite loop is OK!)
}

// TODO: Create a custom range object that's iterable
function createRange(start, end) {
  return {
    start,
    end,

    // TODO: Implement Symbol.iterator
    // *[Symbol.iterator]() {
    //   for (let i = this.start; i <= this.end; i++) {
    //     yield i;
    //   }
    // }
  };
}

// ==========================================
// TEST FUNCTIONS
// ==========================================

function testBasicGenerator() {
  const output = document.getElementById('basic-output');
  output.innerHTML = 'Testing Basic Generator...\n\n';

  try {
    const gen = countToThree();

    output.innerHTML += 'Calling .next() repeatedly:\n';
    const result1 = gen.next();
    output.innerHTML += `Result 1: ${JSON.stringify(result1)}\n`;

    const result2 = gen.next();
    output.innerHTML += `Result 2: ${JSON.stringify(result2)}\n`;

    const result3 = gen.next();
    output.innerHTML += `Result 3: ${JSON.stringify(result3)}\n`;

    const result4 = gen.next();
    output.innerHTML += `Result 4: ${JSON.stringify(result4)}\n\n`;

    if (result1.value === 1 && result2.value === 2 && result3.value === 3 && result4.done) {
      output.innerHTML += '<span class="success">✅ Generator works perfectly!</span>';
    } else {
      output.innerHTML += '<span class="error">❌ Generator not implemented correctly</span>';
    }
  } catch (e) {
    output.innerHTML += `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

function testInfiniteSequence() {
  const output = document.getElementById('infinite-output');
  output.innerHTML = 'Testing Infinite ID Generator...\n\n';

  try {
    const generateID = idGenerator();

    output.innerHTML += 'Generating 10 IDs:\n';
    for (let i = 0; i < 10; i++) {
      const id = generateID.next().value;
      output.innerHTML += `${id}\n`;
    }

    output.innerHTML += '\n<span class="success">✅ Infinite generator works! (and doesn\'t crash)</span>';
  } catch (e) {
    output.innerHTML += `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

function testCustomIterator() {
  const output = document.getElementById('iterator-output');
  output.innerHTML = 'Testing Custom Range Iterator...\n\n';

  try {
    const range = createRange(1, 5);

    output.innerHTML += 'Using for...of loop:\n';
    for (const num of range) {
      output.innerHTML += `${num} `;
    }

    output.innerHTML += '\n\nUsing spread operator:\n';
    const array = [...createRange(10, 15)];
    output.innerHTML += `[${array}]\n\n`;

    output.innerHTML += '<span class="success">✅ Custom iterator works!</span>';
  } catch (e) {
    output.innerHTML += `<span class="error">❌ Error: ${e.message}\n`;
    output.innerHTML += 'Make sure to implement Symbol.iterator</span>';
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
function* countToThree() {
  yield 1;
  yield 2;
  yield 3;
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield `ID-${String(id++).padStart(4, '0')}`;
  }
}

function createRange(start, end) {
  return {
    start,
    end,

    *[Symbol.iterator]() {
      for (let i = this.start; i <= this.end; i++) {
        yield i;
      }
    }
  };
}
*/

