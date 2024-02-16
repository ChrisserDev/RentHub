import React from 'react';
import { Link } from 'react-router-dom';

export default function Locations() {
  return (
    <div>
      <h1>Locations</h1>
      <Link to="/london" className='locations-card'>
        <img src="/images/london.jpg" alt="London" />
        <section className='locations-details'>
          <h2>London</h2>
          <p>Explore the vibrant city of London!</p>
        </section>
      </Link>
    </div>
  );
}

