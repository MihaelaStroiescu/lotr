import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';

const SideDrawer = (props) => {
    return (
        <div className={'sidebarmenu' + (props.isOpen ? ' open' : '') } onClick={props.click}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Books</Link></li>
                <li><Link to="/">Movies</Link></li>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
    )};
export default SideDrawer;
