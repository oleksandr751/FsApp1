import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const OtherUserPage = () => {
 const auth = useContext(AuthContext);
 console.log(auth.usersData);
 return <div></div>;
};

export default OtherUserPage;
