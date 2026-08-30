import { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import SortBy from "../../shared/SortBy.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          sortBy,
          sortDirection,
          limit: 100,
        });

        const options = {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        };

        const response = await fetch(`/api/tasks?${params}`, options);

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        setTodoList(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [token, sortBy, sortDirection]);

  async function addTodo(title) {
    setError("");

    const newTodo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };

    setTodoList((currentTodos) => [...currentTodos, newTodo]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json();

      setTodoList((currentTodos) =>
        currentTodos.map((todo) => (todo.id === newTodo.id ? savedTodo : todo)),
      );
    } catch (error) {
      setTodoList((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== newTodo.id),
      );

      setError(error.message);
    }
  }

  async function completeTodo(todoId) {
    setError("");
    const originalTodo = todoList.find((todo) => todo.id === todoId);

    if (!originalTodo) return;

    setTodoList((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: true } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }
    } catch (error) {
      // Rollback
      setTodoList((currentTodos) =>
        currentTodos.map((todo) => (todo.id === todoId ? originalTodo : todo)),
      );

      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    setError("");
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) return;

    setTodoList((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      setTodoList((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      );

      setError(error.message);
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortByDirectionChange={setSortDirection}
      />
      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}

export default TodosPage;
