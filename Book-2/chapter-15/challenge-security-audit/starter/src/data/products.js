export const products = [
  {
    id: 1,
    name: 'Laptop',
    description: '<p>High-performance laptop perfect for <b>developers</b></p>',
    price: 999.99,
    website: 'https://example.com/laptop'
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    description: '<p>Ergonomic mouse with <i>precision tracking</i></p>',
    price: 29.99,
    website: 'https://example.com/mouse'
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    description: '<p>Cherry MX switches for the <strong>ultimate typing experience</strong></p>',
    price: 149.99,
    website: 'https://example.com/keyboard'
  },
  {
    id: 4,
    name: '4K Monitor',
    description: '<p>Crystal clear display with <em>HDR support</em></p>',
    price: 599.99,
    // ❌ VULNERABILITY: JavaScript URL
    website: 'javascript:alert("XSS via product website!")'
  },
  {
    id: 5,
    name: 'USB-C Hub',
    description: '<p>7-in-1 connectivity solution</p>',
    price: 49.99,
    website: 'https://example.com/hub'
  }
];

