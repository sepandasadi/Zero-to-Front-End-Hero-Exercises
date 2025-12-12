import { products } from '../data/products';

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function searchProducts(query) {
  // ✅ SECURE: Sanitized queries
  const sanitizedQuery = query.toLowerCase().trim();

  return products.filter(p =>
    p.name.toLowerCase().includes(sanitizedQuery) ||
    p.description.toLowerCase().includes(sanitizedQuery)
  );
}

