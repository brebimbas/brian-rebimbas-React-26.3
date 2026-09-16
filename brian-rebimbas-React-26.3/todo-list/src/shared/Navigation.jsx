import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink
                to="/todos"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Todos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
