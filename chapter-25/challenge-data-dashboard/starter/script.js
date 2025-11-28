/**
 * Challenge: Data Dashboard
 *
 * Build a complete data processing and analysis system
 */

console.log("=== Challenge: Data Dashboard ===\n");

// ========================================
// SAMPLE DATA
// ========================================

const salesData = {
  stores: [
    {
      id: 1,
      name: "Downtown Store",
      location: "NYC",
      sales: [
        { id: 1, date: "2024-01-01", product: "Laptop", category: "electronics", amount: 999, quantity: 2 },
        { id: 2, date: "2024-01-01", product: "Mouse", category: "electronics", amount: 25, quantity: 5 },
        { id: 3, date: "2024-01-02", product: "Shirt", category: "clothing", amount: 29, quantity: 10 },
        { id: 4, date: "2024-01-03", product: "Laptop", category: "electronics", amount: 999, quantity: 1 },
        { id: 5, date: "2024-01-05", product: "Shoes", category: "clothing", amount: 89, quantity: 3 }
      ]
    },
    {
      id: 2,
      name: "Mall Store",
      location: "LA",
      sales: [
        { id: 6, date: "2024-01-01", product: "Phone", category: "electronics", amount: 699, quantity: 3 },
        { id: 7, date: "2024-01-02", product: "Shirt", category: "clothing", amount: 29, quantity: 15 },
        { id: 8, date: "2024-01-03", product: "Watch", category: "accessories", amount: 199, quantity: 2 },
        { id: 9, date: "2024-01-04", product: "Phone", category: "electronics", amount: 699, quantity: 2 },
        { id: 10, date: "2024-01-05", product: "Laptop", category: "electronics", amount: 999, quantity: 1 }
      ]
    }
  ],
  employees: [
    { id: 101, name: "Alice", storeId: 1, role: "manager" },
    { id: 102, name: "Bob", storeId: 1, role: "sales" },
    { id: 103, name: "Charlie", storeId: 2, role: "manager" },
    { id: 104, name: "Diana", storeId: 2, role: "sales" }
  ],
  products: [
    { id: 1, name: "Laptop", category: "electronics", cost: 700, price: 999 },
    { id: 2, name: "Mouse", category: "electronics", cost: 10, price: 25 },
    { id: 3, name: "Phone", category: "electronics", cost: 500, price: 699 },
    { id: 4, name: "Shirt", category: "clothing", cost: 15, price: 29 },
    { id: 5, name: "Shoes", category: "clothing", cost: 45, price: 89 },
    { id: 6, name: "Watch", category: "accessories", cost: 100, price: 199 }
  ]
};

// ========================================
// REQUIREMENT 1: Data Processing Module
// ========================================

// TODO: Implement getTotalRevenue()
// Calculate total revenue across all stores


// TODO: Implement getRevenueByStore()
// Return array of stores with their total revenue, sorted


// TODO: Implement getRevenueByCategory()
// Group sales by category, calculate totals


// TODO: Implement getTopProducts(n)
// Find top N products by revenue


// TODO: Implement getDailySales()
// Group sales by date, calculate daily totals


// ========================================
// REQUIREMENT 2: Statistical Analysis
// ========================================

// TODO: Implement getAverageOrderValue()
// Calculate average sale amount


// TODO: Implement getSalesTrends()
// Calculate day-over-day growth


// TODO: Implement getCategoryDistribution()
// Calculate percentage of sales per category


// TODO: Implement getStorePerformance()
// Compare stores by multiple metrics


// ========================================
// REQUIREMENT 3: Filtering System
// ========================================

// TODO: Implement filterByDateRange(startDate, endDate)
// Return sales within date range


// TODO: Implement filterByCategory(category)
// Return sales for specific category


// TODO: Implement filterByStore(storeId)
// Get all sales for one store


// TODO: Implement filterByAmount(minAmount, maxAmount)
// Find sales within price range


// ========================================
// REQUIREMENT 4: Report Generation
// ========================================

// TODO: Implement generateSummaryReport()
// Generate overall summary report


// TODO: Implement generateStoreReport(storeId)
// Detailed report for specific store


// TODO: Implement generateCategoryReport()
// Breakdown by category


// TODO: Implement generateEmployeeReport()
// Link employees to stores with metrics


// ========================================
// REQUIREMENT 5: Data Transformation
// ========================================

// TODO: Implement exportToCSV()
// Convert sales data to CSV format


// TODO: Implement exportToTable()
// Format as HTML table structure


// TODO: Implement aggregateByMonth()
// Group sales by month


// TODO: Implement normalizeData()
// Flatten nested structure


// ========================================
// REQUIREMENT 6: Immutable Updates
// ========================================

// TODO: Implement addSale(storeId, saleData)
// Add new sale immutably


// TODO: Implement updateSale(storeId, saleId, updates)
// Modify existing sale immutably


// TODO: Implement removeSale(storeId, saleId)
// Remove sale immutably


// TODO: Implement mergeSalesData(newData)
// Merge additional sales data


// ========================================
// TESTING
// ========================================

console.log("\n=== TESTING ===");

// TODO: Test all functions
// TODO: Verify immutability
// TODO: Test edge cases


// ========================================
// BONUS FEATURES
// ========================================

// Bonus 1: Data visualization prep


// Bonus 2: Caching


// Bonus 3: Data validation


// Bonus 4: Search functionality


// Bonus 5: Multiple export formats


console.log("\n✅ Challenge Complete!");

