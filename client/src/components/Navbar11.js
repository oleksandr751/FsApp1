import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import { useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Navbar = () => {
 const auth = useContext(AuthContext);
 const [scroll, setScroll] = useState({
  prevScrollpos: window.pageYOffset,
  visible: true,
 });
 const history = useHistory();
 const handleSignOut = (event) => {
  event.preventDefault();
  auth.logout();
  history.push('/');
 };
 const [sidebar, setSidebar] = useState(false);
 const showSidebar = () => setSidebar(!sidebar);

 useEffect(() => {
  const handleScroll = () => {
   const { prevScrollpos } = scroll;

   const currentScrollPos = window.pageYOffset;
   const visible = prevScrollpos > currentScrollPos;

   setScroll({
    prevScrollpos: currentScrollPos,
    visible,
   });
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
   window.removeEventListener('scroll', handleScroll);
  };
 }, [scroll]);

 return (
  <>
   <IconContext.Provider value={{ color: '#fff' }}>
    <div className='navbar' style={{ top: scroll.visible ? '0' : '-150px' }}>
     <Link to='#' className='menu-bars'>
      <FaIcons.FaBars onClick={showSidebar} />
     </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
     <ul className='nav-menu-items' onClick={showSidebar}>
      <li className='navbar-toggle'>
       <a to='#' className='menu-bars'>
        <AiIcons.AiOutlineClose />
       </a>
      </li>
      <li
       className='nav-text'
       onClick={() => {
        // console.log(mainUserData);
        // history.push({ pathname: 'profile', state: mainUserData });
        history.push('/');
       }}
      >
       <Link to='#'>
        <BiIcons.BiUser />
        <span>{auth.mainUserData.username}</span>
       </Link>
      </li>
      <li
       className='nav-text'
       onClick={() => {
        history.push('/notifications');
       }}
      >
       {' '}
       <Link to='#'>
        <IoMdNotificationsOutline />
        <span>{`Notifications (${auth.mainUserData.notifications.length})`}</span>
       </Link>
      </li>
      {SidebarData.map(
       (item, index) =>
        item.title === 'LogOut' ? (
         <li key={index} className={item.cName} onClick={handleSignOut}>
          <Link to='#' onClick={() => {}}>
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
};

export default Navbar;
