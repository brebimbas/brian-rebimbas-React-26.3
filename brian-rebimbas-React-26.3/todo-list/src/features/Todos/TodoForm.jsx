import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

export default function TodoForm() {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleChange(event) {
    setWorkingTodoTitle(event.target.value);
  }

  return (
    <form>
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
