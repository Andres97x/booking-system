import { useState } from 'react';

import zone1 from '../assets/zone-1.jpg';
import zone2 from '../assets/zone-2.jpg';
import zone3 from '../assets/zone-3.jpg';

const BookingZones = ({ onClickZone }) => {
  const [activeZoneId, setActiveZoneId] = useState(null);

  return (
    <div className='booking-zones'>
      <button
        className={activeZoneId === 0 ? 'zone-selected' : 'not-selected'}
        onClick={() => {
          setActiveZoneId(0);
          onClickZone(1);
        }}
      >
        <img src={zone1} alt='restaurant zone' />
        <p>Zone 1</p>
      </button>

      <button
        className={activeZoneId === 1 ? 'zone-selected' : 'not-selected'}
        onClick={() => {
          setActiveZoneId(1);
          onClickZone(2);
        }}
      >
        <img src={zone2} alt='restaurant zone' />
        <p>Zone 2</p>
      </button>

      <button
        className={activeZoneId === 2 ? 'zone-selected' : 'not-selected'}
        onClick={() => {
          setActiveZoneId(2);
          onClickZone(3);
        }}
      >
        <img src={zone3} alt='restaurant zone' />
        <p>Zone 3</p>
      </button>
    </div>
  );
};

export default BookingZones;
