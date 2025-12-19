// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Create a validation proxy
function createValidatedUser(initialData = {}) {
  return new Proxy(initialData, {
    set(target, property, value) {
      // TODO: Add validation rules:
      // - age must be a number between 0 and 150
      // - email must contain '@'
      // - name must be a string

      // If valid: Reflect.set(target, property, value)
      // If invalid: throw new Error(...)

      // Temporary: just set without validation
      target[property] = value;
      return true;
    }
  });
}

// TODO: Create an observable object
function createObservable(target, onChange) {
  return new Proxy(target, {
    set(obj, property, value) {
      // TODO:
      // 1. Get old value
      // 2. Set new value
      // 3. Call onChange(property, oldValue, newValue)

      // Temporary implementation
      obj[property] = value;
      return true;
    }
  });
}

// TODO: Create array with negative indices
function createArray(arr) {
  return new Proxy(arr, {
    get(target, property) {
      // TODO: Handle negative indices
      // const index = Number(property);
      // if (index < 0) return target[target.length + index];
      // return target[property];

      // Temporary: return normally
      return target[property];
    }
  });
}

// ==========================================
// TEST FUNCTIONS
// ==========================================

function testValidation() {
  const output = document.getElementById('validation-output');
  output.innerHTML = 'Testing Validation Proxy...\n\n';

  try {
    const user = createValidatedUser();

    // Valid operations
    user.name = 'Alice';
    user.age = 25;
    user.email = 'alice@example.com';

    output.innerHTML += `✅ Valid data accepted:\n`;
    output.innerHTML += `   Name: ${user.name}\n`;
    output.innerHTML += `   Age: ${user.age}\n`;
    output.innerHTML += `   Email: ${user.email}\n\n`;

    // Try invalid operations
    try {
      user.age = 'invalid';
      output.innerHTML += '❌ Should have thrown error for invalid age\n';
    } catch (e) {
      output.innerHTML += `✅ Caught invalid age: ${e.message}\n`;
    }

    try {
      user.email = 'invalid-email';
      output.innerHTML += '❌ Should have thrown error for invalid email\n';
    } catch (e) {
      output.innerHTML += `✅ Caught invalid email: ${e.message}\n`;
    }

    output.innerHTML += '\n<span class="success">Validation proxy working!</span>';
  } catch (e) {
    output.innerHTML += `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

function testObservable() {
  const output = document.getElementById('observable-output');
  const display = document.getElementById('reactive-display');
  output.innerHTML = 'Testing Observable Object...\n\n';

  try {
    const state = createObservable({ count: 0 }, (prop, oldVal, newVal) => {
      output.innerHTML += `Change detected: ${prop} (${oldVal} → ${newVal})\n`;
      if (prop === 'count') {
        display.textContent = `Count: ${newVal}`;
      }
    });

    output.innerHTML += 'Incrementing count...\n';
    state.count = 1;
    state.count = 2;
    state.count = 3;

    output.innerHTML += '\n<span class="success">✅ Observable triggers on changes!</span>';
    output.innerHTML += '\n<span class="success">This is how Vue reactivity works!</span>';
  } catch (e) {
    output.innerHTML += `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

function testNegativeIndices() {
  const output = document.getElementById('array-output');
  output.innerHTML = 'Testing Negative Array Indices...\n\n';

  try {
    const fruits = createArray(['apple', 'banana', 'cherry', 'date']);

    output.innerHTML += 'Array: ["apple", "banana", "cherry", "date"]\n\n';
    output.innerHTML += `fruits[0] = ${fruits[0]}\n`;
    output.innerHTML += `fruits[-1] = ${fruits[-1]} (last item)\n`;
    output.innerHTML += `fruits[-2] = ${fruits[-2]} (second to last)\n\n`;

    if (fruits[-1] === 'date' && fruits[-2] === 'cherry') {
      output.innerHTML += '<span class="success">✅ Negative indices work!</span>';
    } else {
      output.innerHTML += '<span class="error">❌ Implement negative index handling</span>';
    }
  } catch (e) {
    output.innerHTML += `<span class="error">❌ Error: ${e.message}</span>`;
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
function createValidatedUser(initialData = {}) {
  return new Proxy(initialData, {
    set(target, property, value) {
      if (property === 'age') {
        if (typeof value !== 'number') {
          throw new TypeError('Age must be a number');
        }
        if (value < 0 || value > 150) {
          throw new RangeError('Age must be between 0 and 150');
        }
      }

      if (property === 'email') {
        if (!value.includes('@')) {
          throw new Error('Email must contain @');
        }
      }

      if (property === 'name') {
        if (typeof value !== 'string') {
          throw new TypeError('Name must be a string');
        }
      }

      return Reflect.set(target, property, value);
    }
  });
}

function createObservable(target, onChange) {
  return new Proxy(target, {
    set(obj, property, value) {
      const oldValue = obj[property];
      const result = Reflect.set(obj, property, value);
      onChange(property, oldValue, value);
      return result;
    }
  });
}

function createArray(arr) {
  return new Proxy(arr, {
    get(target, property) {
      const index = Number(property);
      if (index < 0) {
        return target[target.length + index];
      }
      return Reflect.get(target, property);
    }
  });
}
*/

