import React from 'react';
import {
 FiFacebook,
 FiInstagram,
 FiLinkedin,
 FiTwitter,
 FiYoutube,
} from 'react-icons/fi';

const Footer = () => {
 return (
  <footer>
   <div className='content'>
    <div className='top'>
     <div className='logo-details'>
      <span className='logo_name'>Game Rating App</span>
     </div>
     <div className='media-icons'>
      <a href='#'>
       <FiFacebook />
      </a>
      <a href='#'>
       <FiTwitter />
      </a>
      <a href='#'>
       <FiInstagram />
      </a>
      <a href='#'>
       <FiLinkedin />
      </a>
      <a href='#'>
       <FiYoutube />
      </a>
     </div>
    </div>
    <div className='link-boxes'>
     <ul className='box'>
      <li className='link_name'>Links</li>
      <li>
       <a href='#'>Home</a>
      </li>
      <li>
       <a href='#'>Contact</a>
      </li>
      <li>
       <a href='#'>About Us</a>
      </li>
      <li>
       <a href='#'>Get Started</a>
      </li>
     </ul>
     <ul className='box'>
      <li className='link_name'>Services</li>
      <li>
       <a href='#'>App Design</a>
      </li>
      <li>
       <a href='#'>Web Design</a>
      </li>
      <li>
       <a href='#'>Logo Design</a>
      </li>
      <li>
       <a href='#'>Banner Design</a>
      </li>
     </ul>
     <ul className='box'>
      <li className='link_name'>Other services</li>
      <li>
       <a href='#'>SEO</a>
      </li>
      <li>
       <a href='#'>Content Marketing</a>
      </li>
      <li>
       <a href='#'>Prints</a>
      </li>
      <li>
       <a href='#'>Social Media</a>
      </li>
     </ul>
     <ul className='box'>
      <li className='link_name'>Contact</li>
      <li>
       <a href='#'>+91 8879887262</a>
      </li>
      <li>
       <a href='#'>+91 8879887262</a>
      </li>
      <li>
       <a href='#'>pecheniukoleksandr751@gmail.com</a>
      </li>
     </ul>
    </div>
   </div>
   <div className='bottom-details'>
    <div className='bottom_text'>
     <span className='copyright_text'>
      Copyright © 2021 <a href='#'>Game Rating App.</a>
     </span>
     <span className='policy_terms'>
      <a href='#'>Privacy policy</a>
     </span>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
