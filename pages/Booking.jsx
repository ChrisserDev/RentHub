import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdPeopleAlt, MdLocalGasStation, MdOutlineKeyboardBackspace } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { TfiLocationPin } from "react-icons/tfi";
import { FaPaypal, FaRegCreditCard } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-modal';

export default function Booking() {

    const [paymentCard, setPaymentCard] = useState({
        firstName: "",
        lastName: "",
        cardNumber: "",
        expiry: "",
        cvvNumber: ""
    })

    const [paypalPayment, setPaypalPayment] = useState({
        personName: "",
        email: "",
        contactNumber: ""
    })

    const [paymentMethod, setPaymentMethod] = useState(false);

    const { id } = useParams(); // Destructure id from useParams
    const [displayVehicle, setDisplayVehicle] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/${id}`) // Use the correct endpoint with id
            .then(response => {
                console.log(Object.values(response.data));
                setDisplayVehicle(Object.values(response.data));
            })
            .catch(error => console.log('Error fetching vehicles:', error));

    }, [id]);

    Modal.setAppElement(document.getElementById('root'));
    const [isOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)"
        }
      };

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') {
            return string; // Return as is if not a string
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function handlePaymentMethod(){
        setPaymentMethod()
    }
    

    return (
        <>
        <Link to="/" className='back-button'><MdOutlineKeyboardBackspace/>Go Back</Link>
        <div className='booking-container'>
            <div className='booking-details'>
                <section className='title-and-price'>       
                    <h2>{displayVehicle[2]}</h2>
                    <h4>${displayVehicle[5]}/day</h4>
                </section>
                <img src={displayVehicle[9]}/>
                <section className='vehicle-details'>
                    <p><MdLocalGasStation />{capitalizeFirstLetter(displayVehicle[6])}</p>
                    <p><GiGearStickPattern />{capitalizeFirstLetter(displayVehicle[3])}</p>
                    <p><MdPeopleAlt />{displayVehicle[4]}</p>
                    <p><IoBag />{displayVehicle[7]}</p>
                </section>
                <h5><TfiLocationPin />Pick-up: {displayVehicle[10]}</h5>
                <details>{displayVehicle[8]}</details>
            </div>
            <form className='form-container'>
                <h2>Contact Details</h2>
                <section className='name-container'>
                    <section>
                        <strong><label htmlFor="firstName">First name*</label><br/></strong>
                        <input type="text" id="firstName" name="firstName" />
                    </section>
                    <section>
                        <strong><label htmlFor="lastName">Last name*</label><br/></strong>
                        <input type="text" id="lastName" name="lastName" />
                    </section>
                </section>
                <section>
                    <strong><label htmlFor="phoneNumber">Phone Number*</label></strong><br/>
                    <input type="text" id="phoneNumber" name="phoneNumber" />
                </section>
                <section>
                    <strong><label htmlFor="email">Email Address*</label></strong><br/>
                    <input type="email" id="email" name="email" />
                </section>
                <section>
                    <strong><label htmlFor="pickup">Pickup Time*</label></strong><br/>
                    <input type="text" id="pickup" name="pickup" />
                </section>
                <button type='button' onClick={() => setIsOpen(true)}>Book Now</button>
            </form>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <form className='payment-modal'>
                    <h1>Payment Form</h1>
                    <button className='close-modal' onClick={() => setIsOpen(false)}>X</button>
                    <div>
                        <h3>Payment Methods</h3>
                        <section>
                            <input type="radio" id="card" name="card" />
                            <strong><label htmlFor="card"><FaRegCreditCard />Debit or Credit Card</label><br/></strong>
                        </section>
                        <section>
                            <input type="radio" id="paypal" name="paypal" />
                            <strong><label htmlFor="paypal"><FaPaypal />Paypal</label><br/></strong>
                        </section>
                        <div className='payment-details'>
                            <section>
                                <strong><label htmlFor="firstName">First Name*</label><br/></strong><br />
                                <input type="text" id="firstName" name="firstName" />
                            </section>
                            <section>
                                <strong><label htmlFor="lastName">Last Name*</label><br/></strong><br />
                                <input type="text" id="lastName" name="lastName" />
                            </section>
                        </div>
                            <section>
                                <strong><label htmlFor="cardNumber">Card Number*</label><br/></strong><br />
                                <input type="text" id="cardNumber" name="cardNumber" />
                            </section>
                            <div className='payment-details-two'>
                                <section>
                                    <strong><label htmlFor="expiry">Expiry Date*</label><br/></strong><br />
                                    <input type="text" id="expiry" name="expiry" />
                                </section>
                                <section>
                                    <strong><label htmlFor="cvv">CVV*</label><br/></strong><br />
                                    <input type="cvv" id="expiry" name="cvv" />
                                </section>
                        </div>
                    </div>
                        <button type='button' className='pay-btn' onClick={() => setIsOpen(false)}>Pay Now</button>
                </form>
            </Modal>
        </div>
        </>
    );
}
