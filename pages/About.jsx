import React from "react"
import bgImg from "../assets/images/about-cover.jpg"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="about-page-container">
            <img src={bgImg} className="about-image" />
            <div className="about-page-content">
                <h1>About</h1>
                <p>Welcome to #RentHub, where our mission is to transform your road trip into an unforgettable adventure with the perfect travel vehicle rental. 
                 We believe that every journey should be marked by comfort, reliability, and a touch of excitement, and that's exactly what we strive to provide. 
                 <br/>At #RentHub, we take pride in the quality of our fleet. Each vehicle undergoes a meticulous recertification process before every trip to ensure that it meets the highest standards of safety, performance, and cleanliness. Our commitment to excellence is your assurance that your travel plans will go off without a hitch — though if you need one, we do offer hitch options for those seeking a bit of extra utility (hitch costs extra 😉). What sets us apart is our passionate team of travel enthusiasts. We understand firsthand the magic of embarking on a journey with the perfect vehicle, and we want to share that magic with you. Whether you're planning a cross-country road trip, a weekend getaway, or a business excursion, our team is here to make sure your rental experience is seamless and enjoyable. 
                 <br/>Choose #RentHub for more than just a rental — choose us for a partner in your travel endeavors. We're not just providing vehicles; we're offering the keys to your next adventure. Let's hit the road together, and let the journey begin!</p>
            </div>
        </div>
    );
}