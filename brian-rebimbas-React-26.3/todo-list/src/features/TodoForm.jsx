import TextInputWithLabel from "../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../utils/todoValidation";

export default function TodoForm() {
  return (
    <form>
      <TextInputWithLabel elementId="todoTitle" labelText="Todo" />
      <button type="submit" disabled={!isValidTodoTitle}>
        Add Todo
      </button>
    </form>
  );
}
