import { Todo } from "@/types";

interface ToDoItemProps extends Todo {
  onDelete: (id: Todo['id']) => void,
  onCheck: (id: Todo['id']) => void
}

const ToDoItem = ({id, todo, completed, onDelete, onCheck }: ToDoItemProps) => {
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={() => onCheck(id)} />
      <span>{todo}</span>
      <span onClick={() => onDelete(id)}>&times;</span>
    </li>
  );
};

export default ToDoItem;
