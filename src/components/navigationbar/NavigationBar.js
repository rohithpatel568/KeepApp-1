import './NavigationBar.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
// import { AiOutlineFileAdd } from 'react-icons/ai'
// import { MdDelete } from 'react-icons/md';
// import { SiGooglekeep } from 'react-icons/si';
function NavigationBar() {
  const activeLink = {
    color : "#dfedee",
    fontSize : "1.2rem",
    fontWeight : "bold"
  }
  const inactiveLink = {
    color : "#dfedee",
    fontSize : "1.2rem"
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-color-main">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <h4 className=" fw-bold">Keep</h4>
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink
                }} to="/add-keep">Add Keep</NavLink> {/* <AiOutlineFileAdd className='add-keep-icon'/> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink
                }} to="/">Keeps</NavLink> {/* <SiGooglekeep className='keep-icon' /> */}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink
                }} to="/deleted-keep">Deleted Keeps</NavLink> {/* <MdDelete className='delete-keep-icon'/> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar