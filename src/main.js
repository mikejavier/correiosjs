import soap from 'soap';

const CORREIOS_API_URL = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

let soapClient = null;

function correiosServices() {
  return new Promise(async (resolve, reject) => {
    if (soapClient) return resolve(soapClient);

    try {
      soapClient = await soap.createClientAsync(CORREIOS_API_URL);
      return resolve(soapClient);
    } catch (e) {
      return reject(e);
    }
  });
}

// Lista os serviços que estão disponíveis para cálculo de preço e / ou prazo
export const getServices = () => new Promise(async (resolve, reject) => {
  try {
    const { ListaServicos } = await correiosServices();

    ListaServicos(null, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  } catch (e) {
    reject(e);
  }
});

// Lista os serviços que são calculados pelo STAR
export const getStarServices = () => new Promise(async (resolve, reject) => {
  try {
    const { ListaServicosSTAR } = await correiosServices();
    ListaServicosSTAR(null, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  } catch (e) {
    reject(e);
  }
});
