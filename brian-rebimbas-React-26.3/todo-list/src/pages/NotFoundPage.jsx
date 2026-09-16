import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>

        <h1>Page Not Found</h1>

        <p>Sorry, the page you are looking for does not exist.</p>

        <nav className="not-found-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  );
}

export default NotFoundPage;
