import React, { useState, useEffect } from 'react';
import { MdPeopleAlt, MdLocalGasStation } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AllVehicles() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    const [displayVehicles, setDisplayVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [formData, setFormData] = useState({
        vehicleType: "",
        gearType: "",
        fuelType: "",
        people: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:4000/api/vehicles${searchParams.toString()}`)
        .then(response => {
                console.log(response.data);
                setDisplayVehicles(response.data);
            })
            .catch(error => console.log('Error fetching vehicles:', error));
    }, [searchParams]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleFilterChange = (key, value) => {
        const sp = new URLSearchParams(searchParams);
        if (value === null) {
            sp.delete(key);
        } else {
            sp.set(key, value);
        }
    
        // Set the searchParams directly, triggering the useEffect in the component
        setSearchParams(sp);
        
        navigate(`/AllVehicles${sp.toString() ? `?${sp.toString()}` : ''}`);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Update form data with the new value, keeping the existing values
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [id]: value };

            // Update query parameters based on the updated form data
            handleFilterChange(id, value);

            const newFilteredVehicles = displayVehicles.filter((vehicle) => {
                return (
                    (updatedFormData.vehicleType === "" || vehicle.type === updatedFormData.vehicleType) &&
                    (updatedFormData.fuelType === "" || vehicle.fuelType === updatedFormData.fuelType) &&
                    (updatedFormData.gearType === "" || vehicle.gearType === updatedFormData.gearType) &&
                    (updatedFormData.people === "" || vehicle.people === parseInt(updatedFormData.people, 10))
                );
            });

            setFilteredVehicles(newFilteredVehicles);
            return updatedFormData; // Return the updated form data
        });
    };

    return (
        <>
            <form className='search-container'>
                <div className='selected-choices'>
                    <strong><label htmlFor='vehicleType'>VEHICLE TYPE</label></strong>
                    <select id='vehicleType' value={formData.vehicleType} onChange={(e) => handleInputChange(e)}>
                        <option value="">----</option>
                        <option value="car">Car</option>
                        <option value="van">Van</option>
                    </select>
                </div>
                <div className='selected-choices'>
                    <strong><label htmlFor='gearType'>TRANSMISSION</label></strong>
                    <select id='gearType' value={formData.gearType} onChange={(e) => handleInputChange(e)}>
                        <option value="">----</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                    </select>
                </div>
                <div className='selected-choices'>
                    <strong><label htmlFor='fuelType'>FUEL TYPE</label></strong>
                    <select id='fuelType' value={formData.fuelType} onChange={(e) => handleInputChange(e)}>
                        <option value="">----</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                    </select>
                </div>
                <div className='selected-choices'>
                    <strong><label htmlFor='people'>NUMBER OF PASSENGERS</label></strong>
                    <select id='people' value={formData.people} onChange={(e) => handleInputChange(e)}>
                        <option value="">----</option>
                        <option value="7">7</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                    </select>
                </div> 
            </form>
            <div className='all-vehicles'>
                {(filteredVehicles.length > 0 ? filteredVehicles : displayVehicles).map(vehicle => (
                    <div key={vehicle._id} className="vehicle-container">
                        <img src={vehicle.image} alt={vehicle.carName} />
                        <div className="vehicle-section-one">
                            <h3>{vehicle.carName}</h3>
                            <strong>£{vehicle.price}<span>/day</span></strong>
                        </div>
                        <div className="vehicle-section-two">
                            <p><MdLocalGasStation />{capitalizeFirstLetter(vehicle.fuelType)}</p>
                            <p><GiGearStickPattern />{capitalizeFirstLetter(vehicle.gearType)}</p>
                            <p><MdPeopleAlt />{vehicle.people}</p>
                            <p><IoBag />{vehicle.bags}</p>
                        </div>
                        <details>{vehicle.features}</details>
                        <Link to={`/booking/${vehicle._id}`}>Select</Link>
                    </div>
                ))}
            </div>
        </>
    )
}


/*
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    // if (loading) {
    //     return <h1>Loading...</h1>
    // }
    
    // if (error) {
    //     return <h1>There was an error: {error.message}</h1>
    // }
*/