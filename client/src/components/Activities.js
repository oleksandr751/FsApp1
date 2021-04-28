import React, { useState } from 'react';
const Activities = () => {
 const initialState = {
  firstDigit: 0,
  secondDigit: 0,
  result: 0,
 };

 const [values, setValues] = useState(initialState);

 const handleChange = (e) => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  });
 };
 values.result = values.firstDigit - -values.secondDigit;
 return (
  <div id='calculatorForm'>
   <form className='calculatorForm'>
    <h1>Calculate sum</h1>
    <input
     autoComplete='off'
     type='text'
     name='firstDigit'
     placeholder='first digit'
     onChange={handleChange}
    ></input>
    <div //(values.result = values.firstDigit - -values.secondDigit)}
    >
     +
    </div>
    <input
     autoComplete='off'
     type='text'
     name='secondDigit'
     placeholder='second digit'
     onChange={handleChange}
    ></input>
    <h1 placeholder='result'>{values.result}</h1>
   </form>
  </div>
 );
};

export default Activities;
