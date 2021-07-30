import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

function Navbar() {
 const auth = useContext(AuthContext);

 const history = useHistory();
 const location = useLocation();
 const { request } = useHttp();
 const handleSignOut = (event) => {
  event.preventDefault();
  auth.logout();
  history.push('/');
 };
 const [sidebar, setSidebar] = useState(false);
 const [mainUserData, setMainUserData] = useState({});
 const showSidebar = () => setSidebar(!sidebar);
 const asg_Kidegre = true;
 useEffect(() => {
  const fetchData = async () => {
   try {
    const eMail1 = auth.eMail;
    console.log(auth.eMail);
    const response = await request('/api/auth/getMainUser', 'POST', {
     eMail1,
    });
    setMainUserData(response);
   } catch (error) {
    console.log(error.message);
   }
  };

  fetchData();
 }, [auth.eMail, request]);
 return (
  <>
   <IconContext.Provider value={{ color: '#fff' }}>
    <div className='navbar'>
     <Link to='#' className='menu-bars'>
      <FaIcons.FaBars onClick={showSidebar} />
     </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
     <ul className='nav-menu-items' onClick={showSidebar}>
      <li className='navbar-toggle'>
       <Link to='#' className='menu-bars'>
        <AiIcons.AiOutlineClose />
       </Link>
      </li>
      <li
       className='nav-text'
       onClick={() => {
        console.log(mainUserData);
        history.push({ pathname: 'profile', state: mainUserData });
       }}
      >
       <Link to='#'>
        <BiIcons.BiUser />
        <span>{auth.userName}</span>
       </Link>
      </li>
      {SidebarData.map(
       (item, index) =>
        item.title === 'LogOut' ? (
         <li key={index} className={item.cName} onClick={handleSignOut}>
          <Link onClick={() => {}}>
           {item.icon}
           <span>{item.title}</span>
          </Link>
         </li>
        ) : (
         <li key={index} className={item.cName}>
          <Link to={item.path}>
           {item.icon}
           <span>{item.title}</span>
          </Link>
         </li>
        )
       //    if (item.title === 'LogOut') {
       //     return (
       //  <li key={index} className={item.cName} onClick={handleSignOut}>
       //   <Link to={item.path}>
       //    {item.icon}
       //    <span>{item.title}</span>
       //   </Link>
       //  </li>
       //     );
       //    } else {
       //     return (
       //  <li key={index} className={item.cName}>
       //   <Link to={item.path}>
       //    {item.icon}
       //    <span>{item.title}</span>
       //   </Link>
       //  </li>
       //     );
       //    }
      )}
     </ul>
    </nav>
   </IconContext.Provider>
  </>
 );
}

export default Navbar;
