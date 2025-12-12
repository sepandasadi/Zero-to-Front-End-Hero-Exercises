// Home page - intentionally uses heavy libraries
import moment from 'moment';
import _ from 'lodash';

export default function Home() {
  const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  const numbers = _.range(1, 100);
  const sum = _.sum(numbers);

  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>Current date: {currentDate}</p>
      <p>Sum of 1-99: {sum}</p>

      <div className="info-box">
        <h3>❌ Problems with this app:</h3>
        <ul>
          <li>Uses full moment.js library (230 KB!)</li>
          <li>Uses full lodash library (71 KB!)</li>
          <li>No code splitting - everything loads upfront</li>
          <li>Exceeds performance budget</li>
        </ul>
      </div>

      <div className="info-box">
        <h3>✅ Your task:</h3>
        <ul>
          <li>Run bundle analyzer</li>
          <li>Replace moment.js with date-fns</li>
          <li>Import only needed lodash functions</li>
          <li>Add code splitting</li>
          <li>Meet the budget targets in budget.json</li>
          <li>Set up Lighthouse CI</li>
        </ul>
      </div>
    </div>
  );
}

