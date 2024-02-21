import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdPeopleAlt, MdLocalGasStation } from 'react-icons/md';
import { GiGearStickPattern } from 'react-icons/gi';
import axios from 'axios';
import FeaturesUtil from '../../components/FeaturesUtil';
import './CityLocation.css'

export default function CityLocation() {
  const {city} = useParams();
  const [vehiclesInCity, setVehiclesInCity] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/location/${city}`)
      .then(response => {
        setVehiclesInCity(response.data);
      })
      .catch(error => console.log('Error fetching vehicles:', error));
  }, [city]);

  const displayVehiclesInCity = vehiclesInCity.map(vehicle => {
    return (
      <div key={vehicle._id} className='vehicle-container-copy'>
        <img src={vehicle.image} />
        <div className='vehicle-cards'>
          <div className="vehicle-section-one">
            <h3>{vehicle.carName}</h3>
            <p>£{vehicle.price}<strong>/day</strong></p>
          </div>
          <div className="vehicle-section-two">
            <p><MdLocalGasStation />{vehicle.fuelType}</p>
            <p><GiGearStickPattern />{vehicle.gearType}</p>
            <p><MdPeopleAlt />{vehicle.people}</p>
          </div>
          <FeaturesUtil vehicle={vehicle}/>
        </div>
        <Link to={`/booking/${vehicle._id}`}>Select</Link>
      </div>
    );
  });


  return (
    <div className='city-location'>
        <h1>Explore our vehicles in {city}</h1>
        {displayVehiclesInCity}
    </div>
  )
}

