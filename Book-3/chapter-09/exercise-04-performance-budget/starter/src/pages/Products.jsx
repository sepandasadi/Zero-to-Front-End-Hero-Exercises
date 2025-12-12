import _ from 'lodash';

const products = _.times(12, (i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: _.random(10, 200),
  category: _.sample(['Electronics', 'Clothing', 'Books', 'Home'])
}));

export default function Products() {
  const grouped = _.groupBy(products, 'category');

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
    </div>
  );
}

