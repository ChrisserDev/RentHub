import React, { useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';

export default function FeaturesUtil({vehicle}) {
  const [features, setFeatures] = useState({});

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
      {features[vehicle._id] && (<p>{vehicle.features.join(', ')}</p>)}
    </div>
  );
}