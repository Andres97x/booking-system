/* <---- GENERAL ----> */

export const formatPrice = element => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
    .format(element)
    .split(',')[0]
    .replace(/\u00A0/g, ''); // replace $&nbsp; between the sign and the number
};

export const clickOpenModal = e => {
  let openModalBtn;
  if (e.target.matches('button[data-modal]')) {
    openModalBtn = e.target;
  } else {
    openModalBtn = e.target.closest('button[data-modal]');
  }

  if (!openModalBtn) return;

  const modalElement = document.getElementById(`${openModalBtn.dataset.modal}`);

  if (!modalElement) return;

  modalElement.showModal();
};

/* <---- MENU COMPONENT ----> */

/* transformObject fn takes an object and returns an array of objects. Categorizing and grouping (by common group name) =>({name: str, items: str[]}) as follows :
[{name: 'group1', items: ['selected1','selected2',...]}, {name: 'group2', items: ['selected1','selected2',...]}, ...] */
export const transformObject = obj => {
  const result = {};

  for (const key in obj) {
    // takes out the unique identifier in each key and getting a name property, which will be common group identifier
    const name = key.split('-').slice(2).join(' ');

    if (!result[name]) {
      // creates a property inside the result object and set it to an empty string
      result[name] = [];
    }
    // push the incoming object[key] into the result object, worth noticing that by this step the grouping already took place.
    result[name].push(obj[key]);
  }

  // transforming result object to an array of  {name, value} objects
  return Object.entries(result)
    .map(([name, items]) => ({
      name,
      items: items.filter(Boolean),
    })) // filtering out groups whose items became all unchecked (items[] becomes empty)
    .filter(obj => obj.items.length > 0);
  // the transformed object into array of objects is a suitable shape to pass to order state.
};

export const getGroupCount = obj => {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const group = key.split('-')[0];

    if (!result[group]) {
      result[group] = 0;
    }

    result[group] += value;
  }

  return result;
};

/* <---- BOOKINGS COMPONENT ----> */

export const getTimes = (booking, interval, add, openingTime, closingTime) => {
  // if (!booking.justDate || !booking.zone) return;
  if (!booking.justDate) return;

  const { justDate } = booking;
  const beginning = add(justDate, { hours: openingTime });
  const end = add(justDate, { hours: closingTime });

  const times = [];
  for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
    times.push(i);
  }

  return times;
};

// Function to get taken times in a specific date at some specific zone
export const getTakenTimes = (booking, bookings, add, interval) => {
  if (!booking.justDate || !booking.zone || bookings.length === 0) return;

  const takenTimes = bookings
    .filter(
      completedBooking =>
        Date.parse(completedBooking.justDate) ===
          Date.parse(booking.justDate) && completedBooking.zone === booking.zone
    )
    .map(takenDate => {
      // Assuming bookings last 1 hour (2 intervals)
      const chosenTime = takenDate.dateTime;

      // Restricting an hour after reservation (2 intervals)
      const firstInterval = add(chosenTime, { minutes: interval });
      const secondInterval = add(chosenTime, { minutes: interval * 2 });

      return [
        // Date.parse(beforeInterval), // this was leading to a bug (may need later)
        Date.parse(chosenTime),
        Date.parse(firstInterval),
        Date.parse(secondInterval),
      ];
    });

  return takenTimes.flat();
};

/* <---- DASHBOARD COMPONENT ----> */

export const updateDetectedCondition = (selected, formData, option, type) => {
  if (!selected) return;

  const formValue =
    type === 'number' ? parseInt(formData[option]) : formData[option];

  const selectedItemValue =
    type === 'number' ? parseInt(selected[option]) : selected[option];

  return (formValue !== selectedItemValue && formData[option] !== '') ||
    (formData[option] === '' && selected[option] !== null)
    ? 'update-detected'
    : '';
};
