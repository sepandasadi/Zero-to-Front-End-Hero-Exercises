// Exercise 2: Custom Errors - SOLUTION

function withdraw(balance, amount) {
  // Validate amount is not negative
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }

  // Validate sufficient funds
  if (amount > balance) {
    throw new Error('Insufficient funds');
  }

  // Validate amount is a number
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }

  // Valid withdrawal
  return balance - amount;
}

// Test cases
console.log('=== Test 1: Valid Withdrawal ===');
try {
  const newBalance = withdraw(100, 50);
  console.log('✅ Success! New balance:', newBalance);
} catch (e) {
  console.error('❌ Error:', e.message);
}

console.log('\n=== Test 2: Negative Amount ===');
try {
  withdraw(100, -10);
  console.log('❌ Should have thrown an error!');
} catch (e) {
  console.log('✅ Correctly caught error:', e.message);
}

console.log('\n=== Test 3: Insufficient Funds ===');
try {
  withdraw(100, 150);
  console.log('❌ Should have thrown an error!');
} catch (e) {
  console.log('✅ Correctly caught error:', e.message);
}

console.log('\n=== Test 4: Invalid Input ===');
try {
  withdraw(100, 'fifty');
  console.log('❌ Should have thrown an error!');
} catch (e) {
  console.log('✅ Correctly caught error:', e.message);
}

// ========================================
// BONUS: BankAccount Class
// ========================================

class BankAccount {
  constructor(initialBalance = 0) {
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }

    this.balance += amount;
    this.transactions.push({
      type: 'deposit',
      amount,
      balance: this.balance,
      timestamp: new Date()
    });

    return this.balance;
  }

  withdraw(amount) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }

    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }

    this.balance -= amount;
    this.transactions.push({
      type: 'withdrawal',
      amount,
      balance: this.balance,
      timestamp: new Date()
    });

    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  getTransactionHistory() {
    return this.transactions;
  }
}

console.log('\n=== Bonus: BankAccount Class ===');
const account = new BankAccount(100);

try {
  account.deposit(50);
  console.log('After deposit:', account.getBalance());

  account.withdraw(30);
  console.log('After withdrawal:', account.getBalance());

  console.log('Transaction history:', account.getTransactionHistory());
} catch (e) {
  console.error('Error:', e.message);
}


