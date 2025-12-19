import { useDispatch, useSelector } from 'react-redux'
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from '../store/cartSlice'

/**
 * Custom hook for managing cart
 */
export function useCart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartItemCount)

  const add = (product, quantity = 1) => {
    dispatch(addItem({ ...product, quantity }))
  }

  const remove = (productId) => {
    dispatch(removeItem(productId))
  }

  const update = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }))
  }

  const clear = () => {
    dispatch(clearCart())
  }

  return {
    items,
    total,
    itemCount,
    add,
    remove,
    update,
    clear,
  }
}

