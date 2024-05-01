export const formatPrice = element => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
    .format(element)
    .split(',')[0]
    .replace(/\u00A0/g, ''); // replace $&nbsp; between the sign and the number
};
