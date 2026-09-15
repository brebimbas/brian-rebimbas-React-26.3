import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos", { replace: true });
    } else {
      navigate("/login", {
        state: {
          from: location,
        },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default HomePage;
