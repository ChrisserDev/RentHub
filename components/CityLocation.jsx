import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import { MdPeopleAlt, MdLocalGasStation } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import axios from 'axios';


export default function CityLocation( ) {
    
    const params = useParams();
    const [vehiclesInCity, setVehiclesInCity] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:4000/location/${params.city}`)
        .then(response => {
          console.log(response.data);
          setVehiclesInCity(response.data);
        })
        .catch(error => console.log('Error fetching vehicles:', error));
  
    }, [params.city]);
  
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    const displayVehiclesInCity = vehiclesInCity.map(location => {
        return (
            <div key={location._id} className='vehicles-in-city'>
              <img src={location.image} />
              <div>
              <div className="vehicle-section-one-copy">
                <h3>{location.carName}</h3>
                <strong>£{location.price}<span>/day</span></strong>
              </div>
                <div className="vehicle-section-two-copy">
                    <p><MdLocalGasStation />{capitalizeFirstLetter(location.fuelType)}</p>
                    <p><GiGearStickPattern />{capitalizeFirstLetter(location.gearType)}</p>
                    <p><MdPeopleAlt />{location.people}</p>
                </div>
                <details>{location.features}</details>
                {/* <li>{vehicle.features}</li> */}
                </div>
                <Link to={`/booking/${location._id}`}>Select</Link>
            </div>
        )
    })
  

  return (
    <div className='city-location'>
        <h1>Explore our vehicles in {params.city}</h1>
        {displayVehiclesInCity}
    </div>
  )
}

