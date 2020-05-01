import React from 'react';
import './SideBarToggle.css';


const SideBarToggle = (props) => (
    <div>
        <button className="toggle-button" onClick={props.click}>
            <div className="toggle-button-line"></div>
            <div className="toggle-button-line"></div>
            <div className="toggle-button-line"></div>
        </button>
    </div>
);

export default SideBarToggle;
