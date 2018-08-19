import soap from 'soap';

const BASE_URL = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

function makeClient(cb) {
  soap.createClient(BASE_URL, function (err, client) {
    if (err) return console.log(err);
    cb(client);
  });
}

const getListServices = () => {
  return new Promise(function(resolve, reject) {
    makeClient(function (client) {        
      client.ListaServicos(null, function (error, result) {
        if (error) return reject(error);
        resolve(result);
      });
    });
  });
}

export default getListServices;
