import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
 decrement,
 increment,
 incrementByAmount,
 incrementAsync,
 selectCount,
} from '../redux/counterSlice';
const Counter = () => {
 const count = useSelector(selectCount);
 const dispatch = useDispatch();
 const [incrementAmount, setIncrementAmount] = useState('2');
 return (
  <div>
   <button onClick={() => dispatch(increment())}>+</button>
   <button onClick={() => dispatch(decrement())}>-</button>
   <input
    onChange={(e) => {
     setIncrementAmount(e.target.value);
    }}
   ></input>
   <button
    onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
   >
    Add amount
   </button>
   <button
    onClick={() => dispatch(incrementAsync(Number(incrementAmount)) || 0)}
   >
    Add async
   </button>
   <div>{count}</div>
  </div>
 );
};

export default Counter;
