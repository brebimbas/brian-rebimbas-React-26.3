import { useState, useEffect } from "react";
import TodoList from "./TodoList/TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          limit: 100,
        });

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

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
  }, [token]);

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }

      return todo;
    });

    setTodoList(updatedTodos);
  }

  function completeTodo(todoId) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }

      return todo;
    });

    setTodoList(updatedTodos);
  }

  return (
    <div>
      {error && <p>{error}</p>}

      {isTodoListLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
          <TodoForm />
          <TodoList
            todoList={todoList}
            onUpdateTodo={updateTodo}
            onCompleteTodo={completeTodo}
          />
        </>
      )}
    </div>
  );
}

export default TodosPage;
