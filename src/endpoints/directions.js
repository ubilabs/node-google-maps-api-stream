import mapsUtils from '../maps-utils';

const Directions = mapsUtils.createApi(mapsApi =>
  (query, done) => mapsApi.directions(query, done)
);

export {Directions};
