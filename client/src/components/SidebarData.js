import React, { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Games as GamesIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

export const SidebarData = [
 {
  title: 'Home',
  path: '/home',
  icon: <AiIcons.AiFillHome />,
  cName: 'nav-text',
 },
 {
  title: 'Posts',
  path: '/posts',
  icon: <AiIcons.AiFillHome />,
  cName: 'nav-text',
 },
 {
  title: 'Games',
  path: '/games',
  icon: <SportsEsportsIcon />,
  cName: 'nav-text',
 },
 {
  title: 'Users',
  path: '/users',
  icon: <BiIcons.BiUserCircle />,
  cName: 'nav-text',
 },
 {
  title: 'Reports',
  path: '/reports',
  icon: <IoIcons.IoIosPaper />,
  cName: 'nav-text',
 },
 {
  title: 'Products',
  path: '/products',
  icon: <FaIcons.FaCartPlus />,
  cName: 'nav-text',
 },
 {
  title: 'Team',
  path: '/team',
  icon: <IoIcons.IoMdPeople />,
  cName: 'nav-text',
 },
 {
  title: 'Messages',
  path: '/messages',
  icon: <FaIcons.FaEnvelopeOpenText />,
  cName: 'nav-text',
 },
 {
  title: 'Support',
  path: '/support',
  icon: <IoIcons.IoMdHelpCircle />,
  cName: 'nav-text',
 },
 {
  title: 'LogOut',
  path: '/logOut',
  icon: <BiIcons.BiLogOut />,
  cName: 'nav-text',
 },
];
