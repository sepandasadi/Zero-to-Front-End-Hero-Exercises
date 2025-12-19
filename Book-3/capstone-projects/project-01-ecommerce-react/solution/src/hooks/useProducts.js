import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadProducts,
  loadCategories,
  selectFilteredProducts,
  selectCategories,
  selectLoading,
  selectError,
} from '../store/productsSlice'

/**
 * Custom hook for managing products
 */
export function useProducts() {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const categories = useSelector(selectCategories)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(loadProducts())
    dispatch(loadCategories())
  }, [dispatch])

  return {
    products,
    categories,
    loading,
    error,
  }
}

