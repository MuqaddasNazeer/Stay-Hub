import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; // Adjust the path based on the actual file structure

import RegisterScreen from '../Screens/RegisterScreen'; // Import your RegisterScreen component
import LoginScreen from '../Screens/LoginScreen'; // Import your LoginScreen component

function NavBar() {
    return (
        <div>
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
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
