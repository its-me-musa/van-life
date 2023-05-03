import React from 'react'
import { Link, NavLink } from 'react-router-dom'


// className={({isActive}) => isActive ? "active-link" : null}  
export default function Header() {
    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    }
    return (
        <header>
            <Link className='site-logo' to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to='/host'
                    style={({isActive}) => isActive ? activeStyle : null}  
                   
                >
                    Host
                </NavLink>
                <NavLink 
                    to='/about'
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to='/vans'
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    Vans
                </NavLink>
            </nav>
        </header>
    )
}

