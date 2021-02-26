import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../resources/images/logo.png'

function Nav() {
  return (
    <header>
      <div class="header-container">
        <Link><img id="nav-logo" src={logo} alt="FPL Insight logo" /></Link>
        <nav>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/insight">
              <li>Insight</li>
            </Link>
        
        
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
