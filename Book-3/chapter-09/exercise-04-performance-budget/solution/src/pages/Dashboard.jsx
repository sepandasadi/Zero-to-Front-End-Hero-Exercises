import sumBy from 'lodash/sumBy';
import meanBy from 'lodash/meanBy';
import times from 'lodash/times';
import random from 'lodash/random';

const data = times(20, (i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: random(100, 1000)
}));

export default function Dashboard() {
  const total = sumBy(data, 'value');
  const average = meanBy(data, 'value');

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p className="stat-value">{total}</p>
        </div>
        <div className="stat-card">
          <h3>Average</h3>
          <p className="stat-value">{average.toFixed(2)}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="info-box">
        <p>✅ This page is code-split and only loads when you navigate here!</p>
        <p>✅ Using individual lodash imports instead of full library</p>
      </div>
    </div>
  );
}

