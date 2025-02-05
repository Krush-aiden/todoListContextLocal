import "./App.css";

import TodoContextProvider from "./context/TodoContextProvider";
import AddTodosList from "./components/AddTodosList";
import TodoList from "./components/TodoItem";

function App() {
  return (
    <>
      <TodoContextProvider>
        <AddTodosList />
        <TodoList />
      </TodoContextProvider>
    </>
  );
}

export default App;
