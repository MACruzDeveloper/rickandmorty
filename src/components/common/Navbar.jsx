import { NavLink } from 'react-router-dom'

const Navbar = () => {

  return <nav className="navbar">
    <ul className="flex">
      <li><NavLink to="/" className="text-2xl uppercase font-bold text-white">Home</NavLink></li>
      <li><NavLink to="/episodes" className="text-2xl uppercase font-bold text-white ml-6">Episodes</NavLink></li>
    </ul>
  </nav>
}

export default Navbar