import React, { useState, useEffect } from 'react';
import { MdPeopleAlt, MdLocalGasStation } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllVehicles() {
  const [displayVehicles, setDisplayVehicles] = useState([]);
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/vehicles')
      .then(response => {
        console.log(response.data);
        setDisplayVehicles(response.data);
      })
      .catch(error => console.log('Error fetching vehicles:', error));
  }, []);

//   useEffect(() => {
//     axios.get('http://localhost:4000/types')
//       .then(response => {
//         console.log(response.data);
//         setTypes(response.data);
//       })
//       .catch(error => console.log('Error fetching vehicles:', error));
//   }, []);

//   const getTypes = types.map(type => {
//     return <p>{type}</p>
//   })

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  

const vehicleElements = displayVehicles.map(vehicle => (
    <div key={vehicle._id} className="vehicle-container">
      <img src={vehicle.image} />
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
        {/* <li>{vehicle.features}</li> */}
        <Link to={`/booking/${vehicle._id}`}>Select</Link>
    </div>
  ));

  return (
    <>
    <form className='search-container'>
        <div className='selected-choices'>
            <strong><label htmlFor='vehicleType'>VEHICLE TYPE</label></strong>
                <select id='vehicleType'>
                    <option value="">----</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                </select>
        </div>
        <div className='selected-choices'>
            <strong><label htmlFor='transmission'>TRANSMISSION</label></strong>
                <select id='transmission'>
                    <option value="">----</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                </select>
        </div>
        <div className='selected-choices'>
            <strong><label htmlFor='fuelType'>FUEL TYPE</label></strong>
                <select id='fuelType'>
                    <option value="">----</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                </select>
        </div>
        <div className='selected-choices'>
            <strong><label htmlFor='passengers'>NUMBER OF PASSENGERS</label></strong>
                <select id='passengers'>
                    <option value="">----</option>
                    <option value="seven">7</option>
                    <option value="five">5</option>
                    <option value="four">4</option>
                    <option value="three">3</option>
                    <option value="two">2</option>
                </select>
        </div>
    </form>
    <div className='all-vehicles'>
      {vehicleElements}
    </div>
  </>
  );
}















// export default function Cars() {
    // const [searchParams, setSearchParams] = useSearchParams()
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    // const typeFilter = searchParams.get("type")

    // const displayedVans = typeFilter
    //     ? vans.filter(van => van.type === typeFilter)
    //     : vans


    // function handleFilterChange(key, value) {
    //     setSearchParams(prevParams => {
    //         if (value === null) {
    //             prevParams.delete(key)
    //         } else {
    //             prevParams.set(key, value)
    //         }
    //         return prevParams
    //     })
    // }

    // if (loading) {
    //     return <h1>Loading...</h1>
    // }
    
    // if (error) {
    //     return <h1>There was an error: {error.message}</h1>
    // }

    // return (
    //     <div className="van-list-container">
    //         <h1>Explore our car options</h1>
            /* <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={
                        `van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`
                    }
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={
                        `van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
                    }
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={
                        `van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`
                    }
                >Rugged</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                ) : null}

            </div>
            <div className="van-list">
                {vanElements}
            </div> */
//         </div>
//     )
// }

