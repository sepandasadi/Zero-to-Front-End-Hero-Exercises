import { authService } from './authService';

// ❌ VULNERABILITY #8: No CSRF protection
export async function checkout(orderData) {
  const token = authService.getToken();

  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      // ❌ No CSRF token!
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) throw new Error('Checkout failed');

  return await response.json();
}

