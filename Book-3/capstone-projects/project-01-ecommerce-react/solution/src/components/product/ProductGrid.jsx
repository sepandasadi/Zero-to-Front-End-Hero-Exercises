import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No products found.</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid

