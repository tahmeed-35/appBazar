import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link to="/" className="flex items-center ml-4 gap-2">
          <img src={logo} alt="logo" className="h-10" />
          <span className="text-xl font-bold text-slate-800 hidden sm:block">appBazar</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "text-purple-600 bg-transparent" : "text-gray-700"}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/apps" className={({isActive}) => isActive ? "text-purple-600 bg-transparent" : "text-gray-700"}>Apps</NavLink>
          </li>
          <li>
            <NavLink to="/installation" className={({isActive}) => isActive ? "text-purple-600 bg-transparent" : "text-gray-700"}>Installation</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a href="https://github.com/tahmeed-35/appBazar" className="btn bg-purple-500 hover:bg-purple-600 text-white border-0 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          Contribute
        </a>
      </div>
    </div>
  )
}

export default Header;
