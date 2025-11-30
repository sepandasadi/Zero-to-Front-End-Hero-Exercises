// ==========================================
// YOUR CODE HERE: Build ReactiveStore
// ==========================================

// TODO: Create symbols for private properties
// const _state = Symbol('state');
// const _listeners = Symbol('listeners');

class ReactiveStore {
  constructor(initialState = {}) {
    // TODO: Implement using Proxy, WeakMap, and Symbols
    // this[_state] = initialState;
    // this[_listeners] = new Set();

    // TODO: Create Proxy for reactive state
    // this.state = new Proxy(initialState, {
    //   set: (target, property, value) => {
    //     // Set value and notify listeners
    //   }
    // });
  }

  subscribe(callback) {
    // TODO: Add callback to listeners
  }

  unsubscribe(callback) {
    // TODO: Remove callback from listeners
  }

  // TODO: Make iterable with Symbol.iterator
  // *[Symbol.iterator]() {
  //   for (const [key, value] of Object.entries(this[_state])) {
  //     yield [key, value];
  //   }
  // }
}

// ==========================================
// DEMO APPLICATION
// ==========================================

// Create store (will work when you implement the class)
const store = new ReactiveStore({
  count: 0,
  user: { name: '', email: '' }
});

// Event log
const log = document.getElementById('event-log');
function addLog(message) {
  const timestamp = new Date().toLocaleTimeString();
  log.innerHTML += `<div><span class="timestamp">[${timestamp}]</span> ${message}</div>`;
  log.scrollTop = log.scrollHeight;
}

// Subscribe components
store.subscribe((property, oldValue, newValue) => {
  addLog(`<span class="success">State changed:</span> ${property} = ${JSON.stringify(newValue)}`);

  // Update UI based on changes
  if (property === 'count') {
    document.getElementById('counter1').textContent = newValue;
    document.getElementById('counter2').textContent = newValue;
  }

  if (property === 'user') {
    document.getElementById('user-name').textContent = newValue.name || '-';
  }
});

// Actions
function increment() {
  store.state.count++;
}

function decrement() {
  store.state.count--;
}

function updateUser() {
  const name = document.getElementById('username').value;
  store.state.user = { ...store.state.user, name };
}

// Initial log
addLog('Store initialized. Try clicking buttons!');

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
const _state = Symbol('state');
const _listeners = Symbol('listeners');

class ReactiveStore {
  constructor(initialState = {}) {
    this[_state] = initialState;
    this[_listeners] = new Set();

    this.state = new Proxy(initialState, {
      set: (target, property, value) => {
        const oldValue = target[property];
        target[property] = value;

        // Notify all listeners
        for (const listener of this[_listeners]) {
          listener(property, oldValue, value);
        }

        return true;
      }
    });
  }

  subscribe(callback) {
    this[_listeners].add(callback);
  }

  unsubscribe(callback) {
    this[_listeners].delete(callback);
  }

  *[Symbol.iterator]() {
    for (const [key, value] of Object.entries(this[_state])) {
      yield [key, value];
    }
  }
}
*/

