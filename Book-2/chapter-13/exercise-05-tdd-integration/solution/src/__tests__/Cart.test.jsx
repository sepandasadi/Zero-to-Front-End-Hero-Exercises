import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../features/cart/Cart';

/**
 * SHOPPING CART - TDD TESTS (SOLUTION)
 *
 * These tests drove the development of the Cart component.
 * All 15 tests pass!
 */

describe('Shopping Cart - TDD', () => {
  describe('Empty Cart', () => {
    it('shows empty cart message when no items', () => {
      render(<Cart />);
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    it('displays zero total for empty cart', () => {
      render(<Cart />);
      expect(screen.getByText(/total: \$0\.00/i)).toBeInTheDocument();
    });
  });

  describe('Adding Products', () => {
    it('adds a product to cart', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));

      expect(screen.getByText(/laptop/i)).toBeInTheDocument();
      expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
    });

    it('displays product price', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));

      expect(screen.getByText(/\$999\.99/i)).toBeInTheDocument();
    });

    it('shows cart item count', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));

      expect(screen.getByText(/1 item/i)).toBeInTheDocument();
    });

    it('adds multiple different products', async () => {
      const user = userEvent.setup();
      const products = [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Mouse', price: 29.99 },
      ];

      render(<Cart initialProducts={products} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /add mouse to cart/i }));

      expect(screen.getByText(/laptop/i)).toBeInTheDocument();
      expect(screen.getByText(/mouse/i)).toBeInTheDocument();
      expect(screen.getByText(/2 items/i)).toBeInTheDocument();
    });
  });

  describe('Quantity Management', () => {
    it('shows quantity when same product added twice', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      const addButton = screen.getByRole('button', { name: /add laptop to cart/i });
      await user.click(addButton);
      await user.click(addButton);

      expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
    });

    it('increases quantity when + button clicked', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /increase quantity/i }));

      expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
    });

    it('decreases quantity when - button clicked', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      const addButton = screen.getByRole('button', { name: /add laptop to cart/i });
      await user.click(addButton);
      await user.click(addButton);

      await user.click(screen.getByRole('button', { name: /decrease quantity/i }));

      expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });

    it('removes item when quantity decreased to zero', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /decrease quantity/i }));

      expect(screen.queryByText(/laptop/i)).not.toBeInTheDocument();
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  describe('Removing Products', () => {
    it('removes product when remove button clicked', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /remove/i }));

      expect(screen.queryByText(/laptop/i)).not.toBeInTheDocument();
    });
  });

  describe('Total Calculation', () => {
    it('calculates total for single item', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));

      expect(screen.getByText(/total: \$999\.99/i)).toBeInTheDocument();
    });

    it('calculates total for multiple items', async () => {
      const user = userEvent.setup();
      const products = [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Mouse', price: 29.99 },
      ];

      render(<Cart initialProducts={products} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /add mouse to cart/i }));

      expect(screen.getByText(/total: \$1,029\.98/i)).toBeInTheDocument();
    });

    it('updates total when quantity changes', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /increase quantity/i }));

      expect(screen.getByText(/total: \$1,999\.98/i)).toBeInTheDocument();
    });
  });

  describe('Clear Cart', () => {
    it('clears all items when clear cart clicked', async () => {
      const user = userEvent.setup();
      const product = { id: 1, name: 'Laptop', price: 999.99 };

      render(<Cart initialProducts={[product]} />);

      await user.click(screen.getByRole('button', { name: /add laptop to cart/i }));
      await user.click(screen.getByRole('button', { name: /clear cart/i }));

      expect(screen.queryByText(/laptop/i)).not.toBeInTheDocument();
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });
});

