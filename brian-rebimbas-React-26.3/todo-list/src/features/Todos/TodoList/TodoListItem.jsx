import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [validationError, setValidationError] = useState("");

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
    setValidationError("");
  }

  function handleCancel() {
    setWorkingTitle(todo.title);
    setValidationError("");
    setIsEditing(false);
  }

  function handleUpdate(event) {
    if (!isEditing) {
      return;
    }

    event.preventDefault();

    const sanitizedTitle = workingTitle.trim();

    if (!sanitizedTitle) {
      setValidationError("Todo title is required.");
      return;
    }

    if (!isValidTodoTitle(sanitizedTitle)) {
      setValidationError(
        "Please enter a valid todo title using 100 characters or less.",
      );
      return;
    }

    onUpdateTodo({
      ...todo,
      title: sanitizedTitle,
    });

    setWorkingTitle(sanitizedTitle);
    setValidationError("");
    setIsEditing(false);
  }

  return (
    <li className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todoTitle${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              onChange={handleEdit}
              maxLength={100}
            />

            {validationError && (
              <div className="todo-validation-error">{validationError}</div>
            )}

            <div className="todo-edit-actions">
              <button
                type="button"
                className="todo-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="todo-update-button"
                disabled={!isValidTodoTitle(workingTitle.trim())}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <>
            <label
              className="todo-checkbox-label"
              htmlFor={`checkbox${todo.id}`}
            >
              <input
                className="todo-checkbox"
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>

            <span className="todo-title" onClick={() => setIsEditing(true)}>
              {todo.title}
            </span>

            <button
              type="button"
              className="todo-delete-button"
              onClick={() => onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
