# Chapter 12 — Debugging Drills (Questions)

1) **safeDivide(a, b)** 

   - Write input guards and throw a clear error for divide-by-zero. 

   - Add logs showing inputs and the computed result.

2) **dedupeUsers(arr)** 

   - Remove duplicates based on `id`. Skip malformed entries but warn.

3) **retryFetch(url, n)** 

   - Implement retries with exponential backoff and a 5s timeout per attempt.

4) **leakyListener()** 

   - Create a minimal repro of an event-listener leak; then add a fix using event delegation or teardown.

5) **findLayoutThrash(el)** 

   - Detect a read-write-read pattern and refactor to batch reads/writes.
