import Navbar from "./Navbar"
import logo from '../../assets/images/logo.svg'

const Header = () => {

  return <header className="header">
    <div className="container p-8">
      <div className="flex justify-between items-baseline">
        <img src={logo} className="logo" alt="HBOmax" />

        <Navbar />
      </div>
    </div>
  </header>
}

export default Header