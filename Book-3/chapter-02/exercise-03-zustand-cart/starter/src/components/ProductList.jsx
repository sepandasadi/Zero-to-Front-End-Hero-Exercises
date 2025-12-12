import { products } from '../data/products'
// TODO: Import useCartStore

function ProductList() {
  // TODO: Get addItem function from store

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <button
              onClick={() => {/* TODO: Add to cart */}}
              className="add-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList

