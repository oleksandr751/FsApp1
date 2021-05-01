import { createSlice } from '@reduxjs/toolkit';
import { FloatingActionButton } from 'materialize-css';
import { AiOutlineVerticalAlignBottom } from 'react-icons/ai';

export const slice = createSlice({
 name: 'counter',
 initialState: {
  value: 0,
 },
 reducers: {
  increment: (state) => {
   state.value += 1;
  },
  decrement: (state) => {
   state.value -= 1;
  },
  incrementByAmount: (state, action) => {
   state.value += action.payload;
  },
 },
});

export const { increment, decrement, incrementByAmount } = slice.actions;

export const incrementAsync = (amount) => (dispatch) => {
 setTimeout(() => {
  dispatch(incrementByAmount(amount));
 }, 1500);
};

export const selectCount = (state) => state.counter.value;

export default slice.reducer;
