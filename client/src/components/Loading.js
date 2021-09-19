import React from 'react';
import loadImage from '../images/loading1.gif';
const Loading = () => {
 return (
  <div>
   <div className='loadingGif'>
    <img alt='loading....' src={loadImage}></img>
   </div>
  </div>
 );
};

export default Loading;
