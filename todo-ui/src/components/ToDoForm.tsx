import {
  createToDo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/apiTodos";
import { Todo } from "@/types";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
import ToDoInput from "./ToDoInput";

function ToDoForm() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const res = await getTodos();
        if (res !== undefined) {
          setTodos(res);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchToDos();
  }, []);

  async function handleAdd(text: string) {
    try {
      setLoading(true);
      const res = await createToDo({ title: text, completed: false });
      if (res !== undefined) {
        setTodos(res);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  async function handleDelete(id: Todo["id"]) {
    try {
      setLoading(true);
      const res = await deleteTodo(id);
      if (res !== undefined) {
        setTodos(res);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  async function handleCheck(newTodo: Todo) {
    try {
      setLoading(true);
      const res = await updateTodo({
        ...newTodo,
        completed: !newTodo.completed,
      });
      if (res !== undefined) {
        setTodos(res);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  return (
    <>
      <ToDoInput handleClick={handleAdd} />
      {loading ? (
        <Spinner />
      ) : (
        <ToDoList
          todos={todos}
          handleClick={handleDelete}
          handleCheck={handleCheck}
        />
      )}
    </>
  );
}

export default ToDoForm;
