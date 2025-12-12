// products.js - Product data and functions

export const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', emoji: '💻' },
  { id: 2, name: 'Smartphone', price: 699, category: 'electronics', emoji: '📱' },
  { id: 3, name: 'Headphones', price: 199, category: 'electronics', emoji: '🎧' },
  { id: 4, name: 'T-Shirt', price: 29, category: 'clothing', emoji: '👕' },
  { id: 5, name: 'Jeans', price: 59, category: 'clothing', emoji: '👖' },
  { id: 6, name: 'Sneakers', price: 89, category: 'clothing', emoji: '👟' },
  { id: 7, name: 'JavaScript Book', price: 39, category: 'books', emoji: '📚' },
  { id: 8, name: 'React Guide', price: 45, category: 'books', emoji: '📖' },
  { id: 9, name: 'CSS Mastery', price: 35, category: 'books', emoji: '📘' }
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category) {
  if (category === 'all') {
    return products;
  }
  return products.filter(p => p.category === category);
}

export function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

