import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import liverpool from '../../assets/images/liverpool.avif'
import axios from 'axios'
import './Locations.css'

export default function Locations() {

  const [displayLocations, setDisplayLocations] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:4000/locations`)
      .then(response => {
        console.log(response.data);
        setDisplayLocations(response.data);
      })
      .catch(error => console.log('Error fetching vehicles:', error));

  }, []);

  const getLocation = displayLocations.map(location => {
      return (
        <Link to={`/locations/${location._id}`}  key={location._id}>
          <div className='location-details'>
            <h2>{location._id}</h2>
            <img src={location.locationImage} className='locationImage' alt={location._id}></img>
          </div>
        </Link>
      )
  })

  return (
    <div className='locations-container'>
      <h1>Explore our locations</h1>
      <div className='locations-card'>
          {getLocation}
          <div className='location-details'>
            <h2>Coming Soon...</h2>
            <img src={liverpool} />
          </div>
      </div>
    </div>
  );
}

