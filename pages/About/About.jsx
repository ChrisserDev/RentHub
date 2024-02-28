import React from "react"
import bgImg from "../../images/about-cover.jpg"
import './About.css'

export default function About() {
    return (
        <div className="about-page-container">
            <img src={bgImg} className="about-image" />
            <div className="about-page-content">
                <h1>About</h1>
                <p>Welcome to <span className="logo-text">#RentHub</span>, where our mission is to transform your road trip into an unforgettable adventure with the perfect travel vehicle rental. 
                 <br/>Each vehicle undergoes a meticulous recertification process before every trip to ensure that it meets the highest standards of safety, performance, and cleanliness. Our commitment to excellence is your assurance that your travel plans will go off without a hitch — though if you need one, we do offer hitch options for those seeking a bit of extra utility (hitch costs extra 😉). What sets us apart is our passionate team of travel enthusiasts. We understand firsthand the magic of embarking on a journey with the perfect vehicle, and we want to share that magic with you. Whether you're planning a cross-country road trip, a weekend getaway, or a business excursion, our team is here to make sure your rental experience is seamless and enjoyable. 
                    At <span className="logo-text">#RentHub</span>, we take pride in the quality of our fleet. Let's hit the road together, and let the journey begin!</p>
            </div>
        </div>
    );
}