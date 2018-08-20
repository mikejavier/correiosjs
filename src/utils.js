import soap from 'soap';

const CORREIOS_API_URL = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

function correiosSoapClient() {
  return new Promise((resolve, reject) => {
    soap.createClient(CORREIOS_API_URL, (err, client) => {
      if (err) return reject(err);
      return resolve(client);
    });
  });
}

export default correiosSoapClient;
