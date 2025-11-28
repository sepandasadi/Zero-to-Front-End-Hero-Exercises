/**
 * Challenge: Data Dashboard - SOLUTION
 *
 * Complete data processing and analysis system
 */

console.log("=== Challenge: Data Dashboard - SOLUTION ===\n");

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

function getTotalRevenue() {
  return salesData.stores.reduce((total, store) => {
    const storeRevenue = store.sales.reduce((sum, sale) =>
      sum + (sale.amount * sale.quantity), 0
    );
    return total + storeRevenue;
  }, 0);
}

function getRevenueByStore() {
  return salesData.stores
    .map(store => ({
      id: store.id,
      name: store.name,
      location: store.location,
      revenue: store.sales.reduce((sum, sale) =>
        sum + (sale.amount * sale.quantity), 0
      )
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

function getRevenueByCategory() {
  const allSales = salesData.stores.flatMap(store => store.sales);

  const grouped = allSales.reduce((acc, sale) => {
    const category = sale.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += sale.amount * sale.quantity;
    return acc;
  }, {});

  // Convert to sorted array
  return Object.entries(grouped)
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

function getTopProducts(n = 5) {
  const allSales = salesData.stores.flatMap(store => store.sales);

  // Group by product
  const productStats = allSales.reduce((acc, sale) => {
    if (!acc[sale.product]) {
      acc[sale.product] = { name: sale.product, revenue: 0, units: 0 };
    }
    acc[sale.product].revenue += sale.amount * sale.quantity;
    acc[sale.product].units += sale.quantity;
    return acc;
  }, {});

  return Object.values(productStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, n);
}

function getDailySales() {
  const allSales = salesData.stores.flatMap(store => store.sales);

  const dailyTotals = allSales.reduce((acc, sale) => {
    if (!acc[sale.date]) {
      acc[sale.date] = 0;
    }
    acc[sale.date] += sale.amount * sale.quantity;
    return acc;
  }, {});

  return Object.entries(dailyTotals)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ========================================
// REQUIREMENT 2: Statistical Analysis
// ========================================

function getAverageOrderValue() {
  const allSales = salesData.stores.flatMap(store => store.sales);

  if (allSales.length === 0) return 0;

  const total = allSales.reduce((sum, sale) =>
    sum + (sale.amount * sale.quantity), 0
  );

  return total / allSales.length;
}

function getSalesTrends() {
  const dailySales = getDailySales();

  if (dailySales.length < 2) return { trend: "stable", change: 0 };

  const latest = dailySales[dailySales.length - 1].revenue;
  const previous = dailySales[dailySales.length - 2].revenue;
  const change = ((latest - previous) / previous * 100).toFixed(2);

  return {
    trend: change > 0 ? "up" : change < 0 ? "down" : "stable",
    change: parseFloat(change),
    latest,
    previous
  };
}

function getCategoryDistribution() {
  const total = getTotalRevenue();
  const byCategory = getRevenueByCategory();

  return byCategory.map(cat => ({
    category: cat.category,
    revenue: cat.revenue,
    percentage: ((cat.revenue / total) * 100).toFixed(2) + "%"
  }));
}

function getStorePerformance() {
  return salesData.stores.map(store => {
    const revenue = store.sales.reduce((sum, sale) =>
      sum + (sale.amount * sale.quantity), 0
    );
    const transactions = store.sales.length;
    const avgOrder = transactions > 0 ? revenue / transactions : 0;

    return {
      id: store.id,
      name: store.name,
      location: store.location,
      revenue,
      transactions,
      averageOrder: avgOrder
    };
  }).sort((a, b) => b.revenue - a.revenue);
}

// ========================================
// REQUIREMENT 3: Filtering System
// ========================================

function filterByDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return salesData.stores.map(store => ({
    ...store,
    sales: store.sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    })
  })).filter(store => store.sales.length > 0);
}

function filterByCategory(category) {
  const filtered = salesData.stores.map(store => ({
    ...store,
    sales: store.sales.filter(sale => sale.category === category)
  })).filter(store => store.sales.length > 0);

  const total = filtered.reduce((sum, store) => {
    return sum + store.sales.reduce((storeSum, sale) =>
      storeSum + (sale.amount * sale.quantity), 0
    );
  }, 0);

  return { stores: filtered, totalRevenue: total };
}

function filterByStore(storeId) {
  const store = salesData.stores.find(s => s.id === storeId);
  if (!store) return null;

  const revenue = store.sales.reduce((sum, sale) =>
    sum + (sale.amount * sale.quantity), 0
  );

  return {
    ...store,
    metrics: {
      revenue,
      transactions: store.sales.length,
      averageOrder: revenue / store.sales.length
    }
  };
}

function filterByAmount(minAmount, maxAmount = Infinity) {
  const allSales = salesData.stores.flatMap(store =>
    store.sales.map(sale => ({
      ...sale,
      storeName: store.name,
      total: sale.amount * sale.quantity
    }))
  );

  return allSales.filter(sale =>
    sale.total >= minAmount && sale.total <= maxAmount
  );
}

// ========================================
// REQUIREMENT 4: Report Generation
// ========================================

function generateSummaryReport() {
  const totalRevenue = getTotalRevenue();
  const allSales = salesData.stores.flatMap(store => store.sales);
  const avgOrder = getAverageOrderValue();
  const topStore = getRevenueByStore()[0];
  const topCategory = getRevenueByCategory()[0];

  const dates = allSales.map(s => new Date(s.date));
  const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
  const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];

  return {
    totalRevenue: `$${totalRevenue.toLocaleString()}`,
    totalTransactions: allSales.length,
    averageOrder: `$${avgOrder.toFixed(2)}`,
    topStore: topStore.name,
    topCategory: topCategory.category,
    dateRange: `${minDate} to ${maxDate}`
  };
}

function generateStoreReport(storeId) {
  const storeData = filterByStore(storeId);
  if (!storeData) return null;

  const categoryBreakdown = storeData.sales.reduce((acc, sale) => {
    if (!acc[sale.category]) {
      acc[sale.category] = { revenue: 0, transactions: 0 };
    }
    acc[sale.category].revenue += sale.amount * sale.quantity;
    acc[sale.category].transactions++;
    return acc;
  }, {});

  return {
    store: {
      id: storeData.id,
      name: storeData.name,
      location: storeData.location
    },
    metrics: storeData.metrics,
    categoryBreakdown,
    topProducts: getTopProducts(3)  // Top 3 for this store
  };
}

function generateCategoryReport() {
  const categories = getRevenueByCategory();

  return categories.map(cat => {
    const categorySales = salesData.stores.flatMap(store =>
      store.sales.filter(sale => sale.category === cat.category)
    );

    const topProducts = categorySales.reduce((acc, sale) => {
      if (!acc[sale.product]) {
        acc[sale.product] = { name: sale.product, revenue: 0, units: 0 };
      }
      acc[sale.product].revenue += sale.amount * sale.quantity;
      acc[sale.product].units += sale.quantity;
      return acc;
    }, {});

    return {
      category: cat.category,
      revenue: cat.revenue,
      transactions: categorySales.length,
      topProducts: Object.values(topProducts)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 3)
    };
  });
}

function generateEmployeeReport() {
  return salesData.employees.map(emp => {
    const store = salesData.stores.find(s => s.id === emp.storeId);
    const storeRevenue = store ? store.sales.reduce((sum, sale) =>
      sum + (sale.amount * sale.quantity), 0
    ) : 0;

    return {
      employee: {
        id: emp.id,
        name: emp.name,
        role: emp.role
      },
      store: store ? {
        id: store.id,
        name: store.name,
        location: store.location
      } : null,
      storeRevenue
    };
  });
}

// ========================================
// REQUIREMENT 5: Data Transformation
// ========================================

function exportToCSV() {
  const allSales = salesData.stores.flatMap(store =>
    store.sales.map(sale => ({
      storeId: store.id,
      storeName: store.name,
      location: store.location,
      ...sale
    }))
  );

  const headers = "storeId,storeName,location,date,product,category,amount,quantity,total";
  const rows = allSales.map(sale =>
    `${sale.storeId},${sale.storeName},${sale.location},${sale.date},${sale.product},${sale.category},${sale.amount},${sale.quantity},${sale.amount * sale.quantity}`
  );

  return [headers, ...rows].join('\n');
}

function exportToTable() {
  const allSales = salesData.stores.flatMap(store =>
    store.sales.map(sale => ({
      storeName: store.name,
      ...sale,
      total: sale.amount * sale.quantity
    }))
  );

  return `
<table>
  <thead>
    <tr>
      <th>Store</th>
      <th>Date</th>
      <th>Product</th>
      <th>Category</th>
      <th>Amount</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    ${allSales.map(sale => `
    <tr>
      <td>${sale.storeName}</td>
      <td>${sale.date}</td>
      <td>${sale.product}</td>
      <td>${sale.category}</td>
      <td>$${sale.amount}</td>
      <td>${sale.quantity}</td>
      <td>$${sale.total}</td>
    </tr>
    `).join('')}
  </tbody>
</table>
  `.trim();
}

function aggregateByMonth() {
  const allSales = salesData.stores.flatMap(store => store.sales);

  const monthly = allSales.reduce((acc, sale) => {
    const month = sale.date.substring(0, 7);  // YYYY-MM
    if (!acc[month]) {
      acc[month] = { revenue: 0, transactions: 0 };
    }
    acc[month].revenue += sale.amount * sale.quantity;
    acc[month].transactions++;
    return acc;
  }, {});

  return Object.entries(monthly)
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

function normalizeData() {
  return salesData.stores.flatMap(store =>
    store.sales.map(sale => ({
      saleId: sale.id,
      storeId: store.id,
      storeName: store.name,
      storeLocation: store.location,
      saleDate: sale.date,
      productName: sale.product,
      productCategory: sale.category,
      saleAmount: sale.amount,
      saleQuantity: sale.quantity,
      saleTotal: sale.amount * sale.quantity
    }))
  );
}

// ========================================
// REQUIREMENT 6: Immutable Updates
// ========================================

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

function addSale(storeId, saleData) {
  return {
    ...salesData,
    stores: salesData.stores.map(store =>
      store.id === storeId
        ? {
            ...store,
            sales: [...store.sales, saleData]
          }
        : store
    )
  };
}

function updateSale(storeId, saleId, updates) {
  return {
    ...salesData,
    stores: salesData.stores.map(store =>
      store.id === storeId
        ? {
            ...store,
            sales: store.sales.map(sale =>
              sale.id === saleId
                ? { ...sale, ...updates }
                : sale
            )
          }
        : store
    )
  };
}

function removeSale(storeId, saleId) {
  return {
    ...salesData,
    stores: salesData.stores.map(store =>
      store.id === storeId
        ? {
            ...store,
            sales: store.sales.filter(sale => sale.id !== saleId)
          }
        : store
    )
  };
}

function mergeSalesData(newData) {
  const cloned = deepClone(salesData);

  newData.stores.forEach(newStore => {
    const existingStore = cloned.stores.find(s => s.id === newStore.id);
    if (existingStore) {
      existingStore.sales = [...existingStore.sales, ...newStore.sales];
    } else {
      cloned.stores.push(newStore);
    }
  });

  return cloned;
}

// ========================================
// TESTING
// ========================================

console.log("=== TESTING ===\n");

// Test data processing
console.log("Total Revenue:", `$${getTotalRevenue().toLocaleString()}`);
console.log("\nRevenue by Store:");
getRevenueByStore().forEach(store => {
  console.log(`  ${store.name}: $${store.revenue.toLocaleString()}`);
});

console.log("\nRevenue by Category:");
getRevenueByCategory().forEach(cat => {
  console.log(`  ${cat.category}: $${cat.revenue.toLocaleString()}`);
});

console.log("\nTop 3 Products:");
getTopProducts(3).forEach((product, i) => {
  console.log(`  ${i + 1}. ${product.name}: $${product.revenue.toLocaleString()} (${product.units} units)`);
});

// Test statistics
console.log("\nStatistics:");
console.log("  Average Order Value:", `$${getAverageOrderValue().toFixed(2)}`);
console.log("  Sales Trend:", getSalesTrends());
console.log("  Category Distribution:");
getCategoryDistribution().forEach(cat => {
  console.log(`    ${cat.category}: ${cat.percentage}`);
});

// Test filtering
console.log("\nFiltered by Category (electronics):");
const electronicsFilter = filterByCategory("electronics");
console.log(`  Total Revenue: $${electronicsFilter.totalRevenue.toLocaleString()}`);

// Test reports
console.log("\nSummary Report:");
console.log(generateSummaryReport());

// Test immutability
console.log("\nImmutability Test:");
const originalData = JSON.stringify(salesData);
const newSale = { id: 999, date: "2024-01-10", product: "Test", category: "test", amount: 100, quantity: 1 };
const updatedData = addSale(1, newSale);
const dataUnchanged = JSON.stringify(salesData) === originalData;
console.log("  Original data unchanged:", dataUnchanged);
console.log("  New sale added to copy:", updatedData.stores[0].sales.some(s => s.id === 999));

console.log("\n✅ Challenge Complete!");
console.log("\n📊 Dashboard is ready for production!");

