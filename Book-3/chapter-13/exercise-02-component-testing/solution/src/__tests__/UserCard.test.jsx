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
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('displays avatar image when avatar URL provided', () => {
    render(<UserCard user={mockUser} />);

    const img = screen.getByAltText("John Doe's avatar");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockUser.avatar);
  });

  it('displays fallback when no avatar', () => {
    const userWithoutAvatar = { ...mockUser, avatar: null };
    render(<UserCard user={userWithoutAvatar} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/no avatar/i)).toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument(); // First letter
  });

  it('shows correct first letter in fallback', () => {
    const user = { ...mockUser, name: 'Alice Smith', avatar: null };
    render(<UserCard user={user} />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows verified badge when user is verified', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByLabelText(/verified user/i)).toBeInTheDocument();
    expect(screen.getByText(/verified/i)).toBeInTheDocument();
  });

  it('does not show verified badge when user is not verified', () => {
    const unverifiedUser = { ...mockUser, verified: false };
    render(<UserCard user={unverifiedUser} />);

    expect(screen.queryByLabelText(/verified user/i)).not.toBeInTheDocument();
  });

  it('renders edit and delete buttons', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByRole('button', { name: /edit user/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete user/i })).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();

    render(<UserCard user={mockUser} onEdit={handleEdit} />);

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(<UserCard user={mockUser} onDelete={handleDelete} />);

    await user.click(screen.getByRole('button', { name: /delete user/i }));

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('does not crash when onEdit is not provided', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} />);

    await user.click(screen.getByRole('button', { name: /edit user/i }));

    // Should not crash
  });

  it('does not crash when onDelete is not provided', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} />);

    await user.click(screen.getByRole('button', { name: /delete user/i }));

    // Should not crash
  });

  it('has proper test id for integration testing', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByTestId('user-card')).toBeInTheDocument();
  });

  it('renders all user information in correct structure', () => {
    const { container } = render(<UserCard user={mockUser} />);

    const card = container.querySelector('.user-card');
    expect(card).toBeInTheDocument();

    const avatar = container.querySelector('.user-avatar');
    expect(avatar).toBeInTheDocument();

    const info = container.querySelector('.user-info');
    expect(info).toBeInTheDocument();

    const actions = container.querySelector('.user-actions');
    expect(actions).toBeInTheDocument();
  });

  it('matches snapshot for verified user with avatar', () => {
    const { container } = render(<UserCard user={mockUser} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for unverified user without avatar', () => {
    const user = {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: null,
      verified: false,
    };
    const { container } = render(<UserCard user={user} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles long names gracefully', () => {
    const userWithLongName = {
      ...mockUser,
      name: 'Christopher Alexander Montgomery III',
    };

    render(<UserCard user={userWithLongName} />);
    expect(screen.getByText('Christopher Alexander Montgomery III')).toBeInTheDocument();
  });

  it('handles long emails gracefully', () => {
    const userWithLongEmail = {
      ...mockUser,
      email: 'christopher.alexander.montgomery@very-long-domain-name.com',
    };

    render(<UserCard user={userWithLongEmail} />);
    expect(screen.getByText(/christopher\.alexander\.montgomery/i)).toBeInTheDocument();
  });

  it('uppercases first letter in fallback avatar', () => {
    const user = { ...mockUser, name: 'alice', avatar: null };
    render(<UserCard user={user} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByText('a')).not.toBeInTheDocument();
  });
});

