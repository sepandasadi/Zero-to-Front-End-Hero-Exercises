const PRODUCT_NAMES = [
  'Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Headphones',
  'Webcam', 'Microphone', 'Speaker', 'Tablet', 'Smartphone', 'Smartwatch',
  'Charger', 'Cable', 'Adapter', 'Router', 'Modem', 'Switch',
  'Hard Drive', 'SSD', 'RAM', 'Graphics Card', 'Motherboard', 'CPU',
  'Power Supply', 'Case', 'Fan', 'Cooler', 'Thermal Paste', 'Screwdriver'
];

export function generateProducts(count) {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const nameIndex = (i - 1) % PRODUCT_NAMES.length;
    const baseName = PRODUCT_NAMES[nameIndex];
    const variant = Math.ceil(i / PRODUCT_NAMES.length);

    products.push({
      id: i,
      name: variant > 1 ? `${baseName} ${variant}` : baseName,
      price: Math.floor(Math.random() * 1000) + 50
    });
  }

  return products;
}

