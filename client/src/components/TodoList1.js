import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const TodoList1 = () => {
 const [todos, setTodos] = useState([]);

 const addTodo = (todo) => {
  if (!todo.text || /^\s*$/.test(todo.text)) {
   return;
  }

  const newTodos = [...todos, todo];

  setTodos(newTodos);
  console.log(...todos, todo);
 };

 const removeTodo = (id) => {
  const removeArr = [...todos].filter((todo) => todo.id !== id);
  setTodos(removeArr);
 };

 const updateTodo = (id, newValue) => {
  if (!newValue.text || /^\s*$/.test(newValue.text)) {
   return;
  }
  setTodos((prev) => prev.map((item) => (item.id == id ? newValue : item)));
 };

 const completeTodo = (id) => {
  let updatedTodos = todos.map((todo) => {
   if (todo.id === id) {
    todo.isComplete = !todo.isComplete;
   }
   return todo;
  });
  setTodos(updatedTodos);
 };

 return (
  <div className='container1'>
   <h1 id='header1'>What are you planning today?</h1>
   <TodoForm onSubmit={addTodo} />
   <Todo
    todos={todos}
    completeTodo={completeTodo}
    removeTodo={removeTodo}
    updateTodo={updateTodo}
   />
  </div>
 );
};

export default TodoList1;
