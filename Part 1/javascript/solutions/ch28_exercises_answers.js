// Chapter 28 Exercises: Error Handling and Debugging (Answers)

// Exercise 1: Basic Try/Catch
function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.log("Invalid JSON");
    return null;
  } finally {
    // Optional cleanup could go here
  }
}
console.log("safeParse valid:", safeParse('{"ok":true}'));
console.log("safeParse invalid:", safeParse("{bad json"));

// Exercise 2: Custom Error
function validateAge(age) {
  if (typeof age !== "number") {
    throw new Error("Invalid age");
  }
  if (age < 0) {
    throw new Error("Invalid age");
  }
  return true;
}
try {
  validateAge(-3);
  console.log("Age is valid");
} catch (e) {
  console.error(e.message);
}

// Exercise 3: Optional Chaining
function getBio(user) {
  return user?.profile?.bio ?? "No bio";
}
console.log(getBio({ profile: { bio: "Hello!" } })); // "Hello!"
console.log(getBio({})); // "No bio"

// Exercise 4: Console Debugging
function sum(a, b) {
  // Buggy version might have used: return a + c; // 'c' is not defined
  // Debugging:
  // console.log("a:", a, "b:", b);
  // Fix:
  return a + b;
}
console.log("sum(2,3):", sum(2, 3));

// Exercise 5: Use a Breakpoint (DevTools task)
for (let i = 0; i <= 5; i++) {
  // set breakpoint here
  // Inspect 'i' and call stack in DevTools
  console.log("i =", i);
}

// Exercise 6: Defensive Programming
function firstItem(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Expected an array");
  }
  return arr[0];
}
try {
  console.log("firstItem:", firstItem([10, 20, 30]));
  console.log("firstItem:", firstItem("not an array"));
} catch (e) {
  console.error(e.message);
}
