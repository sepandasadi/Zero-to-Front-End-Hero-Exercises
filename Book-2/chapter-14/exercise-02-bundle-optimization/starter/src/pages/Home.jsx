// ❌ BAD: Importing entire lodash library
import _ from 'lodash';

function Home() {
  const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];

  // Using lodash for simple operations
  const unique = _.uniq(numbers);
  const sum = _.sum(numbers);
  const max = _.max(numbers);

  return (
    <div className="container">
      <h1>
        Welcome Home
        <span className="badge">Bundle: 1.8MB+ 😱</span>
      </h1>

      <div className="card">
        <h2>About This App</h2>
        <p>
          This application is intentionally bloated with heavy dependencies to demonstrate
          bundle optimization techniques.
        </p>
        <p style={{ marginTop: '15px' }}>
          Current issues:
        </p>
        <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
          <li>❌ Uses moment.js (300KB) instead of lightweight alternatives</li>
          <li>❌ Imports entire lodash library instead of specific functions</li>
          <li>❌ No code splitting for heavy components (recharts)</li>
          <li>❌ Vendor code and app code bundled together</li>
          <li>❌ No tree shaking optimization</li>
        </ul>
      </div>

      <div className="card">
        <h3>Lodash Example (unnecessarily heavy)</h3>
        <p>Numbers: {numbers.join(', ')}</p>
        <p>Unique: {unique.join(', ')}</p>
        <p>Sum: {sum}</p>
        <p>Max: {max}</p>
      </div>
    </div>
  );
}

export default Home;

