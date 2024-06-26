import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'; // Import your logo file
import '../styles/Navbar.css'

export default function Navbar(props) {
      return (
          <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
              <a className="navbar-brand" href="/">{props.title}</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
  
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                     <li className="nav-item active">
                          <Link className="nav-link" to="/">Recording <span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/upload"> FILE Upload {props.about}</Link>
                          
                      </li>
    
                  </ul>
                  {/* <form className="form-inline my-2 my-lg-0">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form> */}
                  <div className="custom-control custom-switch mx-3">
                      <input type="checkbox" className="custom-control-input"  onClick={props.togglemode}id="customSwitches" />
                      <label className="custom-control-label" htmlFor="customSwitches">Dark Mode</label>
                 </div>
  
              </div>
          </nav>
      )
  }
  
  Navbar.propTypes = {
      title: PropTypes.string,
      about: PropTypes.string,
  }

