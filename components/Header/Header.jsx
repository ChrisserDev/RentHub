import React from "react"
import { Link, NavLink } from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"
import './Header.css'

export default function Header() {

    // The activeStyles object defines the styling for the NavLink that is currently active, indicating the page the user is currently on. 
    // This styling is applied conditionally based on the isActive prop provided by React Router. 
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#4779a8"
    }

    return (
        <header>
            <Link className="site-logo" to="/">#RentHub</Link>
            <nav>
                <NavLink to="about" style={({ isActive }) => isActive ? activeStyles : null}>About</NavLink>
                <NavLink to="AllVehicles" style={({ isActive }) => isActive ? activeStyles : null}>Vehicles</NavLink>
                <NavLink to="locations" style={({ isActive }) => isActive ? activeStyles : null}>Locations</NavLink>
                <Link to="login" className="login-link"><img src={imageUrl} className="login-icon"/>Login</Link>
            </nav>
        </header>
    )
}