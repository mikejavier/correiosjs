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
  fetchDeliveryTime.mockResolvedValue(true);
  
  test('getDeliveryTime is called without argument', () => {
    expect(getDeliveryTime())
      .rejects.toEqual({ error: 'incorrect parameter' });
  });

  test('getDeliveryTime is called with argument has two properties', () => {
    expect(getDeliveryTime({ teste: 1, teste: 1}))
      .rejects.toEqual({ error: 'incorrect parameter' });
  });

  test('getDeliveryTime is called with argument has three incorrect properties', () => {
    expect(getDeliveryTime({ teste: 1, teste: 1, teste: 1 }))
      .rejects.toEqual({ error: 'incorrect parameter' });
  });

  test('getDeliveryTime is called with argument has three correct properties', () => {
    expect(getDeliveryTime({ destinyZipCode: 1, serviceCode: 1, originZipCode: 1 }))
      .resolves.toBeTruthy();
  });
});

// describe('getDeliveryPrice', () => {
//   expect(getDeliveryPrice()).toBeTruthy();
// });