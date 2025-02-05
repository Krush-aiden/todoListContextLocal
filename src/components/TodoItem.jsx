/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import TodoContext from "../context/TodoContext";

function TodoList({ Element }) {
  const { setAddTodos } = useContext(TodoContext);
  const [todoValue, setTodoValue] = useState(Element?.todoValue);
  const [todoEditable, setTodoEditable] = useState(true);
  const [saveBtn, setSaveBtn] = useState(false);

  // Enable edit mode.
  const onEditTodos = () => {
    setTodoEditable(false);
    setSaveBtn(true);
  };

  // Update the todo item and persist changes.
  const onUpdateTodos = (id) => {
    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    if (id) {
      const updatedTodos = todos.map((item) =>
        item.id === id ? { ...item, todoValue } : item
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodoEditable(true);
      setSaveBtn(false);
    }
  };

  // Delete the todo item and update storage.
  const onDeleteTodos = (id) => {
    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    if (id) {
      const updatedTodos = todos.filter((item) => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setAddTodos(updatedTodos);
    }
  };

  return (
    <div>
      {Element?.id && (
        <ul key={Element.id}>
          <li key={Element.id}>
            <input
              type="text"
              readOnly={todoEditable}
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
            />
            <div>
              {!saveBtn ? (
                <button onClick={() => onEditTodos(Element.id)}>Edit</button>
              ) : (
                <button onClick={() => onUpdateTodos(Element.id)}>
                  Update
                </button>
              )}
              <button onClick={() => onDeleteTodos(Element.id)}>Delete</button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default TodoList;
