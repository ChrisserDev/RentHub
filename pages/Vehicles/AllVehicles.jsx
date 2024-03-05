import React, { useState, useEffect } from 'react';
import { MdPeopleAlt, MdLocalGasStation } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FeaturesUtil from '../../components/FeaturesUtil';
import { HiOutlineEmojiSad } from "react-icons/hi";
import Spinner from '../../public/Spinner.gif';
import './AllVehicles.css';

export default function AllVehicles() {

    const navigate = useNavigate();

    // State for managing search parameters, displayed vehicles, filtered vehicles, loading status, and error handling.
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    const [displayVehicles, setDisplayVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial form data for filtering
    const initialFormData = {
        vehicleType: "",
        gearType: "",
        fuelType: "",
        people: "",
        price: ""
      };

    // State for managing form data used for filtering
    const [formData, setFormData] = useState(initialFormData);

    // Function to clear filters and reset states
    const handleClearFilters = () => {
        setFormData(initialFormData);
        setFilteredVehicles([]);
        setSearchParams([])
      };

    // Fetching all the vehicles from the server on component mount
    useEffect(() => {
        axios.get(`https://renthub-ozyk.onrender.com/api/vehicles`)
            .then(response => {
                setDisplayVehicles(response.data);
            })
            .catch(error => console.log('Error fetching vehicles:', error));
    }, []);

    // Function to update search parameters based on filter changes
    function handleFilterChange(key, value) {
        const sp = new URLSearchParams(searchParams);
        if (value === null) {
            sp.delete(key);
        } else {
            sp.set(key, value);
        }
        setSearchParams(sp);
    };

    // Trigger the navigation only when searchParams change
    useEffect(() => {
        navigate(`/AllVehicles${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
    }, [searchParams, navigate]);

    // Function to handle input changes in the filter form
    function handleInputChange(e){
        const { id, value } = e.target;

        // Update form data with the new value, keeping the existing values
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [id]: value };
            // Update query parameters based on the updated form data
            handleFilterChange(id, value);

            // Filtering logic based on updated form data
            const newFilteredVehicles = [...displayVehicles].filter((vehicle) => {
                return (
                    (updatedFormData.vehicleType === "" || vehicle.type === updatedFormData.vehicleType) &&
                    (updatedFormData.fuelType === "" || vehicle.fuelType === updatedFormData.fuelType) &&
                    (updatedFormData.gearType === "" || vehicle.gearType === updatedFormData.gearType) &&
                    (updatedFormData.people === "" || vehicle.people.toString() === updatedFormData.people)
                );
            });

        // Sort the newFilteredVehicles based on the selected price option
        if (id === 'price') {
            if (value === 'lowToHigh') {
            newFilteredVehicles.sort((a, b) => a.price - b.price);
            } else if (value === 'highToLow') {
            newFilteredVehicles.sort((a, b) => b.price - a.price);
            }
        }
            // Update filtered vehicles and return updated form data
            setFilteredVehicles(newFilteredVehicles);
            return updatedFormData;
        });
    };

    // This checks whether filters have been applied before showing the "no matching vehicles" message. 
    // If filters are applied and no vehicles match, the message will be displayed; otherwise, it will display the matching vehicles.
    const filtersApplied = Object.values(formData).some(value => value !== '');

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    //Loading effect
    useEffect(() => {
        setTimeout(() => {
        setLoading(false);
        }, 1200);
    }, []);

return (
    <>
    {loading ? (
    <img className='loader' src={Spinner} alt='Loading...'/>
    ) : (
    <>
    <h5 className='vehicles-top-description'>Explore the selection of our cars and discover the perfect match for your needs.</h5>
    <div className='all-vehicles-container'>
        <form className='search-container'>
            <h2>Filters</h2>
            <div className='selected-choices'>
                <strong><label htmlFor='vehicleType'>Vehicle Type</label></strong>
                <select id='vehicleType' value={formData.vehicleType} onChange={(e) => handleInputChange(e)}>
                    <option value="">----</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                </select>
            </div>
            <div className='selected-choices'>
                <strong><label htmlFor='gearType'>Transmission</label></strong>
                <select id='gearType' value={formData.gearType} onChange={(e) => handleInputChange(e)}>
                    <option value="">----</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </div>
            <div className='selected-choices'>
                <strong><label htmlFor='fuelType'>Fuel Type</label></strong>
                <select id='fuelType' value={formData.fuelType} onChange={(e) => handleInputChange(e)}>
                    <option value="">----</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                </select>
            </div>
            <div className='selected-choices'>
                <strong><label htmlFor='people'>Number of Passengers</label></strong>
                <select id='people' value={formData.people} onChange={(e) => handleInputChange(e)}>
                    <option value="">----</option>
                    <option value="7">7</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div className='selected-choices'>
                <strong><label htmlFor='price'>Price</label></strong>
                <select id='price' value={formData.price} onChange={(e) => handleInputChange(e)}>
                    <option value="">----</option>
                    <option value="lowToHigh">Low To High</option>
                    <option value="highToLow">High To Low</option>
                </select>
            </div> 
            <button type='button' className='clear-filters-btn' onClick={handleClearFilters}>Clear Filters</button>
            </form>
            <div className='all-vehicles'>
              {filtersApplied && filteredVehicles.length === 0 ? (
                <div className='no-match-vehicles'>
                    <h2>Sorry, no vehicle matches your selection.</h2>
                    <HiOutlineEmojiSad />
                </div>
            ) : 
            (filteredVehicles.length > 0 ? filteredVehicles : displayVehicles).map(vehicle => (
                    <div key={vehicle._id} className="vehicle-container">
                        <img src={vehicle.image} alt={vehicle.carName} />
                        <div className='vehicle-cards'>
                        <div className="vehicle-section-one">
                            <h2>{vehicle.carName}</h2>
                            <p>£{vehicle.price}<strong>/day</strong></p>
                        </div>
                        <div className="vehicle-section-two">
                            <p><MdLocalGasStation />{vehicle.fuelType}</p>
                            <p><GiGearStickPattern />{vehicle.gearType}</p>
                            <p><MdPeopleAlt />{vehicle.people}</p>
                            <p><IoBag />{vehicle.bags}</p>
                        </div>
                        <div className='features-container'>
                        <FeaturesUtil vehicle={vehicle}/>
                        </div>
                        </div>
                        <Link to={`/booking/${vehicle._id}`}>Select</Link>
                        </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}