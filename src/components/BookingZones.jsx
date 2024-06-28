import { useState } from 'react';

import zone1 from '../assets/zone-1.jpg';
import zone2 from '../assets/zone-2.jpg';
import zone3 from '../assets/zone-3.jpg';

const BookingZones = ({
  onClickZone,
  sliderIndex,
  activeZoneId,
  setActiveZoneId,
}) => {
  return (
    <div
      className='zones-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      <div className='zones-grid'>
        <button
          className={activeZoneId === 0 ? 'zone-selected' : 'not-selected'}
          onClick={() => {
            setActiveZoneId(0);
            onClickZone('interior');
          }}
        >
          <img src={zone1} alt='restaurant zone' />
          <div className='zone-content'>
            <p>Zona interior</p>
          </div>
        </button>

        <button
          className={activeZoneId === 1 ? 'zone-selected' : 'not-selected'}
          onClick={() => {
            setActiveZoneId(1);
            onClickZone('exterior');
          }}
        >
          <img src={zone2} alt='restaurant zone' />
          <div className='zone-content'>
            <p>Zona exterior</p>
          </div>
        </button>

        <button
          className={activeZoneId === 2 ? 'zone-selected' : 'not-selected'}
          onClick={() => {
            setActiveZoneId(2);
            onClickZone('azotea');
          }}
        >
          <img src={zone3} alt='restaurant zone' />
          <div className='zone-content'>
            <p>Azotea</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BookingZones;
