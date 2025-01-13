import { Todo } from "@/types";

export async function getTodos(): Promise<Todo[] | undefined> {
  try {
    const res = await fetch('/mock/todos.json');
    if (!res.ok) {
      throw new Error(`Could not fetch data ${res.statusText}`)
    }
    const resData: Todo[] = await res.json();
    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id: Pick<Todo, 'id'>): Promise<Todo[] | undefined> {
  try {
    const res = await fetch(`/mock/todos.json?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Failed to delete todo: ${res.statusText}`);
    }
    const updatedTodos = await getTodos();
    return updatedTodos;
  } catch (error) {
    console.error(error);
  }
}
export async function addToDo(newTodo: Omit<Todo, 'id'>): Promise<Todo[] | undefined> {
  try {
    const res = await fetch(`/mock/todos.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    });
    if (!res.ok) {
      throw new Error(`Failed to add todo: ${res.statusText}`);
    }
    const updatedTodos = await getTodos();
    return updatedTodos;
  } catch (error) {
    console.error(error);
  }
}




export async function updateTodo(todo: Todo) {

}