 import TodoListItem from "./TodoListItem";

 function TodoList({todoList, onCompleteTodo}) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted)
  const isEmpty = filteredTodoList.length === 0;
 

  return (
    <>
    {isEmpty ? (<p>Add todo above to get started</p>):
      (<ul>
        {filteredTodoList.map((todo) => (
          <TodoListItem 
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo} />
        ))}
      </ul>)}
    </>
  );
}

export default TodoList;