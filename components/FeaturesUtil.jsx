import React, { useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';

export default function FeaturesUtil({vehicle}) {
  const [features, setFeatures] = useState({});

//This function toggles the visibility of features for a specific vehicle.
//It uses the spread operator to create a new object that maintains the existing features state but toggles the value for the specific vehicleId.
  function handleFeaturesChange(vehicleId) {
    setFeatures((prevFeatures) => {
      return { ...prevFeatures, [vehicleId]: !prevFeatures[vehicleId] };
    });
  };

  return (
    <div className='features-container'>
      <h4 onClick={() => handleFeaturesChange(vehicle._id)}>
        Features {features[vehicle._id] ? <IoIosArrowDropupCircle id='features-icon' /> : <IoIosArrowDropdownCircle id='features-icon' />}
      </h4>
      {/* This conditionally renders a paragraph with the vehicle features based on the state of features for the specific vehicle. */}
      {features[vehicle._id] && (<p>{vehicle.features.join(', ')}</p>)}
    </div>
  );
}