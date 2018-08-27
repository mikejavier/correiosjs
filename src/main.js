import { fetchServicesList, fetchDeliveryTime } from './correios';

export const getServicesList = () => fetchServicesList();

export const getDeliveryTime = () => fetchDeliveryTime();

export const getDeliveryPrice = () => true;
