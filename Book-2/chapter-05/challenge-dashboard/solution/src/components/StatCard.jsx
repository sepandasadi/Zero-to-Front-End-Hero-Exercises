function StatCard({ title, value, change, icon, trend = 'up' }) {
  const isPositive = trend === 'up'

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </p>
          <div className="flex items-center gap-1">
            <span className={`text-sm font-medium ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? '↑' : '↓'} {change}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              vs last month
            </span>
          </div>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  )
}

export default StatCard

