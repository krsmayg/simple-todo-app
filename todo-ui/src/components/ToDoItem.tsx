import { Todo } from "@/types";

interface ToDoItemProps extends Todo {
  onDelete: (id: Todo['id']) => void,
  onCheck: (newToDo: Todo) => void
}

const ToDoItem = ({id, title, completed, onDelete, onCheck }: ToDoItemProps) => {
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={() => onCheck({id, title, completed})} />
      <span>{title}</span>
      <span onClick={() => onDelete(id)}>&times;</span>
    </li>
  );
};

export default ToDoItem;
