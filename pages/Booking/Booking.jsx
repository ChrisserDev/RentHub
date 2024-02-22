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
        navigate(-1);
    };

    const [features, setFeatures] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState({
        payment: "card"
    })

    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        pickUpTime: ""
    })

    const [paymentCard, setPaymentCard] = useState({
        fName: "",
        lName: "",
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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/api/bookingdata', contactData);
          console.log(response.data);
          // Clear form or show success message
        } catch (error) {
          console.error('Error sending data', error);
          // Show error message
        }
      }

      function handleBookingDetails(e) {
        const { name, value } = e.target;
        
        setContactData(prevContactData => {
          if (name in prevContactData) {
            return {
              ...prevContactData,
              [name]: value
            };
          } else if (name in paymentCard) {  // Corrected syntax here
            // Assuming it's a property of paymentCard
            setPaymentCard(prevPaymentCard => ({
              ...prevPaymentCard,
              [name]: value
            }));
            return prevContactData;
          } else { 
            setPaypalPayment(prevPaypal => ({
              ...prevPaypal,
              [name]: value
            }));
            return prevContactData;
          }
        });
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
                        <input type="text" onChange={handleBookingDetails} name="firstName" value={contactData.firstName}/>
                    </section>
                    <section>
                        <strong><label htmlFor="lastName">Last name*</label><br/></strong>
                        <input type="text" onChange={handleBookingDetails} name="lastName" value={contactData.lastName}/>
                    </section>
                </section>
                <section>
                    <strong><label htmlFor="phoneNumber">Phone Number*</label></strong><br/>
                    <input type="text" onChange={handleBookingDetails} name="phoneNumber" value={contactData.phoneNumber}/>
                </section>
                <section>
                    <strong><label htmlFor="emailAddress">Email Address*</label></strong><br/>
                    <input type="email" onChange={handleBookingDetails} name="emailAddress" value={contactData.emailAddress}/>
                </section>
                <section>
                    <strong><label htmlFor="pickUpTime">Pickup Time*</label></strong><br/>
                    <input type="text" onChange={handleBookingDetails} name="pickUpTime" value={contactData.pickUpTime}/>
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
                                    <strong><label htmlFor="fName">First Name*</label><br/></strong>
                                    <input type="text" onChange={handleBookingDetails} name="fName" value={paymentCard.fName}/>
                                </section>
                                <section>
                                    <strong><label htmlFor="lName">Last Name*</label><br/></strong>
                                    <input type="text" onChange={handleBookingDetails} name="lName" value={paymentCard.lName}/>
                                </section>
                            </div>
                            <section>
                                <strong><label htmlFor="cardNumber">Card Number*</label><br/></strong>
                                <input type="text" onChange={handleBookingDetails} name="cardNumber" value={paymentCard.cardNumber}/>
                            </section>
                         <div className='payment-details-two'>
                                <section>
                                    <strong><label htmlFor="expiry">Expiry Date*</label><br/></strong>
                                    <input type="text" onChange={handleBookingDetails} name="expiry" value={paymentCard.expiry}/>
                                </section>
                                <section>
                                    <strong><label htmlFor="cvvNumber">CVV*</label><br/></strong>
                                    <input type="text" onChange={handleBookingDetails} name="cvvNumber" value={paymentCard.cvvNumber}/>
                                </section>
                            </div>
                        </div>
                        )}
           
                {paymentMethod.payment === 'paypal' && (
                    <div className='payment-details-paypal'>
                        <section>
                            <strong><label htmlFor="personName">Full Name*</label></strong>
                            <input type="text" onChange={handleBookingDetails} name="personName" value={paypalPayment.personName}/>
                        </section>
                        <section><strong><label htmlFor="email">Email*</label></strong>
                            <input type="text" onChange={handleBookingDetails} name="email" value={paypalPayment.email}/>
                        </section>
                        <section>
                            <strong><label htmlFor="contactNumber">Contact Number*</label></strong>
                            <input type="text" onChange={handleBookingDetails} name="contactNumber" value={paypalPayment.contactNumber}/>
                        </section>
                    </div>
)}
                        <button type='button' className='pay-btn' onClick={handleSubmit}>Pay Now</button>
                </form>
            </Modal>
        </div>
        </>
    );
}
