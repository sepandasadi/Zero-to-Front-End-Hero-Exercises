import { formatPrice, getStockStatus } from '../utils/productHelpers'
import '../products.css'

export function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.onSale && <span className="sale-badge">Sale!</span>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-stock">{getStockStatus(product.stock)}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )
}

