import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
function NavBar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  console.log('User:', user);

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  // State to manage the dropdown status
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
          <span className="stayhub-text">StayHub</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse reg-logg" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {user && user.name ? (
              <li className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`} style={{ marginRight: '7rem' }}>
                <button className="btn btn-default dropdown-toggle" type="button" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", marginRight: '10px' }} />
                  {user.name}
                </button>
                <ul className={`dropdown-menu custom-dropdown ${dropdownOpen ? 'show' : ''} dropdown-menu-right`}>
                  <li>
                    <Link to="/bookings">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={logout}>Logout</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
