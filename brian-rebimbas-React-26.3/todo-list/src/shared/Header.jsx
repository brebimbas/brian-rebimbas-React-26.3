import { useAuth } from "../contexts/AuthContext.jsx";
import Logoff from "../features/Logoff.jsx";
import Navigation from "./Navigation.jsx";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>Todo List</span>
        </div>

        <div className="header-right">
          <Navigation />

          {isAuthenticated && <Logoff />}
        </div>
      </div>
    </header>
  );
}

export default Header;
