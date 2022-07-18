import { useState, useRef } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Todo1", completed: false },
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const todoName = todoNameRef.current.value;
    if (todoName === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: todoName, completed: false }];
    });

    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className='App'>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add task</button>
      <button onClick={handleClear}>Delete completed task</button>
      <div>
        Remaining task : {todos.filter((todo) => !todo.completed).length}
      </div>
    </div>
  );
}

export default App;
