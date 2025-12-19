import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatters'
import { useCart } from '../../hooks/useCart'

function CartItem({ item }) {
  const { update, remove } = useCart()

  const handleIncrease = () => {
    update(item.id, item.quantity + 1)
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      update(item.id, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    remove(item.id)
  }

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-blue-600 font-bold mt-1">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Quantity Controls */}
        <div className="flex items-center border rounded-lg">
          <button
            onClick={handleDecrease}
            className="px-3 py-2 hover:bg-gray-100 transition"
            aria-label="Decrease quantity"
          >
            <FaMinus size={12} />
          </button>
          <span className="px-4 py-2 font-semibold">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-2 hover:bg-gray-100 transition"
            aria-label="Increase quantity"
          >
            <FaPlus size={12} />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[100px]">
          <p className="text-sm text-gray-600">Subtotal</p>
          <p className="font-bold text-lg">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
          aria-label="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default CartItem

