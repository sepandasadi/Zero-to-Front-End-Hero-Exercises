function ChartCard({ title, subtitle }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart Placeholder */}
      <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-3">📊</p>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Chart Placeholder
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Integrate Chart.js, Recharts, or similar library
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-600 rounded-full" />
          <span className="text-gray-600 dark:text-gray-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <span className="text-gray-600 dark:text-gray-400">Previous</span>
        </div>
      </div>
    </div>
  )
}

export default ChartCard

