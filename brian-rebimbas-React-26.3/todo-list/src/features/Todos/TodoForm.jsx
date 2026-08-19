import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

export default function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleChange(event) {
    setWorkingTodoTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidTodoTitle(workingTodoTitle)) {
      return;
    }

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={handleChange}
      />
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
    </form>
  );
}
