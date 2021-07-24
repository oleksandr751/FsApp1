import React, { useState, useEffect } from 'react';

const Users = () => {
 const [data, setData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [url, setUrl] = useState('https://randomuser.me/api/');
 //  useEffect(() => {
 //    const fetchData = async () => {
 //      setIsLoading(true);
 //      const result = await axios(url);
 //      setData(result.data.results.map(user => ({ ...user, id: user.id })));
 //      setIsLoading(false);
 //      console.log(data);
 //    };
 //    fetchData();
 //  }, [url]);
 return (
  <div>
   <h1>Users Page</h1>
  </div>
 );
};

export default Users;
