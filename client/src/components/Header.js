import React from 'react';
import {Link} from 'react-router-dom';

const Header = () =>  (
    <div className = "nav-wrapper">
    <nav>
        <Link to={'/'} className = "brand-logo">Travel Packages</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to={'/shop'}>Shop</Link></li>
        <li><Link to={'/about'}>About us</Link></li>
        </ul>
</nav>    
</div>
    )

export default Header;