import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={location.pathname === '/products' ? 'active' : ''}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}

