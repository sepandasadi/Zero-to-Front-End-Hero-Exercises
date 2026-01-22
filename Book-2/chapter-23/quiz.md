# Chapter 23: Testing Your JavaScript - Quiz

## Multiple Choice
**1. What is Jest?** a) JavaScript framework b) Testing framework c) Build tool d) Linter | **Answer**: b
**2. What is TDD?** a) Test-Driven Development b) Type-Driven Design c) Test Data Dump d) Technical Debt Detection | **Answer**: a
**3. What does `.toBe()` check?** a) Type only b) Value equality with === c) Deep equality d) Truthiness | **Answer**: b
**4. What is a mock?** a) Real function b) Fake implementation for testing c) Error handler d) Test file | **Answer**: b
**5. What is code coverage?** a) Test speed b) Percentage of code tested c) Number of tests d) Test complexity | **Answer**: b

## True/False
**6. Tests should test implementation details.** **Answer**: False (test behavior)
**7. jest.fn() creates a mock function.** **Answer**: True
**8. You should test private functions directly.** **Answer**: False
**9. 100% coverage guarantees no bugs.** **Answer**: False
**10. TDD means writing tests before code.** **Answer**: True

## Code Output
**11. What passes?** `expect(2 + 2).toBe(4)` **Answer**: Passes
**12. What passes?** `expect([1,2]).toEqual([1,2])` **Answer**: Passes
**13. What happens?** `const mock = jest.fn(); mock(); expect(mock).toHaveBeenCalled()` **Answer**: Passes
**14. Async test?** `test('async', async () => { const result = await fetchData(); expect(result).toBe('data'); })` **Answer**: Valid async test
**15. TDD cycle?** **Answer**: Red (write failing test) → Green (make it pass) → Refactor
