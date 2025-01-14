import { useRef } from "react";

interface ToDoInputProps {
  handleClick: (text: string) => void,
}

const ToDoInput = ({handleClick}: ToDoInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClick = () => {
    if (inputRef.current &&  inputRef.current.value !== '') {
      handleClick(inputRef.current.value)
    }
  }
  return (
    <>
      <input type="text" placeholder="new todo"  ref={inputRef}/>
      <button onClick={onClick}>Add</button>
    </>
  );
};

export default ToDoInput;
