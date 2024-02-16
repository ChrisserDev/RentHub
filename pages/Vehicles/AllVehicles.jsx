import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllVehicles() {
  const [displayVehicles, setDisplayVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/vehicles')
      .then(response => {
        console.log(response.data);
        setDisplayVehicles(response.data);
      })
      .catch(error => console.log('Error fetching vehicles:', error));

  }, []);

  const vehicleElements = displayVehicles.map(vehicle => (
    <div key={vehicle._id} className="vehicle-container">
      <img src={vehicle.image} />
      <div className="vehicle-info">
        <h3>{vehicle.carName}</h3>
        <p>£{vehicle.price}<span>/day</span></p>
      </div>
      <i className={`vehicle-type ${vehicle.type} selected`}>{vehicle.type}</i>
    </div>
  ));

  return (
    <div>
      <h1>Vehicles</h1>
      {vehicleElements}
    </div>
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

