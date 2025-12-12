# Challenge: Modern Dashboard - Hints

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx       # Navigation sidebar
│   ├── Header.jsx        # Top header with user menu
│   ├── StatCard.jsx      # Stats display card
│   ├── DataTable.jsx     # Table component
│   └── ChartCard.jsx     # Chart placeholder
├── App.jsx               # Main layout
└── index.css             # Tailwind imports
```

---

## Layout Pattern

### Flex Layout with Sidebar

```jsx
<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
  {/* Sidebar */}
  <aside className="w-64 bg-white dark:bg-gray-800 border-r">
    <Sidebar />
  </aside>

  {/* Main Content */}
  <main className="flex-1 overflow-y-auto">
    <Header />
    <div className="p-6">
      {/* Content */}
    </div>
  </main>
</div>
```

---

## Mobile Sidebar (Hamburger Menu)

```jsx
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white transform transition-transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Hamburger Button */}
        <button
          className="lg:hidden p-4"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      </main>
    </div>
  )
}
```

---

## Sidebar Component

```jsx
function Sidebar({ onClose }) {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '👥', label: 'Users', active: false },
    { icon: '📈', label: 'Analytics', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-purple-600">
          MetricsPro
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        {menuItems.map((item, i) => (
          <a
            key={i}
            href="#"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg mb-2
              transition-colors
              ${item.active
                ? 'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
            JD
          </div>
          <div>
            <p className="font-medium dark:text-white">John Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Header Component

```jsx
function Header({ onToggleDark, darkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, John!
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 relative">
            🔔
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  )
}
```

---

## Stats Card Component

```jsx
function StatCard({ title, value, change, icon }) {
  const isPositive = change >= 0

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          <p className={`text-sm mt-2 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}

// Usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard title="Total Revenue" value="$45,231" change={12.5} icon="💰" />
  <StatCard title="Active Users" value="1,893" change={8.2} icon="👥" />
  <StatCard title="Page Views" value="284,091" change={-3.1} icon="📊" />
  <StatCard title="Conversion Rate" value="3.48%" change={5.7} icon="📈" />
</div>
```

---

## Data Table Component

```jsx
function DataTable() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold dark:text-white">Recent Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {data.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm dark:text-gray-300">
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

---

## Chart Placeholder

```jsx
function ChartCard({ title }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
      <h3 className="text-lg font-semibold dark:text-white mb-4">{title}</h3>
      <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-2">📊</p>
          <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Integrate Chart.js, Recharts, or similar
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

## Complete Layout Example

```jsx
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Revenue" value="$45,231" change={12.5} icon="💰" />
            {/* More stats... */}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Sales Overview" />
            <ChartCard title="User Growth" />
          </div>

          {/* Table */}
          <DataTable />
        </div>
      </main>
    </div>
  )
}
```

---

## Tips

1. **Mobile-First:** Design for mobile, then enhance for desktop
2. **Dark Mode:** Use dark: prefix consistently
3. **Responsiveness:** Test at multiple breakpoints
4. **Accessibility:** Add ARIA labels and keyboard navigation
5. **State:** Use React state for sidebar and dark mode
6. **Components:** Break into small, reusable pieces
7. **Tailwind Config:** Extend with custom colors if needed

---

Good luck building your dashboard! 🚀📊

