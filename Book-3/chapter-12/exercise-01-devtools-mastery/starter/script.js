// ============================================================================
// PART 1: CONSOLE API DEMOS
// ============================================================================

function basicLogging() {
  console.log('📝 Regular log message');
  console.info('ℹ️ Info message');
  console.warn('⚠️ Warning message');
  console.error('❌ Error message');
  console.debug('🐛 Debug message');

  console.log('%c✅ Task Complete!', 'color: green; font-size: 16px; font-weight: bold;');
}

function tableDemo() {
  const users = [
    { id: 1, name: 'Alice', role: 'Developer', age: 28 },
    { id: 2, name: 'Bob', role: 'Designer', age: 32 },
    { id: 3, name: 'Charlie', role: 'Manager', age: 35 },
    { id: 4, name: 'Diana', role: 'Developer', age: 26 }
  ];

  console.log('Regular log:');
  console.log(users);

  console.log('\nTable format:');
  console.table(users);

  console.log('\nTable with specific columns:');
  console.table(users, ['name', 'role']);
}

function groupingDemo() {
  console.group('🔐 User Authentication');
  console.log('Step 1: Validating credentials');
  console.log('Step 2: Checking database');

  console.group('📦 Database Query');
  console.log('SELECT * FROM users WHERE email = "user@example.com"');
  console.log('Query completed in 45ms');
  console.groupEnd();

  console.log('Step 3: Generating token');
  console.log('✅ Authentication successful!');
  console.groupEnd();

  console.groupCollapsed('📊 Performance Metrics (collapsed)');
  console.log('Total time: 127ms');
  console.log('Database queries: 2');
  console.log('Cache hits: 5');
  console.groupEnd();
}

function timingDemo() {
  console.log('⏱️ Starting timing demo...');

  console.time('Array Operation');
  const numbers = Array.from({ length: 1000000 }, (_, i) => i);
  const doubled = numbers.map(n => n * 2);
  console.timeEnd('Array Operation');

  console.time('Loop Operation');
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  console.timeEnd('Loop Operation');

  console.log('Result:', sum);
}

function customLogger() {
  const logger = {
    debug: (msg, data) => {
      console.log('%c🐛 DEBUG', 'background: #e3f2fd; color: #1976d2; padding: 2px 6px; border-radius: 3px;', msg, data || '');
    },
    info: (msg, data) => {
      console.log('%cℹ️ INFO', 'background: #e8f5e9; color: #388e3c; padding: 2px 6px; border-radius: 3px;', msg, data || '');
    },
    warn: (msg, data) => {
      console.log('%c⚠️ WARN', 'background: #fff3e0; color: #f57c00; padding: 2px 6px; border-radius: 3px;', msg, data || '');
    },
    error: (msg, data) => {
      console.log('%c❌ ERROR', 'background: #ffebee; color: #c62828; padding: 2px 6px; border-radius: 3px;', msg, data || '');
    }
  };

  logger.debug('Starting application', { version: '1.0.0' });
  logger.info('User logged in', { userId: 123, email: 'user@example.com' });
  logger.warn('API rate limit approaching', { remaining: 10, limit: 100 });
  logger.error('Payment failed', { reason: 'Insufficient funds', amount: 99.99 });
}

function styledOutput() {
  console.log('%c 🚀 APPLICATION STARTED ',
    'font-size: 20px; font-weight: bold; color: white; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); padding: 10px 20px; border-radius: 5px;'
  );

  console.log(
    '%cSuccess: %cOperation completed successfully!',
    'color: green; font-weight: bold;',
    'color: black;'
  );

  console.log(`
  ╔═══════════════════════════════╗
  ║   Welcome to DevTools Demo    ║
  ║                               ║
  ║   Learn • Practice • Master   ║
  ╚═══════════════════════════════╝
  `);
}

// ============================================================================
// PART 2: NETWORK REQUESTS
// ============================================================================

