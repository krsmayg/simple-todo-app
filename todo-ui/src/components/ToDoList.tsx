import { Todo } from "@/types";
import ToDoItem from "./ToDoItem";

interface ToDoListProps {
  todos: Todo[];
  handleClick: (id: Todo['id']) => void,
  handleCheck: (newToDo: Todo) => void
}

function ToDoList({ todos, handleClick, handleCheck }: ToDoListProps) {
  return (
    <ul>
      {todos.map(({ id, title, completed }: Todo) => {
        return (
          <ToDoItem
            id={id}
            key={id}
            completed={completed}
            title={title}
            onCheck={handleCheck}
            onDelete={handleClick}
          />
        );
      })}
    </ul>
  );
}

export default ToDoList;
