import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'; // Import your logo file
import '../styles/Navbar.css'

const Navbar = (props) => {
  // Define the text color based on the mode
  const textColor = props.mode === 'dark' ? 'text-light' : 'text-dark';

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container">
        <Link className={`navbar-brand font-weight-bold ${textColor}`} to="/">
          Momentum AI<img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top ml-2" />
        </Link> {/* Display "Momentum" in bold */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/* Add other navigation links here if needed */}
            <li className="nav-item">
              <Link className={`nav-link ${textColor}`} to="/about">{props.about}</Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <div className="custom-control custom-switch mr-3">
              <input type="checkbox" className="custom-control-input" id="customSwitches" onClick={props.togglemode} />
              <label className={`custom-control-label ${textColor}`} htmlFor="customSwitches">Dark Mode</label>
            </div>
            {/* Add search form if needed */}
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
  mode: PropTypes.string.isRequired,
  togglemode: PropTypes.func.isRequired
}

export default Navbar;

