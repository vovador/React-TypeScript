import React, {useState, useEffect} from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { ITodo } from '../interfaces';

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const newTodo = {
      title: title,
      id: Date.now(),
      completed: false,
    }
    setTodos((current) => [newTodo, ...current]);
  }

  const toggleHandler = (id: number) => {
    console.log('I am here');
    
    setTodos(current => current.map(todo => {
      console.log(todo.completed);
      
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
        
      }
      console.log(todo.completed);
      
      return todo;
    }))
  }

  const removeHandler = (id: number) => {
    const shouldRemove = confirm('Вы уверенны что хотите удалить элемент?')
    if (shouldRemove) {
      setTodos(current => current.filter(todo => todo.id !== id))
    }
  }
  return (
    <>
    <TodoForm onAdd={addHandler} />
  <TodoList
    todos={todos}
    onToggle={toggleHandler}
    onRemove={removeHandler}
  />
</>
  )

}