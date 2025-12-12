// Placeholder for chart - in real app would use lightweight chart library
export default function SalesChart() {
  return (
    <div className="chart-container">
      <h3>Sales Analytics</h3>
      <div className="chart-placeholder">
        <p>📊 Chart component (lazy loaded!)</p>
        <p>In production, use a lightweight library like Chart.js or recharts</p>
        <p>Only ~30 KB when lazy loaded vs. loading upfront</p>
      </div>
    </div>
  );
}

