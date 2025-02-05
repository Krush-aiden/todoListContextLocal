import { useContext, useState, useEffect } from "react";
import TodoContext from "../context/TodoContext";
import TodoList from "./TodoItem";

function AddTodoList() {
  // Get the global context methods.
  const { addTodos } = useContext(TodoContext);

  // Initialize local todos state by attempting to parse data from local storage.
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      const parsed = storedTodos ? JSON.parse(storedTodos) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return err;
    }
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const parsed = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(Array.isArray(parsed) ? parsed : []);
  }, [addTodos]);

  // Controlled input state for the todo text.
  const [todoValue, setTodoValue] = useState("");

  // Whenever the todos change, update localStorage.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos ? todos : []));
  }, [todos]);

  // Submit the form to add a new todo.
  const onFormSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = todoValue.trim();
    if (trimmedValue !== "") {
      const newTodo = { id: Date.now(), todoValue: trimmedValue };
      setTodos([newTodo, ...todos]);
      setTodoValue("");
    }
  };

  return (
    <div>
      <h1>Simple Todo List</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Write Todo..."
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {todos?.map((todo) => (
        <TodoList key={todo.id} Element={todo} />
      ))}
    </div>
  );
}

export default AddTodoList;
