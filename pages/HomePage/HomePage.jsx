import React from "react"
import { Link } from "react-router-dom"
import './HomePage.css'

export default function HomePage() {
    return (
        <div className="home-container">
            <h1>You got the travel plans, we got the travel vehicle.</h1>
            <p>Add adventure to your life by joining the <strong>#RentHub</strong> movement. Rent the perfect vehicle to make your perfect road trip.</p>
            <div className="about-page-cta">
                <Link className="link-button" to="/AllVehicles">Explore our vehicles</Link>
            </div>
        </div>
    )
};