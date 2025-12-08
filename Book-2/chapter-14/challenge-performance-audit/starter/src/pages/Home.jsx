// ❌ BAD: Using heavy lodash
import _ from 'lodash';
// ❌ BAD: Using heavy moment.js
import moment from 'moment';

function Home() {
  const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
  const unique = _.uniq(numbers);
  const sum = _.sum(numbers);

  const today = moment();

  return (
    <div className="container">
      <h1>
        Performance Challenge
        <span className="warning-badge">🚨 Bundle: 2.5MB!</span>
      </h1>

      <div className="card">
        <h2>Welcome to the Performance Audit Challenge</h2>
        <p>
          This application has been intentionally designed with severe performance issues
          to test your optimization skills.
        </p>

        <h3 style={{ marginTop: '20px' }}>Current Problems:</h3>
        <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>❌ Bundle size: 2.5MB (should be < 200KB)</li>
          <li>❌ Lighthouse Performance: 25/100 (should be 90+)</li>
          <li>❌ 10,000-item list without virtualization</li>
          <li>❌ No React.memo, useMemo, or useCallback</li>
          <li>❌ Heavy dependencies (moment.js, lodash)</li>
          <li>❌ Multiple memory leaks</li>
          <li>❌ No code splitting or lazy loading</li>
          <li>❌ No performance monitoring</li>
        </ul>

        <h3 style={{ marginTop: '20px' }}>Your Mission:</h3>
        <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>✅ Achieve Lighthouse Performance 90+</li>
          <li>✅ Reduce bundle to < 200KB</li>
          <li>✅ Fix all memory leaks</li>
          <li>✅ Optimize React rendering</li>
          <li>✅ Set up production monitoring</li>
          <li>✅ Configure Lighthouse CI</li>
        </ul>
      </div>

      <div className="card">
        <h3>Example of Bloat (lodash + moment.js)</h3>
        <p>Numbers: {numbers.join(', ')}</p>
        <p>Unique: {unique.join(', ')}</p>
        <p>Sum: {sum}</p>
        <p>Today: {today.format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p style={{ color: '#dc3545', marginTop: '10px' }}>
          ⚠️ Using 550KB of dependencies for simple operations!
        </p>
      </div>

      <div className="warning">
        <strong>⏰ Estimated Time: 10-12 hours</strong>
        This is a comprehensive challenge combining all concepts from Exercises 1-3.
        Work systematically through each phase for best results!
      </div>
    </div>
  );
}

export default Home;

