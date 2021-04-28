import React, { useState } from 'react';
import SwiperCore, {
 Mousewheel,
 Navigation,
 Pagination,
 Scrollbar,
 A11y,
 Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

const ImageGallery = () => {
 const [fileListMain, setFileListMain] = useState([]);
 const arr1 = [];
 const [list, setList] = useState({
  list1: arr1,
 });
 const handleFiles = (e) => {
  setFileListMain([...fileListMain, Array.from(e.target.files)]);
  console.log(fileListMain);
 };
 const uploadFiles = () => {
  fileListMain.map((item) => {
   item.map((item1) => {
    if (item1.type === 'image/png' || item1.type === 'image/jpeg') {
     arr1.push(
      <SwiperSlide key={Math.floor(Math.random() * 10000)}>
       <img
        className='SwiperImage'
        src={URL.createObjectURL(item1)}
        alt={item1.name}
        width='300'
        height='300'
       />
      </SwiperSlide>
     );
     console.log(item1.name);
    } else alert('Only png and jpeg files are accepted');
   });
  });
  setList({
   list1: arr1,
  });
 };

 SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Autoplay,
 ]);

 return (
  <div>
   <div>
    <h1>Upload your images</h1>
    <input id='chooseFiles' type='file' onChange={handleFiles} multiple></input>
    <button type='button' onClick={uploadFiles}>
     Upload Images
    </button>

    <div className='swiper2'>
     <Swiper
      height={500}
      className='swiper1'
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={2000}
      direction={'horizontal'}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true, el: '.swiper-pagination' }}
      navigation={{
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
      }}
     >
      <SwiperSlide key={Math.floor(Math.random() * 10000)}>
       <img
        className='SwiperImage'
        src={
         'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dW5pdmVyc2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
        }
        alt='Image0'
        width='300'
        height='300'
       />
      </SwiperSlide>
      <SwiperSlide key={Math.floor(Math.random() * 10000)}>
       <img
        className='SwiperImage'
        src={'https://static.toiimg.com/photo/72975551.cms'}
        alt='Image1'
        width='300'
        height='300'
       />
      </SwiperSlide>
      <SwiperSlide key={Math.floor(Math.random() * 10000)}>
       <img
        className='SwiperImage'
        src={
         'https://media1.tenor.com/images/92103966acc3e0133f466a3171d9b4b5/tenor.gif?itemid=19665244'
        }
        alt='Image2'
        width='300'
        height='300'
       />
      </SwiperSlide>
      {list.list1}
      <div className='swiper-button-next'></div>
      <div className='swiper-button-prev'></div>
      <div className='swiper-pagination'></div>
     </Swiper>
    </div>
   </div>
  </div>
 );
};

export default ImageGallery;
