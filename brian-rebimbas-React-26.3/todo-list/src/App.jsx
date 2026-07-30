import "./App.css";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import { useState } from "react";
  
const todos = [];

function App() {
  const [todoList, setTodoList] = useState (todos);

  function addTodo(todoTitle){
    const newTodo ={
      id: Date.now(),
      title: todoTitle
    };
    setTodoList([...todoList, newTodo])


} 
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
