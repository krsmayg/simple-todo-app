import { useEffect, useState } from "react";
import { Todo } from "./types";
import Header from "./ui/Header";
import ToDoList from "./components/ToDoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const res = await fetch("/mock/todos.json");
        if (!res.ok) {
          throw new Error(`Could not fetch data ${res.statusText}`);
        }
        const resData: Todo[] = await res.json();
        setTodos(resData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchToDos();
  }, []);

  return (
    <div className="App">
      <Header />
      <input type="text" placeholder="new todo" />
      <button>Add</button>
      <ToDoList todos={todos} /> 
    </div>
  );
}
export default App;
