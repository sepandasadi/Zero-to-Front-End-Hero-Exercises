# Challenge: Data Dashboard

## 🎯 Objective

Build a complete data analysis and visualization system that processes, transforms, and displays complex data. This challenge combines **everything** from Chapter 25: arrays, objects, nested data, array methods, and proper copying techniques.

## 🎨 What You're Building

A data dashboard that:
- Processes sales data from multiple stores
- Calculates statistics and trends
- Filters and sorts data dynamically
- Generates reports
- Handles data immutably
- Provides data export functionality

## 📊 The Data

You'll work with this e-commerce sales data:

```js
const salesData = {
  stores: [
    {
      id: 1,
      name: "Downtown Store",
      location: "NYC",
      sales: [
        { date: "2024-01-01", product: "Laptop", category: "electronics", amount: 999, quantity: 2 },
        { date: "2024-01-01", product: "Mouse", category: "electronics", amount: 25, quantity: 5 },
        { date: "2024-01-02", product: "Shirt", category: "clothing", amount: 29, quantity: 10 },
        // ... more sales
      ]
    },
    {
      id: 2,
      name: "Mall Store",
      location: "LA",
      sales: [
        // ... sales data
      ]
    }
  ],
  employees: [
    { id: 101, name: "Alice", storeId: 1, role: "manager" },
    { id: 102, name: "Bob", storeId: 1, role: "sales" },
    { id: 103, name: "Charlie", storeId: 2, role: "manager" }
  ],
  products: [
    { id: 1, name: "Laptop", category: "electronics", cost: 700, price: 999 },
    { id: 2, name: "Mouse", category: "electronics", cost: 10, price: 25 },
    // ... more products
  ]
};
```

## 📋 Core Requirements

### Requirement 1: Data Processing Module

Create functions to process the data:

**1. getTotalRevenue()**
- Calculate total revenue across all stores
- Return formatted number

**2. getRevenueByStore()**
- Return array of stores with their total revenue
- Sort by revenue (highest first)

**3. getRevenueByCategory()**
- Group sales by product category
- Calculate total for each category
- Return sorted by revenue

**4. getTopProducts(n)**
- Find top N products by revenue
- Include product name, units sold, and total revenue

**5. getDailySales()**
- Group sales by date
- Calculate daily totals
- Return chronologically sorted

---

### Requirement 2: Statistical Analysis

Calculate these statistics:

**1. getAverageOrderValue()**
- Calculate average sale amount
- Across all transactions

**2. getSalesTrends()**
- Calculate day-over-day growth
- Return trend direction (up/down/stable)

**3. getCategoryDistribution()**
- Calculate percentage of sales per category
- Return as percentages

**4. getStorePerformance()**
- Compare stores by multiple metrics
- Revenue, transactions, average order value

---

### Requirement 3: Filtering System

Implement flexible filtering:

**1. filterByDateRange(startDate, endDate)**
- Return sales within date range
- Support string dates

**2. filterByCategory(category)**
- Return sales for specific category
- Aggregate totals

**3. filterByStore(storeId)**
- Get all sales for one store
- Calculate store-specific metrics

**4. filterByAmount(minAmount, maxAmount)**
- Find sales within price range
- Support optional min/max

---

### Requirement 4: Report Generation

Generate formatted reports:

**1. generateSummaryReport()**
```js
{
  totalRevenue: "$50,000.00",
  totalTransactions: 150,
  averageOrder: "$333.33",
  topStore: "Downtown Store",
  topCategory: "electronics",
  dateRange: "2024-01-01 to 2024-01-31"
}
```

**2. generateStoreReport(storeId)**
- Detailed report for specific store
- Include all metrics

**3. generateCategoryReport()**
- Breakdown by category
- Include trends and top products per category

**4. generateEmployeeReport()**
- Link employees to stores
- Calculate per-employee metrics

---

### Requirement 5: Data Transformation

Transform data for different uses:

**1. exportToCSV()**
- Convert sales data to CSV format
- Include headers

**2. exportToTable()**
- Format as HTML table structure
- Ready for display

**3. aggregateByMonth()**
- Group sales by month
- Calculate monthly totals

**4. normalizeData()**
- Flatten nested structure
- Create denormalized view

---

### Requirement 6: Immutable Updates

Implement update functions that never mutate:

**1. addSale(storeId, saleData)**
- Add new sale to store
- Return new data structure
- Original unchanged

**2. updateSale(storeId, saleId, updates)**
- Modify existing sale
- Immutable update pattern

**3. removeSale(storeId, saleId)**
- Remove sale from data
- Return new structure

**4. mergeSalesData(newData)**
- Merge additional sales data
- Combine without mutation

---

## ✅ Success Criteria

Your dashboard should:

1. ✅ Process all data correctly
2. ✅ Calculate accurate statistics
3. ✅ Filter data efficiently
4. ✅ Generate formatted reports
5. ✅ Transform data for export
6. ✅ Never mutate original data
7. ✅ Handle edge cases (empty data, invalid inputs)
8. ✅ Use appropriate array methods
9. ✅ Organize code into modules
10. ✅ Include comprehensive tests

## 💡 Implementation Hints

