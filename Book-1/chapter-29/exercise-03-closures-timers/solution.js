// Exercise 3: Closures with Timers - SOLUTION

console.log("=== Exercise 3: Closures with Timers ===\n");

console.log("--- THE BUG (commented out - would print 5,5,5,5,5) ---");
console.log("Explanation: All callbacks share the same 'i' variable.");
console.log("By the time setTimeout runs, the loop is done and i = 5\n");

/* THE BUG:
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);  // All closures reference the same 'i'
  }, 1000);
}
// Prints: 5, 5, 5, 5, 5
*/

// FIX 1: Use IIFE (Immediately Invoked Function Expression)
console.log("--- Fix 1: IIFE ---");
for (var i = 0; i < 5; i++) {
  (function(j) {  // j captures current value of i
    setTimeout(() => {
      console.log('IIFE:', j);
    }, i * 100);  // Stagger the delays
  })(i);
}

// FIX 2: Use let (creates new binding per iteration)
console.log("\n--- Fix 2: let (block scope) ---");
for (let i = 0; i < 5; i++) {  // 'let' creates new 'i' each iteration
  setTimeout(() => {
    console.log('let:', i);
  }, i * 100 + 600);  // Offset from IIFE
}

// FIX 3: Pass as parameter to setTimeout
console.log("\n--- Fix 3: setTimeout parameter ---");
for (var i = 0; i < 5; i++) {
  setTimeout((num) => {
    console.log('param:', num);
  }, i * 100 + 1200, i);  // Pass i as third argument
}

// FIX 4: Use bind
console.log("\n--- Fix 4: bind ---");
for (var i = 0; i < 5; i++) {
  setTimeout(function(num) {
    console.log('bind:', num);
  }.bind(null, i), i * 100 + 1800);
}

setTimeout(() => {
  console.log("\n=== Bonus Challenges ===\n");

  // Bonus 1: Countdown Timer
  console.log("--- Bonus 1: Countdown Timer ---");

  function createCountdown(start, onTick, onComplete) {
    let count = start;

    const timer = setInterval(() => {
      onTick(count);
      count--;

      if (count < 0) {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return {
      cancel() {
        clearInterval(timer);
      }
    };
  }

  const countdown = createCountdown(
    3,
    (count) => console.log(`Countdown: ${count}`),
    () => console.log('Countdown: Blast off! 🚀')
  );

  setTimeout(() => {
    console.log("\n--- Bonus 2: Task Scheduler ---");

    // Bonus 2: Schedule tasks with delays
    function createScheduler() {
      const tasks = [];

      return {
        schedule(fn, delay) {
          const id = setTimeout(() => {
            fn();
            // Remove from tasks array
            const index = tasks.findIndex(t => t.id === id);
            if (index > -1) tasks.splice(index, 1);
          }, delay);

          tasks.push({ id, fn, delay });
          return id;
        },

        cancel(id) {
          clearTimeout(id);
          const index = tasks.findIndex(t => t.id === id);
          if (index > -1) tasks.splice(index, 1);
        },

        cancelAll() {
          tasks.forEach(task => clearTimeout(task.id));
          tasks.length = 0;
        },

        getPending() {
          return tasks.length;
        }
      };
    }

    const scheduler = createScheduler();

    scheduler.schedule(() => console.log('Task 1 executed'), 500);
    scheduler.schedule(() => console.log('Task 2 executed'), 1000);
    const task3 = scheduler.schedule(() => console.log('Task 3 (cancelled)'), 1500);

    console.log(`Pending tasks: ${scheduler.getPending()}`); // 3

    scheduler.cancel(task3);
    console.log(`After cancel: ${scheduler.getPending()}`);  // 2

    setTimeout(() => {
      console.log("\n--- Bonus 3: Rate Limiter ---");

      // Bonus 3: Rate limiter
      function createRateLimiter(limit, interval) {
        let calls = [];

        return function(fn) {
          const now = Date.now();

          // Remove old calls outside the interval
          calls = calls.filter(time => now - time < interval);

          if (calls.length < limit) {
            calls.push(now);
            fn();
            return true;
          } else {
            console.log('Rate limit exceeded! Call blocked.');
            return false;
          }
        };
      }

      // Allow 3 calls per second
      const rateLimiter = createRateLimiter(3, 1000);

      // Try to make 5 calls
      for (let i = 0; i < 5; i++) {
        rateLimiter(() => console.log(`API call ${i + 1} executed`));
      }

      setTimeout(() => {
        console.log("\n✅ All Exercises Complete!");
        console.log("\n📚 Key Takeaways:");
        console.log("• Closures capture variables by REFERENCE, not value");
        console.log("• var has function scope, let has block scope");
        console.log("• IIFE creates immediate scope");
        console.log("• setTimeout runs AFTER the loop completes");
        console.log("• Understanding the event loop is crucial!");
      }, 2000);

    }, 2000);

  }, 5000);

}, 2500);

