// ==========================================
// YOUR CODE HERE: String Formatters
// ==========================================

// TODO: Export named functions

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function uppercase(str) {
  return str.toUpperCase();
}

export function lowercase(str) {
  return str.toLowerCase();
}

// TODO: Export this as DEFAULT export
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// ==========================================
// SOLUTION: Uncomment to complete
// ==========================================

// export default formatCurrency;

