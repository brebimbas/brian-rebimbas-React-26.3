import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, dataVersion, onUpdateTodo, onCompleteTodo }) {
  const filterTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (v${dataVersion})`);

    return {
      version: dataVersion,
      todos: todoList.filter((todo) => !todo.isCompleted),
    };
  }, [todoList, dataVersion]);

  return (
    <ul>
      {filterTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
