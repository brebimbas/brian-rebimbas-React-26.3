import { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext.jsx";

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
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/tasks?limit=100", {
          method: "GET",
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

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setStats({
          total,
          completed,
          active,
        });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div>
      <h1>Profile</h1>

      <section>
        <h2>User Information</h2>

        <p>
          <strong>Name:</strong> {email}
        </p>

        <p>
          <strong>Status:</strong> Authenticated
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

            {stats.total > 0 && (
              <p>
                <strong>Completion:</strong> {completionPercentage}%
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
