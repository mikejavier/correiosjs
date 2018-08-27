import correiosSoapClient from './src/utils';


correiosSoapClient()
  .then(client => client.ListaServicos(null, (err, result) => {
    if (err) console.log(err);
    console.log(JSON.stringify(result));
  }));
