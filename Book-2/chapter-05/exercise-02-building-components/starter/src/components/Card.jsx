// TODO: Build Card component with variants
// Variants: default, elevated, outlined

function Card({ children, variant = 'default' }) {
  // TODO: Define base and variant classes

  return (
    <div>
      {children}
    </div>
  )
}

export function CardImage({ src, alt }) {
  // TODO: Style image to fill card width with rounded top corners
  return <img src={src} alt={alt} />
}

export function CardTitle({ children }) {
  // TODO: Style title
  return <h3>{children}</h3>
}

export function CardDescription({ children }) {
  // TODO: Style description
  return <p>{children}</p>
}

export function CardFooter({ children }) {
  // TODO: Style footer
  return <div>{children}</div>
}

export default Card

