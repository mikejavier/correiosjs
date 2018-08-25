import soap from 'soap';

const CORREIOS_API_URL = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

function getSoapClient() {
  return soap.createClient(CORREIOS_API_URL, (err, client) => {
    if (err) return err;
    return client;
  });
}

function fetchServicesList() {
  return getSoapClient()
    .then(client => client.ListaServicos(null, (err, result) => {
      if (err) return err;
      return result;
    }));
}

export default fetchServicesList;
