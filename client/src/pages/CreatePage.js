import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Activities from '../components/Activities';

export const CreatePage = () => {
 const history = useHistory();
 const auth = useContext(AuthContext);
 const { request } = useHttp();
 const [link, setLink] = useState('');

 useEffect(() => {
  window.M.updateTextFields();
 }, []);

 const pressHandler = async (event) => {
  if (event.key === 'Enter') {
   try {
    const data = await request(
     '/api/post/generate',
     'POST',
     { from: link },
     {
      Authorization: `Bearer ${auth.token}`,
     }
    );
    history.push(`/detail/${data.link._id}`);
   } catch (e) {}
  }
 };

 return <div className='row'></div>;
};

export default CreatePage;
