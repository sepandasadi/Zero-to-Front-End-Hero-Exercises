// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Safely get user's city
function getUserCity(user) {
  // Use optional chaining to access user?.address?.city
  // Return 'Unknown' if city doesn't exist
}

// TODO: Safely get array element
function getFirstPost(posts) {
  // Safely access posts?.[0]?.title
  // Return 'No posts' if not found
}

// TODO: Get value with correct default
function getCount(data) {
  // Use ?? to return data.count, but 'No data' only for null/undefined
  // Note: 0 should be a valid count!
}

// TODO: Combine both operators
function getProductPrice(product) {
  // Return product?.pricing?.discounted ?? product?.pricing?.regular ?? 'Price not available'
}

// ==========================================
// TEST FUNCTIONS
// ==========================================

function testOptionalChaining() {
  const output = document.getElementById('chaining-output');
  output.innerHTML = '';

  const user1 = {
    name: 'Alice',
    address: {
      city: 'San Diego',
      zip: 92101
    }
  };

  const user2 = {
    name: 'Bob'
    // No address
  };

  const user3 = {
    name: 'Charlie',
    address: {
      // No city
      zip: 90210
    }
  };

  const city1 = getUserCity(user1);
  const city2 = getUserCity(user2);
  const city3 = getUserCity(user3);

  output.innerHTML += `User 1 city: ${city1}\n`;
  output.innerHTML += `User 2 city: ${city2}\n`;
  output.innerHTML += `User 3 city: ${city3}\n\n`;

  if (city1 === 'San Diego' && city2 === 'Unknown' && city3 === 'Unknown') {
    output.innerHTML += '<span class="success">✅ Optional chaining works!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Check your optional chaining</span>';
  }
}

function testNullishCoalescing() {
  const output = document.getElementById('nullish-output');
  output.innerHTML = '';

  const data1 = { count: 0 };
  const data2 = { count: null };
  const data3 = { count: undefined };
  const data4 = { count: 5 };

  const count1 = getCount(data1);
  const count2 = getCount(data2);
  const count3 = getCount(data3);
  const count4 = getCount(data4);

  output.innerHTML += `Count (0): ${count1}\n`;
  output.innerHTML += `Count (null): ${count2}\n`;
  output.innerHTML += `Count (undefined): ${count3}\n`;
  output.innerHTML += `Count (5): ${count4}\n\n`;

  if (count1 === 0 && count2 === 'No data' && count3 === 'No data' && count4 === 5) {
    output.innerHTML += '<span class="success">✅ Nullish coalescing perfect! 0 is treated as valid.</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Use ?? not || (0 should be valid!)</span>';
  }
}

function testCombined() {
  const output = document.getElementById('combined-output');
  output.innerHTML = '';

  const product1 = {
    name: 'Laptop',
    pricing: {
      regular: 999,
      discounted: 799
    }
  };

  const product2 = {
    name: 'Mouse',
    pricing: {
      regular: 29
      // No discount
    }
  };

  const product3 = {
    name: 'Cable'
    // No pricing
  };

  const price1 = getProductPrice(product1);
  const price2 = getProductPrice(product2);
  const price3 = getProductPrice(product3);

  output.innerHTML += `${product1.name}: $${price1}\n`;
  output.innerHTML += `${product2.name}: $${price2}\n`;
  output.innerHTML += `${product3.name}: ${price3}\n\n`;

  if (price1 === 799 && price2 === 29 && price3 === 'Price not available') {
    output.innerHTML += '<span class="success">✅ Combined operators work perfectly!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Check your chaining and coalescing</span>';
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
function getUserCity(user) {
  return user?.address?.city ?? 'Unknown';
}

function getFirstPost(posts) {
  return posts?.[0]?.title ?? 'No posts';
}

function getCount(data) {
  return data.count ?? 'No data';
}

function getProductPrice(product) {
  return product?.pricing?.discounted ?? product?.pricing?.regular ?? 'Price not available';
}
*/

