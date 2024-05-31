export const formatPrice = element => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
    .format(element)
    .split(',')[0]
    .replace(/\u00A0/g, ''); // replace $&nbsp; between the sign and the number
};

/* transformObject fn takes an object and returns an array of objects. Categorizing adn grouping (by common group name) choosen check items inside an object that contains items property and name property ({name: str, items: str[]}) as follows :
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
