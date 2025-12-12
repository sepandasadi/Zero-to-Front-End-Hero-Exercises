import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'

function ProductList() {
  const addItem = useCartStore((state) => state.addItem)

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
              onClick={() => addItem(product)}
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

