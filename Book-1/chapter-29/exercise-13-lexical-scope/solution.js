// Exercise 13: Lexical Scope - SOLUTION

console.log("=== Exercise 13: Lexical Scope ===\n");

function outer() {
  const outerVar = 'I am from outer';

  function middle() {
    const middleVar = 'I am from middle';

    function inner() {
      const innerVar = 'I am from inner';
      console.log(outerVar);   // Can access
      console.log(middleVar);  // Can access
      console.log(innerVar);   // Can access
    }

    inner();
  }

  middle();
}

console.log("--- Nested Scope Access ---");
outer();

console.log("\n--- Variable Shadowing ---");
function shadowing() {
  const x = 10;

  function inner() {
    const x = 20;  // Shadows outer x
    console.log('Inner x:', x);  // 20
  }

  inner();
  console.log('Outer x:', x);  // 10
}

shadowing();

console.log("\n✅ Complete! Inner functions can access outer variables (lexical scope).");

