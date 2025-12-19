function ErrorMessage({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      <p className="font-semibold">Error</p>
      <p>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  )
}

export default ErrorMessage