### Hint 1: Data Structure

Organize your code into modules:
```js
const Dashboard = {
  data: salesData,

  // Revenue functions
  revenue: {
    getTotal() { },
    getByStore() { },
    getByCategory() { }
  },

  // Statistics functions
  stats: {
    getAverage() { },
    getTrends() { }
  },

  // Filters
  filter: {
    byDate() { },
    byCategory() { }
  }
};
```

### Hint 2: Revenue Calculation

```js
function getTotalRevenue() {
  return stores.reduce((total, store) => {
    const storeRevenue = store.sales.reduce((sum, sale) =>
      sum + (sale.amount * sale.quantity), 0
    );
    return total + storeRevenue;
  }, 0);
}
```

### Hint 3: Grouping Data

```js
function getRevenueByCategory() {
  // Get all sales from all stores
  const allSales = stores.flatMap(store => store.sales);

  // Group by category
  const grouped = allSales.reduce((acc, sale) => {
    if (!acc[sale.category]) {
      acc[sale.category] = 0;
    }
    acc[sale.category] += sale.amount * sale.quantity;
    return acc;
  }, {});

  return grouped;
}
```

### Hint 4: Immutable Updates

```js
function addSale(storeId, saleData) {
  return {
    ...data,
    stores: data.stores.map(store =>
      store.id === storeId
        ? {
            ...store,
            sales: [...store.sales, saleData]
          }
        : store
    )
  };
}
```

### Hint 5: Date Filtering

```js
function filterByDateRange(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return stores.map(store => ({
    ...store,
    sales: store.sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startDate && saleDate <= endDate;
    })
  }));
}
```

## 🧪 Testing

Test your dashboard thoroughly:

```js
// Test data processing
console.assert(getTotalRevenue() > 0, "Should calculate revenue");

// Test filtering
const filtered = filterByCategory("electronics");
console.assert(filtered.length > 0, "Should filter by category");

// Test immutability
const original = JSON.stringify(salesData);
addSale(1, { /* new sale */ });
console.assert(JSON.stringify(salesData) === original, "Should not mutate");

// Test edge cases
console.assert(filterByDateRange("2099-01-01", "2099-12-31").length === 0);
```

## ⏱️ Estimated Time

**1.5-2 hours for complete implementation**

- 30 minutes: Data processing module
- 20 minutes: Statistical analysis
- 20 minutes: Filtering system
- 20 minutes: Report generation
- 15 minutes: Data transformation
- 15 minutes: Immutable updates
- 20 minutes: Testing and refinement

## 🎯 Bonus Features

### Bonus 1: Data Visualization

Generate data for charts:
```js
getChartData(type) {
  // Returns data formatted for Chart.js or similar
}
```

### Bonus 2: Caching

Implement caching for expensive calculations:
```js
const cache = new Map();
function getCachedRevenue() {
  if (!cache.has('revenue')) {
    cache.set('revenue', calculateRevenue());
  }
  return cache.get('revenue');
}
```

### Bonus 3: Data Validation

Validate data integrity:
```js
function validateSalesData(data) {
  // Check required fields
  // Validate data types
  // Ensure referential integrity
}
```

### Bonus 4: Search Functionality

Implement full-text search:
```js
function search(query) {
  // Search products, stores, categories
  // Return ranked results
}
```

### Bonus 5: Export to Multiple Formats

Support JSON, CSV, Excel formats:
```js
function export(format) {
  switch(format) {
    case 'json': return exportToJSON();
    case 'csv': return exportToCSV();
    case 'excel': return exportToExcel();
  }
}
```

## 📖 Resources

- [MDN: Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [JavaScript: Data structures](https://javascript.info/data-types)
- Chapter 25: All sections

---

## 🎓 What This Teaches

This challenge simulates real-world scenarios:

**E-commerce Analytics:** Process sales data like Amazon or Shopify

**Business Intelligence:** Generate insights like Tableau or Power BI

**Data Engineering:** Transform and aggregate like data pipelines

**State Management:** Handle data immutably like Redux or React

**This is professional-level data processing!** 💼

---

## ⚠️ Common Pitfalls

```js
// ❌ WRONG - Mutating original data
function addSale(storeId, sale) {
  const store = stores.find(s => s.id === storeId);
  store.sales.push(sale);  // MUTATES!
}

// ✅ CORRECT - Immutable update
function addSale(storeId, sale) {
  return {
    ...data,
    stores: data.stores.map(store =>
      store.id === storeId
        ? { ...store, sales: [...store.sales, sale] }
        : store
    )
  };
}

// ❌ WRONG - Not handling empty data
function getAverage() {
  return total / count;  // NaN if count is 0!
}

// ✅ CORRECT - Handle edge cases
function getAverage() {
  return count > 0 ? total / count : 0;
}
```

---

## 🎉 Completion Badge

When you finish:
- ✅ All functions work correctly
- ✅ Data never mutates
- ✅ Reports are accurate
- ✅ Code is well-organized
- ✅ Edge cases handled

**You've built a professional data processing system!**

This is the kind of code that powers real applications. You're ready for production! 🚀

---

**Ready to build your dashboard?** This is where data analysis meets web development. Let's process some data! 📊

