import { Todo } from "@/types";

const api = `https://localhost:7016/api/todos`;
export async function getTodos(): Promise<Todo[] | undefined> {
  try {
    const res = await fetch(`${api}`);
    if (!res.ok) {
      throw new Error(`Could not fetch data ${res.statusText}`)
    }
    const apiData: Todo[] = await res.json();
    return apiData

  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id: Todo['id']): Promise<Todo[] | undefined> {
  try {
    const res = await fetch(`${api}?id=${id}`, {
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
export async function createToDo(newTodo: Omit<Todo, 'id'>): Promise<Todo[] | undefined> {
  try {
    const res = await fetch(`${api}`, {
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
  console.log(todo)
  try {
    const res = await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
    });
    if (!res.ok) {
      throw new Error(`Failed to update todo: ${res.statusText}`);
    }
    const updatedTodos = await getTodos();
    return updatedTodos;
  } catch (error) {
    console.error(error);
  }
}