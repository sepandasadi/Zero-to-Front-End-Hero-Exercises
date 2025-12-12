import { products } from '../data/products';

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function searchProducts(query) {
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
}

