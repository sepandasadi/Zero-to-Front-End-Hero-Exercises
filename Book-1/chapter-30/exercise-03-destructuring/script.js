// ==========================================
// YOUR CODE HERE
// ==========================================

// TODO: Implement array destructuring
function destructureArray(numbers) {
  // Extract first, second, and rest
  // Return: { first, second, rest }
}

// TODO: Implement object destructuring with defaults
function destructureUser(user) {
  // Extract name, age (default 18), email
  // Return: { name, age, email }
}

// TODO: Implement nested destructuring
function destructureNested(data) {
  // Extract: user.name, user.address.city, user.address.zip
  // Return: { name, city, zip }
}

// TODO: Create function with destructured parameters
function greetUser(/* destructure here: name, age, country = 'Unknown' */) {
  // Return greeting string using destructured params
}

// TODO: Destructure API response
function extractPostData(apiResponse) {
  // Extract: data.post.title, data.post.author.name, data.comments (array length)
  // Return: { title, authorName, commentCount }
}

// ==========================================
// TEST FUNCTIONS
// ==========================================

function testArrayDestructuring() {
  const numbers = [10, 20, 30, 40, 50];
  const result = destructureArray(numbers);

  const output = document.getElementById('array-output');
  output.innerHTML = `Input: [${numbers}]\n\n`;
  output.innerHTML += `First: ${result?.first}\n`;
  output.innerHTML += `Second: ${result?.second}\n`;
  output.innerHTML += `Rest: [${result?.rest}]\n\n`;

  if (result?.first === 10 && result?.second === 20 && result?.rest?.length === 3) {
    output.innerHTML += '<span class="success">✅ Perfect!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Not quite right. Check your destructuring.</span>';
  }
}

function testObjectDestructuring() {
  const user1 = { name: 'Alice', age: 25, email: 'alice@example.com' };
  const user2 = { name: 'Bob', email: 'bob@example.com' }; // No age

  const result1 = destructureUser(user1);
  const result2 = destructureUser(user2);

  const output = document.getElementById('object-output');
  output.innerHTML = 'User 1 (with age):\n';
  output.innerHTML += `  Name: ${result1?.name}\n`;
  output.innerHTML += `  Age: ${result1?.age}\n`;
  output.innerHTML += `  Email: ${result1?.email}\n\n`;

  output.innerHTML += 'User 2 (no age, should default to 18):\n';
  output.innerHTML += `  Name: ${result2?.name}\n`;
  output.innerHTML += `  Age: ${result2?.age}\n`;
  output.innerHTML += `  Email: ${result2?.email}\n\n`;

  if (result2?.age === 18) {
    output.innerHTML += '<span class="success">✅ Default value works!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Default value not set correctly.</span>';
  }
}

function testFunctionParams() {
  const greeting1 = greetUser({ name: 'Alice', age: 25, country: 'USA' });
  const greeting2 = greetUser({ name: 'Bob', age: 30 }); // No country

  const output = document.getElementById('function-output');
  output.innerHTML = `Greeting 1: ${greeting1 || 'Not implemented'}\n`;
  output.innerHTML += `Greeting 2: ${greeting2 || 'Not implemented'}\n\n`;

  if (greeting1 && greeting2 && greeting2.includes('Unknown')) {
    output.innerHTML += '<span class="success">✅ Function destructuring works!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Check your function parameters.</span>';
  }
}

function testAPIResponse() {
  const apiResponse = {
    data: {
      post: {
        id: 1,
        title: 'Learning Destructuring',
        author: {
          name: 'Alice Johnson',
          email: 'alice@example.com'
        }
      },
      comments: [
        { id: 1, text: 'Great post!' },
        { id: 2, text: 'Very helpful!' },
        { id: 3, text: 'Thanks!' }
      ]
    }
  };

  const result = extractPostData(apiResponse);

  const output = document.getElementById('api-output');
  output.innerHTML = 'Extracted Data:\n';
  output.innerHTML += `  Title: ${result?.title}\n`;
  output.innerHTML += `  Author: ${result?.authorName}\n`;
  output.innerHTML += `  Comments: ${result?.commentCount}\n\n`;

  if (result?.title && result?.authorName === 'Alice Johnson' && result?.commentCount === 3) {
    output.innerHTML += '<span class="success">✅ API destructuring perfect!</span>';
  } else {
    output.innerHTML += '<span class="error">❌ Check your nested destructuring.</span>';
  }
}

// ==========================================
// SOLUTION (uncomment to see)
// ==========================================

/*
function destructureArray(numbers) {
  const [first, second, ...rest] = numbers;
  return { first, second, rest };
}

function destructureUser(user) {
  const { name, age = 18, email } = user;
  return { name, age, email };
}

function destructureNested(data) {
  const { user: { name, address: { city, zip } } } = data;
  return { name, city, zip };
}

function greetUser({ name, age, country = 'Unknown' }) {
  return `Hello, ${name}! You are ${age} years old from ${country}.`;
}

function extractPostData(apiResponse) {
  const {
    data: {
      post: { title, author: { name: authorName } },
      comments
    }
  } = apiResponse;

  return {
    title,
    authorName,
    commentCount: comments.length
  };
}
*/

