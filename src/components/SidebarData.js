import { FaHome } from "react-icons/fa";
import { GiPuzzle, GiPerson } from 'react-icons/gi';


export const SidebarData = [
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
