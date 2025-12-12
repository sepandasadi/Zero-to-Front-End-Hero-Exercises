import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCard from '../components/UserCard';

describe('UserCard Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    verified: true,
  };

  it('renders user name and email', () => {
    // TODO: Render UserCard and verify name and email appear
  });

  it('displays avatar image when avatar URL provided', () => {
    // TODO: Render UserCard and verify img element with correct src
  });

  it('displays fallback when no avatar', () => {
    // TODO: Render without avatar, verify fallback with first letter
  });

  it('shows verified badge when user is verified', () => {
    // TODO: Render with verified=true, verify badge appears
  });

  it('does not show verified badge when user is not verified', () => {
    // TODO: Render with verified=false, verify no badge
  });

  it('calls onEdit when edit button clicked', async () => {
    // TODO: Render with onEdit mock, click edit, verify called
  });

  it('calls onDelete when delete button clicked', async () => {
    // TODO: Render with onDelete mock, click delete, verify called
  });

  it('matches snapshot', () => {
    // TODO: Create snapshot test
  });
});

