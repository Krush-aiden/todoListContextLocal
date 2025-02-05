/* eslint-disable react/prop-types */
import { useState } from "react";

import TodoContext from "./TodoContext";

const TodoContextProvider = ({ children }) => {
  const [addTodos, setAddTodos] = useState(null);
  return (
    <TodoContext.Provider value={{ addTodos, setAddTodos }}>
      <div>TodoContext</div>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
