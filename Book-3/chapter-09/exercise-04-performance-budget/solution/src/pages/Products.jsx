import times from 'lodash/times';
import random from 'lodash/random';
import sample from 'lodash/sample';
import groupBy from 'lodash/groupBy';

const products = times(12, (i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: random(10, 200),
  category: sample(['Electronics', 'Clothing', 'Books', 'Home'])
}));

export default function Products() {
  const grouped = groupBy(products, 'category');

  return (
    <div className="page">
      <h1>Products</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="product-grid">
            {items.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="info-box">
        <p>✅ Code-split page with tree-shakeable lodash imports</p>
        <p>Only the specific functions we need are bundled!</p>
      </div>
    </div>
  );
}

