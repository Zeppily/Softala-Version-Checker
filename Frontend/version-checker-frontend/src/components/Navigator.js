
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigator() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return(
        <div>
            <NavLink 
                exact to="/" 
                style={{marginLeft: 20, color: "white", padding: 5, textDecoration: "none"}}
                activeStyle={{color: "lightgrey", textDecoration: "underline"}}
            >
                Server Information
            </NavLink>
            <NavLink 
                exact to="/server_overview" 
                style={{marginLeft: 20, color: "white", padding: 5, textDecoration: "none"}} 
                activeStyle={{color: "lightgrey", textDecoration: "underline"}}
            >
                Server Overview
            </NavLink>
        </div>
        
    )
}