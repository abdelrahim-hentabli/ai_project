import './navbar.css';
import { Link } from "react-router-dom";

import { useState, useEffect } from 'react'

import { FaBars, FaHome } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { GiPuzzle, GiPerson } from 'react-icons/gi';

import { IconContext } from 'react-icons';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Eight Puzzle',
    path: '/eightpuzzle',
    icon: <GiPuzzle />,
    cName: 'nav-text'
  },
  {
    title: 'Nine Men',
    path: '/ninemen',
    icon: <GiPerson />,
    cName: 'nav-text'
  }
]


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => setSidebar(!sidebar)
  return (
  <IconContext.Provider value={{color: '#fff'}}>
  <div className="navbar">
    <Link to="#" className="menu-bars">
      <FaBars onClick={showSidebar}/>
    </Link>
    <div className="title">
    AI Projects
    </div>
  </div>
  <nav className={sidebar?'nav-menu active':'nav-menu'}>
    <ul className='nav-menu-items'  onClick={showSidebar}>
      <li className='navbar-toggle'>
        <Link to='#' className='menu-bars'>
          <AiOutlineClose/>
        </Link>
      </li>
      {SidebarData.map((item,index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
  </IconContext.Provider>
  );
}

export default Navbar;
