import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import UserList from '../components/UserList';

describe('UserList Component with MSW', () => {
  it('shows loading state initially', () => {
    render(<UserList />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('displays list of users after fetch', async () => {
    render(<UserList />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Verify all users are displayed
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.getByText(/bob johnson/i)).toBeInTheDocument();
  });

  it('displays user emails', async () => {
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });
  });

  it('handles 500 server errors', async () => {
    // Override the handler for this test
    server.use(
      http.get('/api/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/failed to fetch users/i);
    });
  });

  it('handles network errors', async () => {
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.error();
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('shows message when no users found', async () => {
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json([]);
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });

  it('renders correct number of list items', async () => {
    render(<UserList />);

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  it('hides loading state after fetch completes', async () => {
    render(<UserList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('makes correct API call', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    render(<UserList />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/users');
    });

    fetchSpy.mockRestore();
  });

  it('handles 404 errors', async () => {
    server.use(
      http.get('/api/users', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});

