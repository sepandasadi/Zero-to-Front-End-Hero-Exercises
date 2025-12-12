import React from 'react';
import './Card.css';

/**
 * Card Component
 *
 * A compound component for displaying content in a card layout.
 *
 * @component
 * @example
 * <Card variant="elevated">
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content goes here</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 */
const Card = ({
  children,
  variant = 'elevated',
  padding = 'md',
  className = '',
  ...props
}) => {
  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Header
 * Top section of the card, typically contains title and actions
 */
const CardHeader = ({
  children,
  className = '',
  ...props
}) => {
  const classNames = ['card__header', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Body
 * Main content area of the card
 */
const CardBody = ({
  children,
  className = '',
  ...props
}) => {
  const classNames = ['card__body', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Footer
 * Bottom section of the card, typically contains actions
 */
const CardFooter = ({
  children,
  className = '',
  ...props
}) => {
  const classNames = ['card__footer', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Display names for debugging
Card.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardBody.displayName = 'Card.Body';
CardFooter.displayName = 'Card.Footer';

export default Card;

