/* eslint-disable */
import { getServicesList, getDeliveryTime, getDeliveryPrice } from '../src/main';
import { fetchServicesList, fetchDeliveryTime } from '../src/correios';

jest.mock('../src/correios');

describe('getServicesList', () => {
  test('check if fetchServicesList is called', () => {
    expect.hasAssertions();
    getServicesList();
    expect(fetchServicesList.mock.calls.length).toBe(1);
  });
});

describe('getDeliveryTime', () => {
  test('getDeliveryTime is called with argument', () => {
    // getDeliveryTime({
    //   destinyZipCode: 'fjkdnfjkdn',
    //   originZipCode: 'fjkdnfjkdn',
    //   serviceCode: 'fjkdnfjkdn'
    // });
    // expect(fetchDeliveryTime.mock.calls[0][0]).toMatchObject({
    //   serviceCode: expect.any(String),
    //   originZipCode: expect.any(String),
    //   destinyZipCode: expect.any(String)
    // });
    expect(getDeliveryTime()).rejects.toEqual({ error: 'missing argument' });
  });
});

// describe('getDeliveryPrice', () => {
//   expect(getDeliveryPrice()).toBeTruthy();
// });