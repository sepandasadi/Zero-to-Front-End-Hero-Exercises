import { useCart } from '../hooks/useCart';
import { checkout } from '../services/checkoutService';

function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      // ✅ SECURE: checkout service includes CSRF token
      await checkout({ items: cart, total });
      alert('Order placed successfully!');
      clearCart();
    } catch (error) {
      alert('Checkout failed');
    }
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ marginLeft: '10px', padding: '5px 10px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
            Total: ${total.toFixed(2)}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Complete Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;

