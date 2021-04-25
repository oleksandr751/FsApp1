import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
 const [edit, setEdit] = useState({
  id: null,
  value: '',
 });

 const submitUpdate = (value) => {
  updateTodo(edit.id, value);
  setEdit({
   id: null,
   value: '',
  });
 };

 if (edit.id) {
  return <TodoForm edit={edit} onSubmit={submitUpdate} />;
 }

 return todos.map((todo, index) => (
  <div className='MainDiv'>
   <div className={todo.isComplete ? 'complete' : 'todo-row'} key={index}>
    <div key={todo.id} onClick={() => completeTodo(todo.id)}>
     {todo.text}
    </div>
    <div className='icons'>
     <AiFillCloseCircle
      onClick={() => removeTodo(todo.id)}
      className='delete-icon'
     />
     <AiFillEdit
      onClick={() => setEdit({ id: todo.id, value: todo.text })}
      className='edit-icon'
     />
    </div>
   </div>
  </div>
 ));
};

export default Todo;
