import getListServices from './src/main';

getListServices()
  .then(payload => console.log(JSON.stringify(payload)));