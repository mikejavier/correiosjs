import { getServicesList } from './src/main';

getServicesList()
  .then(res => console.log(res))
  .catch(err => console.log(err));
