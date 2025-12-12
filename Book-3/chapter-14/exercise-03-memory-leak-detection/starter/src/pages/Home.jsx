function Home() {
  return (
    <div className="container">
      <h1>Memory Leak Detection Exercise</h1>

      <div className="card">
        <h2>About This Exercise</h2>
        <p>
          The Dashboard page has multiple intentional memory leaks. Your task is to
          find and fix them using Chrome DevTools Memory Profiler.
        </p>

        <h3 style={{ marginTop: '20px' }}>Testing Instructions:</h3>
        <ol style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>Open Chrome DevTools (F12) → Memory tab</li>
          <li>Take a baseline heap snapshot</li>
          <li>Navigate to Dashboard page</li>
          <li>Wait 1-2 minutes</li>
          <li>Navigate away from Dashboard and back (repeat 3 times)</li>
          <li>Force garbage collection (trash icon in Memory tab)</li>
          <li>Take another heap snapshot</li>
          <li>Compare snapshots to find leaks</li>
        </ol>

        <h3 style={{ marginTop: '20px' }}>Leaks to Find:</h3>
        <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>❌ WebSocket connection not closed</li>
          <li>❌ Interval timer not cleared</li>
          <li>❌ Window event listener not removed</li>
          <li>❌ Subscription not unsubscribed</li>
          <li>❌ Data array growing indefinitely</li>
        </ul>
      </div>

      <div className="warning">
        <strong>⚠️ Warning</strong>
        After 10 minutes on the Dashboard, memory usage can exceed 500MB!
      </div>
    </div>
  );
}

export default Home;