const output = document.getElementById('network-output');

function fetchUsers() {
  output.innerHTML = '<p>⏳ Fetching users...</p>';

  fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    .then(res => res.json())
    .then(users => {
      output.innerHTML = `<p>✅ Fetched ${users.length} users. Check Network tab!</p>`;
      console.log('Users loaded:', users);
      console.table(users.map(u => ({ id: u.id, name: u.name, email: u.email })));
    })
    .catch(err => {
      output.innerHTML = `<p>❌ Error: ${err.message}</p>`;
    });
}

function createUser() {
  output.innerHTML = '<p>⏳ Creating user...</p>';

  const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  };

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .then(data => {
      output.innerHTML = `<p>✅ User created with ID: ${data.id}. Check Network tab (POST request)!</p>`;
      console.log('Created user:', data);
    });
}

function slowRequest() {
  output.innerHTML = '<p>⏳ Making slow request (3 seconds)...</p>';

  const start = performance.now();

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=100')
    .then(res => {
      // Simulate slow processing
      return new Promise(resolve => {
        setTimeout(() => resolve(res.json()), 2000);
      });
    })
    .then(data => {
      const duration = Math.round(performance.now() - start);
      output.innerHTML = `<p>✅ Slow request completed in ${duration}ms. Check Network tab timing!</p>`;
      console.log(`Request took ${duration}ms`);
    });
}

function failedRequest() {
  output.innerHTML = '<p>⏳ Making request that will fail...</p>';

  fetch('https://jsonplaceholder.typicode.com/nonexistent')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .catch(err => {
      output.innerHTML = `<p>❌ Request failed: ${err.message}. Check Network tab (red/failed)!</p>`;
      console.error('Request failed:', err);
    });
}

// ============================================================================
// PART 3: STORAGE DEMOS
// ============================================================================

const storageOutput = document.getElementById('storage-output');

function setLocalStorage() {
  localStorage.setItem('username', 'JohnDoe');
  localStorage.setItem('theme', 'dark');
  localStorage.setItem('settings', JSON.stringify({
    notifications: true,
    language: 'en',
    timezone: 'UTC'
  }));

  storageOutput.innerHTML = `
    <p>✅ localStorage set! Open Application tab → Local Storage to see:</p>
    <ul>
      <li>username: "JohnDoe"</li>
      <li>theme: "dark"</li>
      <li>settings: (JSON object)</li>
    </ul>
  `;
}

function getLocalStorage() {
  const username = localStorage.getItem('username');
  const theme = localStorage.getItem('theme');
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');

  console.group('📦 localStorage Contents');
  console.log('username:', username);
  console.log('theme:', theme);
  console.log('settings:', settings);
  console.groupEnd();

  storageOutput.innerHTML = `
    <p>✅ Read from localStorage (check console):</p>
    <pre>${JSON.stringify({ username, theme, settings }, null, 2)}</pre>
  `;
}

function setSessionStorage() {
  sessionStorage.setItem('sessionId', 'abc123xyz');
  sessionStorage.setItem('tempData', 'This will be cleared when tab closes');

  storageOutput.innerHTML = `
    <p>✅ sessionStorage set! Open Application tab → Session Storage to see:</p>
    <ul>
      <li>sessionId: "abc123xyz"</li>
      <li>tempData: "This will be cleared..."</li>
    </ul>
    <p><small>💡 sessionStorage is cleared when you close the tab</small></p>
  `;
}

function setCookie() {
  document.cookie = "userId=12345; max-age=3600; path=/";
  document.cookie = "preferences=darkmode; max-age=3600; path=/";

  storageOutput.innerHTML = `
    <p>✅ Cookies set! Open Application tab → Cookies to see:</p>
    <ul>
      <li>userId: "12345"</li>
      <li>preferences: "darkmode"</li>
    </ul>
    <p><small>💡 Check the Expires/Max-Age column</small></p>
  `;
}

