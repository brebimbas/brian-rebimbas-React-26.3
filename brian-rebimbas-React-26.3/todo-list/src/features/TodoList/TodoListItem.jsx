import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const inputRef = useRef(null);

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleUpdate(event) {
    if (!isEditing) {
      return;
    }

    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  }

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel
            elementId={`todoTitle${todo.id}`}
            labelText="Todo"
            ref={inputRef}
            value={workingTitle}
            onChange={handleEdit}
          />

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={!isValidTodoTitle(workingTitle)}
          >
            Update
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            id={`checkbox${todo.id}`}
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          />
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </>
      )}
    </li>
  );
}

export default TodoListItem;
