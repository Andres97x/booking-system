const BookingCalendar = ({ sliderIndex }) => {
  return (
    <div
      className='form-container'
      style={{ transform: `translateX(${-100 * sliderIndex}%)` }}
    >
      <div>
        <form>
          <div>
            <label htmlFor='booking-name'>Nombres:</label>
            <input type='text' id='booking-name' required />
          </div>
          <div>
            <label htmlFor='booking-lastname'>Apellidos:</label>
            <input type='text' id='booking-lastname' required />
          </div>
          <div>
            <label htmlFor='booking-phone'>Teléfono:</label>
            <input
              required
              type='number'
              inputMode='numeric'
              pattern='[0-9]+'
              id='booking-phone'
            />
          </div>
          <div>
            <label htmlFor='booking-email'>Correo electrónico:</label>
            <input required type='email' id='booking-email' />
          </div>
          <div>
            <label htmlFor='booking-size'>Número de personas:</label>
            <select id='booking-size' name='booking-size'>
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
    </div>
  );
};

export default BookingCalendar;
