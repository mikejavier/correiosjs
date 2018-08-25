/* eslint-disable */
import getServicesList from '../src/main';
import fetchServicesList from '../src/correios';

jest.mock('../src/correios');

describe('getServicesList', () => {
  test('check if fetchServicesList is called', () => {
    expect.hasAssertions();
    getServicesList();
    expect(fetchServicesList.mock.calls.length).toBe(1);
  });
});