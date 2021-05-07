import { FaHome } from "react-icons/fa";
import { GiPuzzle, GiPerson } from 'react-icons/gi';


export const SidebarData = [
  {
    title: 'Home',
    path: '/ai_project/',
    icon: <FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Eight Puzzle',
    path: '/ai_project/eightpuzzle',
    icon: <GiPuzzle />,
    cName: 'nav-text'
  },
  {
    title: 'Nine Men',
    path: '/ai_project/ninemen',
    icon: <GiPerson />,
    cName: 'nav-text'
  }
]
