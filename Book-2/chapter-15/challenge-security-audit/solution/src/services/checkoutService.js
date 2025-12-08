import { authService } from './authService';

// ✅ SECURE: CSRF protection included
export async function checkout(orderData) {
  const csrfToken = authService.getCsrfToken();

  const response = await fetch('/api/checkout', {
    method: 'POST',
    credentials: 'include', // ✅ Send cookies
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken // ✅ CSRF protection!
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) throw new Error('Checkout failed');

  return await response.json();
}

