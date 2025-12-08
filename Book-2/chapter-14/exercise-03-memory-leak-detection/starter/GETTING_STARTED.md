# Getting Started - Exercise 3: Memory Leak Detection & Fix

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

Open http://localhost:5173

## Your Task

Find and fix **5 intentional memory leaks** in the Dashboard component.

### Step 1: Measure Baseline

1. Open Chrome DevTools (F12)
2. Go to **Memory** tab
3. Select **Heap snapshot**
4. Click **Take snapshot** (label it "Baseline")

### Step 2: Let Leaks Accumulate

1. Navigate to **Dashboard** page
2. Let it run for **1-2 minutes**
3. Navigate back to Home
4. Navigate to Dashboard again
5. Repeat 3 times (mount/unmount cycle)

### Step 3: Force Garbage Collection

1. In Memory tab, click the **trash can icon** (🗑️)
2. This clears temporary objects
3. Any remaining growth is a real leak!

### Step 4: Take Second Snapshot

1. Click **Take snapshot** again
2. Label it "After Leaks"
3. In dropdown, select **Comparison**
4. Compare "After Leaks" vs "Baseline"

### Step 5: Analyze the Leaks

Look for:
- **Detached DOM nodes** - Elements removed but still in memory
- **Growing arrays** - Data accumulating without cleanup
- **Event listeners** - Multiplying on each mount
- **Timers** - Intervals/timeouts still running

### Step 6: Fix the Leaks

For each `useEffect` that creates resources:
1. Identify what needs cleanup
2. Return a cleanup function
3. Clean up properly (close, clear, remove, unsubscribe)

### Step 7: Verify Fixes

Repeat steps 1-4 with your fixes:
- Memory should stay stable
- No detached DOM nodes
- Event listener count doesn't grow
- Data arrays stay bounded

## Memory Leaks to Find

1. ❌ **WebSocket**: Connection stays open after unmount
2. ❌ **Interval**: Clock keeps running after unmount
3. ❌ **Event Listener**: Resize listener never removed
4. ❌ **Subscription**: Data service subscription never ended
5. ❌ **Array Growth**: Data arrays grow without limit

## Success Criteria

After fixes:
- ✅ Memory stable after 10 minutes (< 100MB)
- ✅ Zero detached DOM nodes
- ✅ Event listener count stable
- ✅ Data arrays capped (max 100 items)

## Tips

- Use console logs to verify cleanup functions run
- Check Chrome DevTools Performance tab for memory graph
- Test by mounting/unmounting Dashboard 10+ times

Good luck hunting those leaks! 🐛🔍

