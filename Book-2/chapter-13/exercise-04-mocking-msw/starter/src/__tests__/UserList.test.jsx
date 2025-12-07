import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import UserList from '../components/UserList';

describe('UserList Component', () => {
  it('shows loading state initially', () => {
    // TODO: Render component and verify loading message
  });

  it('displays list of users after fetch', async () => {
    // TODO: Render and wait for users to load, verify they appear
  });

  it('handles fetch errors', async () => {
    // TODO: Override handler to return error, verify error message shows
    // Hint: server.use(http.get('/api/users', () => new HttpResponse(null, { status: 500 })))
  });

  it('shows message when no users found', async () => {
    // TODO: Override handler to return empty array, verify "No users found"
  });

  it('displays user name and email', async () => {
    // TODO: Verify both name and email are rendered for each user
  });
});

