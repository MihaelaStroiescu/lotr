import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SideBarToggle from './sidebarmenu/SideBarToggle';
import SideDrawer from './sidebarmenu/SideDrawer';
// import Register from './../auth/Register';
import AutoContex from './../auth/AuthContext';
import  './Header.css';


function Header() {
    const { userName, setUserName } = useContext(AutoContex);
    let [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const drawerToggleClickHandler = ()  => {
        setSideDrawerOpen(!sideDrawerOpen);
    };

    function handlerLogout(e){
        e.preventDefault();
        setUserName('');
        localStorage.removeItem('userName');
    }

    return(
        <div>
            <header className="header-wrapper">
                <nav className="navigation-bar">
                    <SideDrawer click={drawerToggleClickHandler} isOpen={sideDrawerOpen} />
                    <SideBarToggle click={drawerToggleClickHandler} />
                    <div className="nav-logo"><Link to="/"><img alt="Logo" src="/lotr.jpg" /></Link></div>
                    <div className="navigation-bar-items">
                        <ul>
                            <li><Link to="/">Home  {userName}</Link></li>
                            <li><Link to="/">Books</Link></li>
                            <li><Link to="/movies">Movies</Link></li>
                            <li>{(userName?
                                <a href="/" onClick={handlerLogout}>Logout</a>
                                :
                                <>
                                <Link to="/register">Register</Link>
                                <Link to="/login">/Login</Link>
                                </>
                            )}
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header;
