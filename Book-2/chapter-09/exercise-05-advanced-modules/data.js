// data.js - Large module for dynamic import demonstration

export const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.random() * 100,
  category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
}));

export function processData(data) {
  console.log('🔄 Processing large dataset...');

  const stats = {
    total: data.length,
    categories: {},
    avgValue: 0,
    maxValue: 0,
    minValue: Infinity
  };

  let sum = 0;

  data.forEach(item => {
    // Count categories
    stats.categories[item.category] = (stats.categories[item.category] || 0) + 1;

    // Calculate stats
    sum += item.value;
    stats.maxValue = Math.max(stats.maxValue, item.value);
    stats.minValue = Math.min(stats.minValue, item.value);
  });

  stats.avgValue = sum / data.length;

  console.log('✓ Processing complete');
  return stats;
}

export function filterByCategory(data, category) {
  return data.filter(item => item.category === category);
}

console.log('✓ Data module loaded (1000 items)');

