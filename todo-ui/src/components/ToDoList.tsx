import { Todo } from "@/types";
import ToDoItem from "./ToDoItem";

interface ToDoListProps {
  todos: Todo[];
}

function ToDoList({ todos }: ToDoListProps) {
  return (
    <ul>
      {todos.map(({ id, todo, completed }: Todo) => {
        return (
          <ToDoItem
            id={id}
            key={id}
            completed={completed}
            todo={todo}
            onCheck={() => {}}
            onDelete={() => {}}
          />
        );
      })}
    </ul>
  );
}

export default ToDoList;
