import TextInputWithLabel from "../shared/TextInputWithLabel";

export default function TodoForm() {
  return (
    <form>
      <TextInputWithLabel elementId="todoTitle" labelText="Todo" />
      <button type="submit" disabled>
        Add Todo
      </button>
    </form>
  );
}
