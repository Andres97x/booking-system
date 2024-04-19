import { useState, useRef } from 'react';

import zone1 from '../assets/zone-1.jpg';
import zone2 from '../assets/zone-2.jpg';
import zone3 from '../assets/zone-3.jpg';

const BookingZones = ({ onClickZone }) => {
  const [activeZone, setActiveZone] = useState(null);
  const zone1Ref = useRef(null);
  const zone2Ref = useRef(null);
  const zone3Ref = useRef(null);

  return (
    <div className='booking-zones'>
      <button
        ref={zone1Ref}
        className={
          activeZone === zone1Ref.current && zone1Ref.current !== null
            ? 'zone-selected'
            : 'not-selected'
        }
        onClick={e => {
          setActiveZone(zone1Ref.current);
          onClickZone(1);
        }}
      >
        <img src={zone1} alt='restaurant zone' />
        <p>Zone 1</p>
      </button>

      <button
        ref={zone2Ref}
        className={
          activeZone === zone2Ref.current && zone2Ref.current !== null
            ? 'zone-selected'
            : 'not-selected'
        }
        onClick={e => {
          setActiveZone(zone2Ref.current);
          onClickZone(2);
        }}
      >
        <img src={zone2} alt='restaurant zone' />
        <p>Zone 2</p>
      </button>

      <button
        ref={zone3Ref}
        className={
          activeZone === zone3Ref.current && zone3Ref.current !== null
            ? 'zone-selected'
            : 'not-selected'
        }
        onClick={e => {
          setActiveZone(zone3Ref.current);
          onClickZone(3);
        }}
      >
        <img src={zone3} alt='restaurant zone' />
        <p>Zone 3</p>
      </button>

      <p>Select a zone</p>
    </div>
  );
};

export default BookingZones;
