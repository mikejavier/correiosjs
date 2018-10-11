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

// Calcula o prazo considerando restrição de entrega, com uma data especificada ou a data atual
export const deliveryTime = (params = {}) => new Promise(async (resolve, reject) => {
  const properties = ['service', 'origin', 'destiny', 'restriction', 'from'];
  const paramsProperties = Object.keys(params);
  const errorMesage = {
    error: 'incorrect parameter',
  };

  if (paramsProperties.length < 3) return reject(errorMesage);
  if (!paramsProperties.every(element => properties.includes(element))) return reject(errorMesage);

  const payload = {
    nCdServico: params.service,
    sCepOrigem: params.origin,
    sCepDestino: params.destiny,
    sDtCalculo: '',
  };

  if (params.from) payload.sDtCalculo = params.from;

  try {
    const { CalcPrazoData, CalcPrazoRestricao } = await correiosServices();

    if (params.restriction === true) {
      return CalcPrazoRestricao(payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }

    return CalcPrazoData(payload, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  } catch (e) {
    return reject(e);
  }
});


// Calcula somente o preço com a data atual
export const calculatePrice = (params = {}) => new Promise(async (resolve, reject) => {
  const properties = ['service', 'origin', 'destiny', 'weight', 'format', 'length', 'height', 'width', 'diameter', 'ownHand', 'declaredValue', 'receivingNotice'];
  const paramsProperties = Object.keys(params);
  const errorMesage = {
    error: 'incorrect parameter',
  };

  if (paramsProperties.length < 12) return reject(errorMesage);
  if (!paramsProperties.every(element => properties.includes(element))) return reject(errorMesage);

  const payload = {
    nCdEmpresa: null,
    sDsSenha: null,
    nCdServico: params.service,
    sCepOrigem: params.origin,
    sCepDestino: params.destiny,
    nVlPeso: params.weight,
    nCdFormato: params.format,
    nVlComprimento: params.length,
    nVlAltura: params.height,
    nVlLargura: params.width,
    nVlDiametro: params.diameter,
    sCdMaoPropria: params.ownHand,
    nVlValorDeclarado: params.declaredValue,
    sCdAvisoRecebimento: params.receivingNotice,
  };

  try {
    const { CalcPreco } = await correiosServices();

    return CalcPreco(payload, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  } catch (e) {
    return reject(e);
  }
});
