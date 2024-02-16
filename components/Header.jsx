import React from "react"
import { Link, NavLink } from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"

export default function Header() {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <header>
            <Link className="site-logo" to="/">#RentHub</Link>
            <nav>
                <NavLink to="about" style={({ isActive }) => isActive ? activeStyles : null}>About</NavLink>
                <NavLink to="AllVehicles" style={({ isActive }) => isActive ? activeStyles : null}>Vehicles</NavLink>
                <NavLink to="location" style={({ isActive }) => isActive ? activeStyles : null}>Locations</NavLink>
                <Link to="login" className="login-link"><img src={imageUrl} className="login-icon"/>Login</Link>
            </nav>
        </header>
    )
}