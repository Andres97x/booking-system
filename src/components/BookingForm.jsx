import { useContext } from 'react';

import { BookingContext } from '../contexts/BookingContext';
import Spinner from './Spinner';
import BookingSubmitCompleted from './BookingSubmitCompleted';

const BookingForm = () => {
  const { sliderIndex, bookingForm, onFormChange, submitStatus, submitError } =
    useContext(BookingContext);

  const displayedElement = status => {
    if (status === 'loading') {
      return <Spinner />;
    } else if (status === 'completed') {
      return <BookingSubmitCompleted />;
    } else {
      return (
        <div>
          {submitError && (
            <p
              style={{
                color: '#402400',
                alignSelf: 'start',
                marginBottom: '1rem',
                fontWeight: '500',
              }}
            >
              {submitError}
            </p>
          )}
          <form>
            <div>
              <label htmlFor='booking-firstname'>Nombres:</label>
              <input
                type='text'
                name='firstName'
                value={bookingForm.firstName}
                onChange={onFormChange}
                id='booking-firstname'
                required
              />
            </div>
            <div>
              <label htmlFor='booking-lastname'>Apellidos:</label>
              <input
                type='text'
                name='lastName'
                value={bookingForm.lastName}
                onChange={onFormChange}
                id='booking-lastname'
                required
              />
            </div>
            <div>
              <label htmlFor='booking-phone'>Teléfono:</label>
              <input
                required
                type='number'
                name='phone'
                value={bookingForm.phone}
                onChange={onFormChange}
                inputMode='numeric'
                pattern='[0-9]+'
                id='booking-phone'
              />
            </div>
            <div>
              <label htmlFor='booking-email'>Correo electrónico:</label>
              <input
                required
                type='email'
                name='email'
                value={bookingForm.email}
                onChange={onFormChange}
                id='booking-email'
              />
            </div>
            <div>
              <label htmlFor='booking-size'>Número de personas:</label>
              <select
                id='booking-size'
                name='size'
                value={bookingForm.size}
                onChange={onFormChange}
                required
              >
                <option value='' disabled hidden className='option-placeholder'>
                  Selecciona el número de personas
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
              </select>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <div
      className='form-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      {displayedElement(submitStatus)}
    </div>
  );
};

export default BookingForm;
