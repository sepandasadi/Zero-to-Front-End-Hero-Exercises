import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders as a div element', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector('.card')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies elevated variant class by default', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--elevated');
    });

    it('applies outline variant class', () => {
      const { container } = render(<Card variant="outline">Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--outline');
    });

    it('applies filled variant class', () => {
      const { container } = render(<Card variant="filled">Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--filled');
    });
  });

  describe('Padding', () => {
    it('applies medium padding by default', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--padding-md');
    });

    it('applies none padding class', () => {
      const { container } = render(<Card padding="none">Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--padding-none');
    });

    it('applies small padding class', () => {
      const { container } = render(<Card padding="sm">Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--padding-sm');
    });

    it('applies large padding class', () => {
      const { container } = render(<Card padding="lg">Content</Card>);
      expect(container.querySelector('.card')).toHaveClass('card--padding-lg');
    });
  });

  describe('Compound Components', () => {
    it('renders Card.Header', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Header')).toHaveClass('card__header');
    });

    it('renders Card.Body', () => {
      render(
        <Card>
          <Card.Body>Body</Card.Body>
        </Card>
      );
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Body')).toHaveClass('card__body');
    });

    it('renders Card.Footer', () => {
      render(
        <Card>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );
      expect(screen.getByText('Footer')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toHaveClass('card__footer');
    });

    it('renders all compound components together', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('can use compound components independently', () => {
      render(
        <Card>
          <Card.Header>Just Header</Card.Header>
        </Card>
      );

      expect(screen.getByText('Just Header')).toBeInTheDocument();
      expect(screen.queryByText('Body')).not.toBeInTheDocument();
      expect(screen.queryByText('Footer')).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('card');
    });

    it('passes through additional props', () => {
      const { container } = render(
        <Card data-testid="custom-card">Content</Card>
      );
      expect(container.querySelector('[data-testid="custom-card"]')).toBeInTheDocument();
    });

    it('applies custom className to header', () => {
      render(
        <Card>
          <Card.Header className="custom-header">Header</Card.Header>
        </Card>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('card__header');
    });

    it('applies custom className to body', () => {
      render(
        <Card>
          <Card.Body className="custom-body">Body</Card.Body>
        </Card>
      );
      const body = screen.getByText('Body');
      expect(body).toHaveClass('custom-body');
      expect(body).toHaveClass('card__body');
    });

    it('applies custom className to footer', () => {
      render(
        <Card>
          <Card.Footer className="custom-footer">Footer</Card.Footer>
        </Card>
      );
      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass('custom-footer');
      expect(footer).toHaveClass('card__footer');
    });
  });

  describe('Complex Layouts', () => {
    it('handles nested content in header', () => {
      render(
        <Card>
          <Card.Header>
            <h2>Title</h2>
            <button>Action</button>
          </Card.Header>
        </Card>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('handles complex body content', () => {
      render(
        <Card>
          <Card.Body>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </Card.Body>
        </Card>
      );

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('handles multiple actions in footer', () => {
      render(
        <Card>
          <Card.Footer>
            <button>Cancel</button>
            <button>Save</button>
          </Card.Footer>
        </Card>
      );

      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('Display Names', () => {
    it('has displayName for Card', () => {
      expect(Card.displayName).toBe('Card');
    });

    it('has displayName for Card.Header', () => {
      expect(Card.Header.displayName).toBe('Card.Header');
    });

    it('has displayName for Card.Body', () => {
      expect(Card.Body.displayName).toBe('Card.Body');
    });

    it('has displayName for Card.Footer', () => {
      expect(Card.Footer.displayName).toBe('Card.Footer');
    });
  });
});

