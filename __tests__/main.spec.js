import getListServices from '../src/main';

describe('getListServices', () => {

  test('check if getListServices has cServicosCalculo property', () => {
    expect.assertions(1);

    return getListServices()
      .then((data) => {
        expect(data).toHaveProperty('ListaServicosResult.ServicosCalculo.cServicosCalculo');
      });
  });
});