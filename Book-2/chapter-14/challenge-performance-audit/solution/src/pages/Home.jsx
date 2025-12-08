// ✅ OPTIMIZED: Using date-fns instead of moment.js
import { format } from 'date-fns';

function Home() {
  // ✅ OPTIMIZED: Using native JavaScript instead of lodash
  const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
  const unique = [...new Set(numbers)];
  const sum = numbers.reduce((acc, n) => acc + n, 0);

  const today = new Date();

  return (
    <div className="container">
      <h1>
        Performance Challenge
        <span className="success-badge">✅ Optimized: 200KB!</span>
      </h1>

      <div className="card">
        <h2>All Optimizations Applied! 🎉</h2>
        <p>
          This application has been fully optimized using all techniques from Exercises 1-3.
        </p>

        <h3 style={{ marginTop: '20px' }}>Optimizations Applied:</h3>
        <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>✅ Bundle size: < 200KB (was 2.5MB - 92% reduction!)</li>
          <li>✅ Lighthouse Performance: 90+ (was 25)</li>
          <li>✅ Virtualized 10,000-item list with react-window</li>
          <li>✅ React.memo, useMemo, useCallback everywhere</li>
          <li>✅ Replaced moment.js with date-fns (-280KB)</li>
          <li>✅ Replaced lodash with native JS (-250KB)</li>
          <li>✅ Fixed all 5 memory leaks</li>
          <li>✅ Lazy loaded Dashboard (recharts in separate chunk)</li>
          <li>✅ Manual chunk splitting for better caching</li>
          <li>✅ Web Vitals monitoring enabled</li>
        </ul>

        <h3 style={{ marginTop: '20px' }}>Performance Results:</h3>
        <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>✅ LCP: < 2.5s (was 8.5s)</li>
          <li>✅ INP: < 200ms (was 850ms)</li>
          <li>✅ CLS: < 0.1 (was 0.35)</li>
          <li>✅ Memory: Stable < 100MB (was 600MB+)</li>
          <li>✅ Load Time (3G): < 4s (was 15s)</li>
        </ul>
      </div>

      <div className="card">
        <h3>Lightweight Dependencies (20KB vs 550KB)</h3>
        <p>Numbers: {numbers.join(', ')}</p>
        <p>Unique: {unique.join(', ')}</p>
        <p>Sum: {sum}</p>
        <p>Today: {format(today, 'MMMM do yyyy, h:mm:ss a')}</p>
        <p style={{ color: '#28a745', marginTop: '10px' }}>
          ✅ Using 20KB of dependencies (native JS + date-fns)!
        </p>
      </div>

      <div className="success">
        <strong>🎉 Mission Accomplished!</strong>
        <p>Check the browser console to see Web Vitals metrics being tracked.</p>
        <p>Run Lighthouse audit to verify the improvements!</p>
      </div>
    </div>
  );
}

export default Home;

