import React from 'react';
import Card from '../../exercise-02-component-library/Card';
import '../../exercise-02-component-library/Card.css';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'filled'],
      description: 'The visual style variant of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'elevated' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding size of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    children: 'This is a basic card with default settings.',
  },
};

export const Elevated = {
  args: {
    variant: 'elevated',
    children: 'This card has a shadow (elevated variant).',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'This card has a border (outline variant).',
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    children: 'This card has a filled background (filled variant).',
  },
};

export const WithHeader = () => (
  <Card>
    <Card.Header>
      <h3 className="card__title">Card Title</h3>
    </Card.Header>
    <Card.Body>
      <p>This card has a header section.</p>
    </Card.Body>
  </Card>
);

export const WithFooter = () => (
  <Card>
    <Card.Body>
      <p>This card has a footer section with actions.</p>
    </Card.Body>
    <Card.Footer>
      <button className="btn btn--ghost btn--sm">Cancel</button>
      <button className="btn btn--primary btn--sm">Save</button>
    </Card.Footer>
  </Card>
);

export const Complete = () => (
  <Card>
    <Card.Header>
      <div>
        <h3 className="card__title">Complete Card</h3>
        <p className="card__subtitle">With header, body, and footer</p>
      </div>
    </Card.Header>
    <Card.Body>
      <p>
        This card demonstrates all three sections working together.
        The header contains a title and subtitle, the body contains
        the main content, and the footer contains action buttons.
      </p>
    </Card.Body>
    <Card.Footer>
      <button className="btn btn--ghost btn--sm">Cancel</button>
      <button className="btn btn--primary btn--sm">Submit</button>
    </Card.Footer>
  </Card>
);

export const ProductCard = () => (
  <Card variant="elevated">
    <Card.Header>
      <div style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem'
      }}>
        📦
      </div>
    </Card.Header>
    <Card.Body>
      <h3 className="card__title">Product Name</h3>
      <p className="card__subtitle">$99.99</p>
      <p style={{ marginTop: '1rem', color: '#6b7280' }}>
        This is a sample product description that explains the features
        and benefits of the product.
      </p>
    </Card.Body>
    <Card.Footer>
      <button className="btn btn--outline btn--sm">Add to Wishlist</button>
      <button className="btn btn--primary btn--sm">Add to Cart</button>
    </Card.Footer>
  </Card>
);

export const UserProfileCard = () => (
  <Card variant="outline">
    <Card.Header>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          JD
        </div>
        <div>
          <h3 className="card__title">John Doe</h3>
          <p className="card__subtitle">Software Engineer</p>
        </div>
      </div>
    </Card.Header>
    <Card.Body>
      <p style={{ color: '#6b7280' }}>
        Passionate about building great user experiences and
        creating elegant solutions to complex problems.
      </p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>1.2k</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Followers</div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>543</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Following</div>
        </div>
      </div>
    </Card.Body>
    <Card.Footer>
      <button className="btn btn--outline btn--sm" style={{ flex: 1 }}>Message</button>
      <button className="btn btn--primary btn--sm" style={{ flex: 1 }}>Follow</button>
    </Card.Footer>
  </Card>
);

export const PricingCard = () => (
  <Card variant="filled" padding="lg">
    <Card.Body>
      <div style={{ textAlign: 'center' }}>
        <h3 className="card__title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Pro Plan
        </h3>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>
          $29
          <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#6b7280' }}>/month</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0', textAlign: 'left' }}>
          <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> Unlimited projects
          </li>
          <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> 100GB storage
          </li>
          <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> Priority support
          </li>
          <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> Advanced analytics
          </li>
        </ul>
        <button className="btn btn--primary btn--lg" style={{ width: '100%' }}>
          Get Started
        </button>
      </div>
    </Card.Body>
  </Card>
);

// Story showing all variants
export const AllVariants = () => (
  <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
    <Card variant="elevated">
      <Card.Body>Elevated Card</Card.Body>
    </Card>
    <Card variant="outline">
      <Card.Body>Outline Card</Card.Body>
    </Card>
    <Card variant="filled">
      <Card.Body>Filled Card</Card.Body>
    </Card>
  </div>
);

// Story showing all padding sizes
export const AllPaddingSizes = () => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <Card padding="none">
      <Card.Body>None Padding</Card.Body>
    </Card>
    <Card padding="sm">
      <Card.Body>Small Padding</Card.Body>
    </Card>
    <Card padding="md">
      <Card.Body>Medium Padding</Card.Body>
    </Card>
    <Card padding="lg">
      <Card.Body>Large Padding</Card.Body>
    </Card>
  </div>
);

