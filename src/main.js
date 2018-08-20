import soap from 'soap';

const BASE_URL = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

function makeClient() {
  return new Promise((resolve, reject) => {
    soap.createClient(BASE_URL, (err, client) => {
      if (err) return reject(err);
      return resolve(client);
    });
  });
}

const getListServices = () => new Promise((resolve, reject) => {
  makeClient().then(client => client.ListaServicos(null, (err, result) => {
    if (err) reject(err);
    resolve(result);
  }));
});

export default getListServices;
