import React, { useState, useContext } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import SideBarToggle from './sidebarmenu/SideBarToggle';
import SideDrawer from './sidebarmenu/SideDrawer';
import AuthContex from './../auth/AuthContext';
import  './Header.css';


function Header() {
    const { userName, setUserName } = useContext(AuthContex);
    let [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const drawerToggleClickHandler = ()  => {
        setSideDrawerOpen(!sideDrawerOpen);
    };

    function handlerLogout(e){
        e.preventDefault();
        setUserName(null);
        localStorage.removeItem('userName');
    }

    return(
        <div>
            <header className="header-wrapper">
                <nav className="navigation-bar">
                    <SideDrawer click={drawerToggleClickHandler} isOpen={sideDrawerOpen} />
                    <SideBarToggle click={drawerToggleClickHandler} />
                    <div className="nav-logo"><NavLink to="/"><img alt="Logo" src="/lotr.jpg" /></NavLink></div>
                    <div className="navigation-bar-items">
                        <ul>
                            <li>{(userName || localStorage.userName ?
                                <>
                                    <NavLink activeClassName="active" to="/">Welcome {userName}</NavLink>
                                </>
                                :
                                <>
                                    <NavLink activeClassName="active" to="/">Home</NavLink>
                                </>
                            )}
                            </li>
                            <li><NavLink activeClassName="active" to="/books">Books</NavLink></li>
                            <li><NavLink activeClassName="active" to="/movies">Movies</NavLink></li>
                            <li>{(userName  || localStorage.userName ?
                                <>
                                <a href="/" onClick={handlerLogout}>Logout</a>
                                <Redirect to="/" />
                                </>
                                :
                                <>
                                    <NavLink activeClassName="active" to="/register">Register</NavLink>
                                    <NavLink activeClassName="active" to="/login">/Login</NavLink>
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
