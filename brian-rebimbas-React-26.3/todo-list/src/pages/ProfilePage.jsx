import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function ProfilePage() {
  const { email, token } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/tasks?limit=100", {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todo statistics");
        }

        const data = await response.json();
        const todos = data.tasks || [];

        const completed = todos.filter((todo) => todo.isCompleted).length;

        const active = todos.filter((todo) => !todo.isCompleted).length;

        setStats({
          total: todos.length,
          completed,
          active,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (token) {
      fetchTodoStats();
    }
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>

      <section>
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {email}
        </p>
      </section>

      <section>
        <h2>Todo Statistics</h2>

        {isLoading && <p>Loading statistics...</p>}

        {error && (
          <div role="alert">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div>
            <p>
              <strong>Total Todos:</strong> {stats.total}
            </p>

            <p>
              <strong>Completed:</strong> {stats.completed}
            </p>

            <p>
              <strong>Active:</strong> {stats.active}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
