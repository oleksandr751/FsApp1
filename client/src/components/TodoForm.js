import React, { useState, useEffect, useRef } from 'react';

const TodoForm = (props) => {
 const [input, setInput] = useState('');
 const inputRef = useRef(null);
 useEffect(() => {
  inputRef.current.focus();
 });

 const handleChange = (e) => {
  setInput(e.target.value);
 };
 const handleSubmit = (e) => {
  e.preventDefault();
  props.onSubmit({
   id: Math.floor(Math.random() * 10000),
   text: input,
  });
  setInput('');
 };

 return (
  <div className='todoForm'>
   <form className='todo-form' onSubmit={handleSubmit}>
    <input
     type='text'
     className='todo-input'
     onChange={handleChange}
     value={input}
     placeholder='Add a todo'
     ref={inputRef}
    />
    <button className='todo-button'> Add a todo</button>
   </form>
  </div>
 );
};

export default TodoForm;
