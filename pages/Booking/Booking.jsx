import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdPeopleAlt, MdLocalGasStation, MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { TfiLocationPin } from "react-icons/tfi";
import { FaPaypal, FaRegCreditCard } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-modal';
import './Booking.css'

export default function Booking() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        // Use navigate to go back
        navigate(-1);
    };

    const [features, setFeatures] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState({
        payment: "card"
    })

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


    const { id } = useParams();
    const [displayVehicle, setDisplayVehicle] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/${id}`) 
            .then(response => {
                console.log(Object.values(response.data));
                setDisplayVehicle(Object.values(response.data));
            })
            .catch(error => console.log('Error fetching vehicles:', error));

    }, [id]);

    console.log(paymentMethod.payment)

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
            backgroundColor: "rgba(0, 0, 0, 0.8)"
        }
      };


    function handlePaymentMethod(e){
        const {name, value, type, checked} = e.target
        setPaymentMethod(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    

    return (
        <>
        <button className='back-button' onClick={handleGoBack}><MdOutlineKeyboardBackspace/>Go Back</button>
        <div className='booking-container'>
            <div className='booking-details'>
                <section className='title-and-price'>       
                    <h2>{displayVehicle[2]}</h2>
                    <p>£{displayVehicle[5]}<strong>/day</strong></p>
                </section>
                <img src={displayVehicle[9]}/>
                <section className='vehicle-details'>
                    <p><MdLocalGasStation />{displayVehicle[6]}</p>
                    <p><GiGearStickPattern />{displayVehicle[3]}</p>
                    <p><MdPeopleAlt />{displayVehicle[4]}</p>
                    <p><IoBag />{displayVehicle[7]}</p>
                </section>
                <div className='features-container'>
                    <h4 onClick={() => setFeatures(prevValue => !prevValue)}> 
                        Features {features ? <IoIosArrowDropupCircle id='features-icon' /> : <IoIosArrowDropdownCircle id='features-icon' />} 
                    </h4>
                        {features && (<p>{displayVehicle[8].join(' ')}</p>)}                        
                </div>
                <p><TfiLocationPin />Pick-up: {displayVehicle[10]}</p>
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
                    <h2>Payment Form</h2>
                    <button className='close-modal' onClick={() => setIsOpen(false)}>X</button>
                        <h3>Payment Methods</h3>
                        <div className='payment-methods'>
                            <section>
                                <input type="radio" 
                                        id="card" 
                                        name="payment" 
                                        value="card" 
                                        onChange={handlePaymentMethod}
                                        checked={paymentMethod.payment === "card"}
                                />
                                <label htmlFor="card"> <FaRegCreditCard /> Debit/Credit Card</label><br/>
                            </section>
                            <section>
                                <input type="radio" 
                                        id="paypal" 
                                        name="payment" 
                                        value="paypal" 
                                        onChange={handlePaymentMethod}
                                        checked={paymentMethod.payment === "paypal"}
                                />
                                <label htmlFor="paypal"> <FaPaypal /> Paypal</label><br/>
                            </section>
                        </div>
                        {paymentMethod.payment === 'card' && (
                        <div className='payment-details-card'>
                            <div className='name-container'>
                                <section>
                                    <strong><label htmlFor="firstName">First Name*</label><br/></strong>
                                    <input type="text" id="firstName" name="firstName" />
                                </section>
                                <section>
                                    <strong><label htmlFor="lastName">Last Name*</label><br/></strong>
                                    <input type="text" id="lastName" name="lastName" />
                                </section>
                            </div>
                            <section>
                                <strong><label htmlFor="cardNumber">Card Number*</label><br/></strong>
                                <input type="text" id="cardNumber" name="cardNumber" />
                            </section>
                         <div className='payment-details-two'>
                                <section>
                                    <strong><label htmlFor="expiry">Expiry Date*</label><br/></strong>
                                    <input type="text" id="expiry" name="expiry" />
                                </section>
                                <section>
                                    <strong><label htmlFor="cvv">CVV*</label><br/></strong>
                                    <input type="text" id="cvv" name="cvv" />
                                </section>
                            </div>
                        </div>
                        )}
           
                {paymentMethod.payment === 'paypal' && (
                    <div className='payment-details-paypal'>
                        <section>
                            <strong><label htmlFor="personName">Full Name*</label></strong>
                            <input type="text" id="personName" name="personName" />
                        </section>
                        <section><strong><label htmlFor="email">Email*</label></strong>
                            <input type="text" id="email" name="email" />
                        </section>
                        <section>
                            <strong><label htmlFor="contactNumber">Contact Number*</label></strong>
                            <input type="text" id="contactNumber" name="contactNumber" />
                        </section>
                    </div>
)}
                        <button type='button' className='pay-btn' onClick={() => setIsOpen(false)}>Pay Now</button>
                </form>
            </Modal>
        </div>
        </>
    );
}