function clearAllStorage() {
  localStorage.clear();
  sessionStorage.clear();

  // Clear cookies
  document.cookie.split(";").forEach(c => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  storageOutput.innerHTML = `
    <p>✅ All storage cleared! Refresh Application tab to verify.</p>
    <p><small>💡 localStorage, sessionStorage, and cookies are now empty</small></p>
  `;
}

// ============================================================================
// PART 4: PERFORMANCE DEMOS
// ============================================================================

const performanceOutput = document.getElementById('performance-output');

function heavyTask() {
  console.time('Heavy Task');
  performanceOutput.innerHTML = '<p>⏳ Running heavy task... (Record this in Performance tab!)</p>';

  const loadingBar = document.querySelector('.loading-bar');
  loadingBar.classList.add('active');

  // Simulate heavy computation (blocks main thread)
  setTimeout(() => {
    const start = performance.now();

    // Heavy computation
    let result = 0;
    for (let i = 0; i < 50000000; i++) {
      result += Math.sqrt(i) * Math.random();
    }

    const duration = Math.round(performance.now() - start);
    console.timeEnd('Heavy Task');

    performanceOutput.innerHTML = `
      <p>✅ Heavy task completed in ${duration}ms</p>
      <p><small>💡 This blocked the main thread. Check Performance tab to see the long task!</small></p>
    `;

    loadingBar.classList.remove('active');
  }, 100);
}

function lightTask() {
  console.time('Light Task');
  performanceOutput.innerHTML = '<p>⏳ Running light task...</p>';

  const start = performance.now();

  // Light computation
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(n => n * 2);

  const duration = Math.round(performance.now() - start);
  console.timeEnd('Light Task');

  performanceOutput.innerHTML = `
    <p>✅ Light task completed in ${duration}ms (very fast!)</p>
    <p>Result: ${doubled.join(', ')}</p>
  `;
}

function animationTask() {
  performanceOutput.innerHTML = '<p>Running animation... (Record to see FPS)</p>';

  const box = performanceOutput;
  let position = 0;
  let frameCount = 0;
  const startTime = performance.now();

  function animate() {
    position += 2;
    box.style.transform = `translateX(${position % 400}px)`;

    frameCount++;

    if (frameCount < 120) {  // Run for ~2 seconds
      requestAnimationFrame(animate);
    } else {
      const duration = performance.now() - startTime;
      const fps = Math.round((frameCount / duration) * 1000);

      box.style.transform = '';
      performanceOutput.innerHTML = `
        <p>✅ Animation complete!</p>
        <p>Frames: ${frameCount} | Duration: ${Math.round(duration)}ms | FPS: ${fps}</p>
        <p><small>💡 Check Performance tab to see frame timing</small></p>
      `;
    }
  }

  requestAnimationFrame(animate);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

console.log('%c👋 Welcome to DevTools Mastery!',
  'font-size: 24px; font-weight: bold; color: #667eea;'
);

console.log(`
%cInstructions:%c
1. Open the Console tab (you're already here!)
2. Click the buttons in the app
3. Practice using different console methods
4. Explore the Elements, Network, Application, and Performance tabs
5. Complete all the exercises in GETTING_STARTED.md

%cGood luck! 🚀`,
  'font-weight: bold; color: #667eea;',
  'color: #666;',
  'font-weight: bold; color: #27ae60;'
);

// Set some initial storage for demo
if (!localStorage.getItem('username')) {
  localStorage.setItem('username', 'DemoUser');
  localStorage.setItem('visits', '1');
}

// Log page load performance
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.group('📊 Page Load Performance');
  console.log('DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd), 'ms');
  console.log('Load Complete:', Math.round(perfData.loadEventEnd), 'ms');
  console.log('Response Time:', Math.round(perfData.responseEnd - perfData.requestStart), 'ms');
  console.groupEnd();
});


