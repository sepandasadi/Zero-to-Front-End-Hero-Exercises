import { useCart } from '../hooks/useCart'
import { formatOrderDate, getOrderStatus } from '../utils/cartHelpers'
import '../cart.css'

export function OrderHistory() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="order-history empty">
        <p>No orders yet</p>
      </div>
    )
  }

  return (
    <div className="order-history">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span className="order-id">Order #{order.id}</span>
            <span className="order-date">{formatOrderDate(order.date)}</span>
          </div>
          <div className="order-status">
            Status: <span className={`status-${order.status}`}>
              {getOrderStatus(order.status)}
            </span>
          </div>
          <div className="order-total">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

