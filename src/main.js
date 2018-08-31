import { fetchServicesList, fetchDeliveryTime } from './correios';

export const getServicesList = () => fetchServicesList();

export const getDeliveryTime = (params = {}) => new Promise((resolve, reject) => {
  const properties = ['serviceCode', 'originZipCode', 'destinyZipCode'];
  const paramsArray = Object.keys(params);
  const errorMesage = {
    error: 'incorrect parameter',
  };

  if (paramsArray.length < 3) return reject(errorMesage);

  if (!paramsArray.every(element => properties.includes(element))) return reject(errorMesage);

  return resolve(fetchDeliveryTime());
});

export const getDeliveryPrice = () => true;
