 import TodoListItem from "./TodoListItem";

 function TodoList({todoList}) {
  const isEmpty = todoList.length === 0;

  return (
    <>
    {isEmpty ? (<p>Add todo above to get started</p>):
      (<ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>)}
    </>
  );
}

export default TodoList;