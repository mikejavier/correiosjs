import correiosSoapClient from './utils';

const getListServices = () => new Promise((resolve, reject) => {
  correiosSoapClient()
    .then(client => client.ListaServicos(null, (err, result) => {
      if (err) reject(err);
      resolve(result);
    }));
});

export default getListServices;
