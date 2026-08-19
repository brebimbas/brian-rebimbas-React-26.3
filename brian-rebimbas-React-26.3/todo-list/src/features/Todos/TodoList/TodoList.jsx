import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onUpdateTodo, onCompleteTodo }) {
  return (
    <ul>
      {todoList.map((todo) => (
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
