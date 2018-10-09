import { getServices, getStarServices } from './src/main';

getServices()
  .then(res => console.log(JSON.stringify(res)))
  .catch(err => console.log(err));

getStarServices()
  .then(res => console.log(JSON.stringify(res)))
  .catch(err => console.log(err));
